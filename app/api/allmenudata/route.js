import { NextResponse } from "next/server";
import  connectdb  from "@/dbcoonect/connectdb";
import menu from "@/models/menu";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await connectdb();
    const allMenuData = await menu.find({});
    return NextResponse.json({ success: true, data: allMenuData.slice(0, 4) });
  } catch (error) {
    console.error("Error fetching all menu data:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}