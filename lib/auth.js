import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';

export async function verifyAuth(request) {
  try {
    // Try to get token from cookies first
    let token = request.cookies.get('admin-token')?.value;
    
    // If no cookie, try Authorization header
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return {
        success: false,
        error: 'No authentication token provided',
        response: NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        )
      };
    }

    // Verify the JWT token
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return {
        success: false,
        error: 'Token expired',
        response: NextResponse.json(
          { success: false, error: 'Token expired. Please login again.' },
          { status: 401 }
        )
      };
    }

    // Return user info
    return {
      success: true,
      user: {
        userId: payload.userId,
        username: payload.username,
        role: payload.role
      }
    };

  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return {
      success: false,
      error: 'Invalid token',
      response: NextResponse.json(
        { success: false, error: 'Invalid authentication token' },
        { status: 401 }
      )
    };
  }
}

// Higher-order function to protect API routes
export function withAuth(handler) {
  return async (request, context) => {
    const authResult = await verifyAuth(request);
    
    if (!authResult.success) {
      return authResult.response;
    }
    
    // Add user info to the request for use in the handler
    request.user = authResult.user;
    
    return handler(request, context);
  };
}
