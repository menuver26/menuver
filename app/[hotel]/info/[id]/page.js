import getMenuItem from '@/utils/getMenuItem';
import { serializeItem } from '@/utils/serializeMongoObject';
import InfoItemClient from './InfoItemClient';
import Link from 'next/link';
import connectdb from '@/dbcoonect/connectdb';
import hotel from '@/models/hotel';

export default async function InfoItemServer({ params }) {
  const { hotel: hotelSlug, id } = await params
  
  // console.log('========== INFO PAGE DEBUG ==========')
  // console.log('Hotel slug from URL:', hotelSlug)
  // console.log('Item ID from URL:', id)
  // console.log(id)
  
  try {
    // First, check if hotel exists in database
    await connectdb()
    const hotelData = await hotel.findOne({ slug: hotelSlug }).lean()
    
    // console.log('Hotel found in DB:', hotelData ? 'YES' : 'NO')
    
    if (!hotelData) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Hotel Not Found</h1>
            <p className="text-gray-600 mb-4">Hotel slug: {hotelSlug}</p>
            <p className="text-sm text-gray-500">This hotel doesn&apos;t exist in the database</p>
            <Link href="/" className="text-orange-600 hover:underline mt-4 inline-block">
              Go Home
            </Link>
          </div>
        </div>
      )
    }
    
    // console.log('Hotel ID:', hotelData.hotel_id)
    
    // Now get the menu item
   // Now get the menu item
const result = await getMenuItem(id)

console.log('Menu item found:', result ? 'YES' : 'NO')

if (!result) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Item Not Found</h1>
        <p className="text-gray-600 mb-4">Item ID: {id}</p>
        <p className="text-sm text-gray-500">This menu item doesn&apos;t exist in the database</p>
        <Link href={`/${hotelSlug}`} className="text-orange-600 hover:underline mt-4 inline-block">
          Return to Menu
        </Link>
      </div>
    </div>
  )
}

// console.log('Item details:', result.item.name)

    // Serialize data
    let serializedItem;
    let serializedTopItems = [];
    // console.log(result.topItems)
    try {
      serializedItem = serializeItem(result.item);
      serializedTopItems = result.topItems.map(item => serializeItem(item));
    } catch (error) {
      console.log('Serialization utility failed, using JSON fallback:', error);
      serializedItem = JSON.parse(JSON.stringify(result.item));
      serializedTopItems = JSON.parse(JSON.stringify(result.topItems));
    }

    // console.log('Rendering InfoItemClient with item:', serializedItem.name)
    // console.log('====================================')

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href={`/${hotelSlug}`} className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 7h18" />
                </svg>
                <span className="font-medium">Back to Menu</span>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  MenuVer
                </span>
              </div>
            </div>
          </div>
        </nav>

        <InfoItemClient item={serializedItem} topItems={serializedTopItems} hotel={hotelSlug} />
      </div>
    )
  } catch (error) {
    console.error('Error in InfoItemServer:', error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Item</h1>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Link href={`/${hotelSlug}`} className="text-orange-600 hover:underline">
            Return to Menu
          </Link>
        </div>
      </div>
    )
  }
}