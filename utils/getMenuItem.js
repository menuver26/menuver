import connectdb from '@/dbcoonect/connectdb';
import Menu from '@/models/menu';
import mongoose from 'mongoose';

export default async function getMenuItem(itemId) {
  try {
    await connectdb();
    
    // console.log('🔍 Looking for menu item with ID:', itemId);
    // console.log('📋 Is valid ObjectId?', mongoose.Types.ObjectId.isValid(itemId));
    
    let menuItem;
    
    // Check if it's a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(itemId) && itemId.length === 24) {
      console.log('✅ Treating as MongoDB ObjectId');
      menuItem = await Menu.findById(itemId).lean();
    } else {
      console.log('✅ Treating as hotel_id number');
      menuItem = await Menu.findOne({ hotel_id: parseInt(itemId) }).lean();
    }
    
    // console.log('📦 Menu item found?', menuItem ? 'YES' : 'NO');
    
    if (!menuItem) {
      console.warn('⚠️ Menu item not found. ID was:', itemId);
      // Return null so caller can handle
      return null;
    }
    
    // console.log('🏨 Hotel ID from item:', menuItem.hotel_id);
    
    const topItems = await Menu.find({ 
      hotel_id: menuItem.hotel_id, 
      top: true 
    }).lean();
    
    // console.log('⭐ Top items found:', topItems.length);
    
    return {
      item: menuItem,
      topItems: topItems || []
    };
    
  } catch (error) {
    console.error('❌ Error in getMenuItem:', error);
    console.error('Stack trace:', error.stack);
    return null;
  }
}