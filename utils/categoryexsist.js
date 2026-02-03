import Menu from "@/models/menu";          // ✅ FIXED CASE
import connectdb from "@/dbcoonect/connectdb";
import { notFound } from "next/navigation";

export default async function categoryExist(category , hotel) {
  await connectdb();

  const menuItems = await Menu.find({category:category , slug:hotel}).lean();
  if (menuItems.length === 0) {
    return (
      <div className="p-6">No items found</div>

    )
  }

  return JSON.parse(JSON.stringify(menuItems));
}
