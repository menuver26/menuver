import { NextResponse } from "next/server";
import  connectdb  from "@/dbcoonect/connectdb";
import hotel from "@/models/hotel";
import { withAuth } from "@/lib/auth";

// GET all hotels - Protected route
export const GET = withAuth(async (request) => {
  try {
    await connectdb();
    
    const hotels = await hotel.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: hotels 
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});

// POST new hotel - Protected route
export const POST = withAuth(async (request) => {
  try {
    await connectdb();
    
    const body = await request.json();
    const { name, slug, location, image, description, hotel_id } = body;
    
    // Validate required fields
    if (!name || !slug || !location) {
      return NextResponse.json(
        { success: false, error: "Name, slug, and location are required" },
        { status: 400 }
      );
    }
    
    // Check if slug already exists
    const existingHotel = await hotel.findOne({ slug });
    if (existingHotel) {
      return NextResponse.json(
        { success: false, error: "Slug already exists. Please use a different slug." },
        { status: 400 }
      );
    }
    
    // Check if hotel_id already exists (if provided)
    if (hotel_id) {
      const existingHotelId = await hotel.findOne({ hotel_id });
      if (existingHotelId) {
        return NextResponse.json(
          { success: false, error: "Hotel ID already exists. Please use a different hotel ID." },
          { status: 400 }
        );
      }
    }
    
    const newHotel = new hotel({
      name,
      slug,
      location,
      image: image || '',
      description: description || '',
      hotel_id: hotel_id || Math.floor(Math.random() * 1000000), // Generate random ID if not provided
    });
    
    const savedHotel = await newHotel.save();
    
    return NextResponse.json({ 
      success: true, 
      data: savedHotel,
      message: "Hotel created successfully" 
    });
  } catch (error) {
    console.error("Error creating hotel:", error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: Object.values(error.errors).map(e => e.message).join(', ') },
        { status: 400 }
      );
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Slug must be unique" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});
