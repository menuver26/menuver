import Home from "@/app/[hotel]/page";
import  connectdb  from '@/dbcoonect/connectdb';
import hotelname from "@/models/hotel";
import mongoose from "mongoose";
 
export async function checkHotelExists(slug) {
    try{
        await connectdb()
        const Hotels  = await hotelname.findOne({slug})
        console.log(Hotels)
        const names = await Home(slug)
        return Hotels || null;
    }catch (err) {
        return null;
    }
}