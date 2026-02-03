export const runtime = "nodejs";
import  connectdb  from '@/dbcoonect/connectdb';
import Hotel from '@/models/hotel';
import Menu from '@/models/menu';

export const getdata = async (slug, hotel_id = 'id not there') => {
  try {
    await connectdb();
    
    const Hotels = await Hotel.find({ slug });
  
    if (!Hotels || Hotels.length === 0) {
      return null;
    }
    
    const hotelid = Hotels[0].hotel_id;
    const slugs = Hotels[0].slug;

    // Extract from menus
    const menus = await Menu.find({
      hotel_id: hotelid,
      slug: slug,
    });
    return menus || null;
    
  } catch (err) {
    console.error("DB Error:", err);
    return null;
  }
}