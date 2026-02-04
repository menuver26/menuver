import { NextResponse } from "next/server";
import connectdb from "@/dbcoonect/connectdb";
import Menu from "@/models/menu";

export async function GET(request, { params }) {
  try {
    await connectdb();

    // Await params to get the slug
    const { slug } = await params;
    
    // console.log("Slug received:", slug);
    
    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing slug" }, { status: 400 });
    }

    // Find menu items for this hotel (use hotelSlug field)
    const items = await Menu.find({ slug: slug }).lean();
    
    // console.log("Items found for slug [" + slug + "]:", items.length);

    return NextResponse.json({ success: true, items }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/[slug]:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}