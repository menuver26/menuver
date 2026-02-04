import  connectdb from "@/dbcoonect/connectdb"
import { NextResponse } from "next/server"
import  menu  from "@/models/menu";
import hotel from "@/models/hotel";

export async function GET(request, { params }) {
    try {
        await connectdb();
        // console.log(request)
        //  console.log(await params.slug)
       
        // const url = new URL(request.url);
        // const hotelSlug = url.searchParams.get('slug');
        //    const mainurl = request.url
        //    const valurl = mainurl.split("/")[4]
        //console.log(valurl)
        // if (!hotelSlug) {
        //     return new NextResponse(JSON.stringify({ success: false, error: "Missing hotel slug" }), {
        //         status: 400,
        //     });
        // }

        const meals = await menu.find({slug:params.slug});
        //  console.log(meals);
        return new NextResponse(JSON.stringify(meals), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("API Error:", err);
        return new NextResponse(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}