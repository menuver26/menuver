export const runtime = "nodejs";
import  connectdb  from '@/dbcoonect/connectdb';
import Hotel from '@/models/hotel';
import Menu from '@/models/menu';

export default async function getdataforhotel(slug) {
  try {
    await connectdb();
    
    const hotelInfo = await Hotel.findOne({ 
      $or: [
        { slug: slug },
        { slug: slug.replace(/_/g, '-') },
        { slug: slug.replace(/-/g, '_') }
      ]
    }).lean();
    
    if (!hotelInfo) {
      return [];
    }
    
    const menuItems = await Menu.find({ 
      hotel_id: hotelInfo.hotel_id 
    }).lean();
    
    return menuItems || [];
    
  } catch (error) {
    return [];
  }
}