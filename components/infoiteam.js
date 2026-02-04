"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Image from 'next/image'

const InfoItem = ({ item, hotel, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedNotification, setAddedNotification] = useState(false)
  const [similarItems, setSimilarItems] = useState([])
  const [loading, setLoading] = useState(false)
  // console.log(similarItems)

  // Fetch similar items from the same hotel via API
  useEffect(() => {
    const fetchSimilarItems = async () => {
      if (!hotel) return
      try {
        setLoading(true)
        const res = await fetch(`/api/${encodeURIComponent(hotel)}`)
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
        const json = await res.json()
        if (json.success && Array.isArray(json.items)) {
          const filtered = json.items.filter(mi => mi._id !== item._id).slice(0, 4)
          setSimilarItems(filtered)
        } else {
          setSimilarItems([])
        }
      } catch (err) {
        console.error("Error fetching similar items:", err)
        setSimilarItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarItems()
  }, [hotel, item._id])

 const handleAddToCart = () => {
  const payload = {
    _id: item._id,
    name: item.name,
    price: Number(item.price || 0),
    quantity: quantity,
    images: item.images || []
  }
  onAddToCart?.(payload)
  setAddedNotification(true)
  setTimeout(() => setAddedNotification(false), 2000)
  setQuantity(1)
}
  // Get image URL safely
  const getImageUrl = (imgData) => {
    if (!imgData) return "/images/meal.jpg"
    if (typeof imgData === 'string') return imgData
    if (imgData.url) return imgData.url
    return "/images/meal.jpg"
  }

  const mainImageUrl = getImageUrl(item.images?.[0] || item.images)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={mainImageUrl}
              alt={item.name}
              width={600}
              height={600}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Available
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                {/* <div className="flex items-center space-x-1 text-yellow-500">
                  <span>⭐</span>
                  <span className="font-semibold text-gray-800">4.8</span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Thumbnail Images (placeholder) */}
          <div className="flex space-x-4">
            {[0].map((idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative overflow-hidden rounded-xl transition-all duration-300 ${selectedImage === idx ? 'ring-4 ring-orange-500 scale-105' : 'hover:scale-105'}`}
              >
                <Image
                  src={mainImageUrl}
                  alt={`${item.name} view ${idx + 1}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-3">{item.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{item.hotelSlug || 'A delicious dish prepared with care.'}</p>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-green-600">₹{item.price || 200}</span>
              <div className="flex items-center space-x-2">
                {/* <div className="flex text-yellow-400">
                  <span>⭐⭐⭐⭐⭐</span>
                </div> */}
                {/* <span className="text-gray-600">(124 reviews)</span> */}
              </div>
            </div>
          </div>

          {/* Quantity + Add */}
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quantity</h3>
            <div className="flex items-center space-x-4 mb-6">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">-</button>
              <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">+</button>
            </div>
            <div className="flex space-x-4">
              <button onClick={handleAddToCart} className={`flex-1 font-bold py-4 rounded-2xl transition-all duration-300 transform shadow-xl ${addedNotification ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'}`}>
                {addedNotification ? (<span className="flex items-center gap-2"><Check className="w-5 h-5" /> Added</span>) : (`Add to Cart - ₹${(item.price || 200) * quantity}`)}
              </button>
              <button className="px-6 py-4 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-2xl">{item.category}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Items */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {!loading && similarItems.length > 0 ? (
            similarItems.map((si, idx) => (
              <div key={si._id || `sim-${idx}`} className="bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50">
                <Link href={`/${hotel}/info/${si._id}`}>
                  <Image
                    src={getImageUrl(si.images?.[0] || si.images)}
                    alt={si.name}
                    width={300}
                    height={240}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 mb-2">{si.name}</h4>
                    <p className="text-green-600 font-bold">₹{si.price}</p>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <Link href={`/${hotel}/info/${si._id}`}>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              <p>{loading ? 'Loading similar items...' : 'No similar items found'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoItem