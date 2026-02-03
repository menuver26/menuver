"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center space-x-1 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 disabled:opacity-50"
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )}
      <span>Logout</span>
    </button>
  );
}

export default function AdminNavbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-lg font-bold text-gray-900 hover:text-gray-600">
              🏠 Home
            </Link>
            <div className="text-2xl font-bold text-blue-600">Admin Dashboard</div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/admin/hotels" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              🏨 Hotels
            </Link>
            <Link 
              href="/admin" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              📊 Dashboard
            </Link>
            <div className="h-4 w-px bg-gray-300"></div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
