import { NextResponse } from 'next/server';
import connectdb from "@/dbcoonect/connectdb";
import Menu from "@/models/menu";

export async function DELETE(request, { params }) {
  try {
    await connectdb();
    
    const { id } = await params;
    console.log(id)
    const deletedMenu = await Menu.findByIdAndDelete(id);
    
    if (!deletedMenu) {
      return NextResponse.json(
        { message: 'Menu item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Menu item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { message: 'Error deleting menu item', error: error.message },
      { status: 500 }
    );
  }
}