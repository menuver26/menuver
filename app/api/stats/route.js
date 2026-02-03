import { NextResponse } from "next/server";
import connectdb from "@/dbcoonect/connectdb";
import hotel from "@/models/hotel";
import menu from "@/models/menu";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectdb();
    
    // Get counts from database
    const hotelCount = await hotel.countDocuments();
    const menuItemCount = await menu.countDocuments();
    
    // Get category counts
    const categoryCounts = await menu.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Format category counts
    const categories = {
      meal: 0,
      dessert: 0,
      snack: 0,
      drink: 0,
      appetizer : 0
    };
    
    categoryCounts.forEach(cat => {
      if (cat._id in categories) {
        categories[cat._id] = cat.count;
      }
    });
    
    return NextResponse.json({
      success: true,
      hotelCount: hotelCount,
      menuItemCount: menuItemCount,
      categories: categories
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}