import "server-only";
export const runtime = "nodejs";
import connectdb from "@/dbcoonect/connectdb";
import menu from "@/models/menu"
import hotel from '@/models/hotel';
export async function POST(req) {
    try {
        await connectdb();

        const formData = await req.formData();
        console.log(formData)
        const hotelId = formData.get("hotel_id");   // from frontend
        const slug = formData.get("hotelSlug");          // optional if needed

        console.log("Received hotel_id:", hotelId);
        console.log("Received slug:", slug);

        if (!hotelId) {
            return Response.json({ error: "hotel_id missing" }, { status: 400 });
        }

        // 🔍 MATCH HOTEL ID IN DATABASE
        const hotels = await hotel.findOne({ hotel_id: hotelId });


        if (!hotels) {
            return Response.json({ success: false, msg: "Hotel not found" });
        }
        return Response.json({ success: true, msg: "Hotel ID matched" });
    } catch (error) {
        return Response.json({ success: false, msg: "Server error" }, { status: 500 });

    }
}
