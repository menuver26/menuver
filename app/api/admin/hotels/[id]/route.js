import { NextResponse } from "next/server";
import { connectdb } from "@/dbcoonect/connectdb";
import hotel from "@/models/hotel";
import { withAuth } from "@/lib/auth";

// GET single hotel by ID - Protected route
export const GET = withAuth(async (request, { params }) => {
  try {
    await connectdb();
    
    const hotelData = await hotel.findById(params.id);
    
    if (!hotelData) {
      return NextResponse.json(
        { success: false, error: "Hotel not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: hotelData 
    });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});

// PUT update hotel by ID - Protected route
export const PUT = withAuth(async (request, { params }) => {
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
    
    // Check if slug already exists (excluding current hotel)
    const existingHotel = await hotel.findOne({ 
      slug, 
      _id: { $ne: params.id } 
    });
    if (existingHotel) {
      return NextResponse.json(
        { success: false, error: "Slug already exists. Please use a different slug." },
        { status: 400 }
      );
    }
    
    // Check if hotel_id already exists (excluding current hotel, if provided)
    if (hotel_id) {
      const existingHotelId = await hotel.findOne({ 
        hotel_id, 
        _id: { $ne: params.id } 
      });
      if (existingHotelId) {
        return NextResponse.json(
          { success: false, error: "Hotel ID already exists. Please use a different hotel ID." },
          { status: 400 }
        );
      }
    }
    
    const updatedHotel = await hotel.findByIdAndUpdate(
      params.id,
      {
        name,
        slug,
        location,
        image: image || '',
        description: description || '',
        hotel_id: hotel_id || Math.floor(Math.random() * 1000000),
      },
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validations
      }
    );
    
    if (!updatedHotel) {
      return NextResponse.json(
        { success: false, error: "Hotel not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: updatedHotel,
      message: "Hotel updated successfully" 
    });
  } catch (error) {
    console.error("Error updating hotel:", error);
    
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

// DELETE hotel by ID - Protected route
export const DELETE = withAuth(async (request, { params }) => {
  try {
    await connectdb();
    
    const deletedHotel = await hotel.findByIdAndDelete(params.id);
    
    if (!deletedHotel) {
      return NextResponse.json(
        { success: false, error: "Hotel not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Hotel deleted successfully",
      data: deletedHotel 
    });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
});
