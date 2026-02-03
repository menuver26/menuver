"use client"
import React, { useState } from 'react'
import InfoItem from '@/components/infoiteam'
import Add_button from '@/components/add_button'

const InfoItemClient = ({ item, topItems = [], hotel }) => {
  const [adddata, setadddata] = useState([])

  const adddatasend = (val) => {
    setadddata([...adddata, val])
  }

  const removeFromCart = (index) => {
    const filteredData = adddata.filter((_, i) => i !== index)
    setadddata(filteredData)
  }
  
  // console.log('Current item:', item)
  // console.log('Top items:', topItems)
  // console.log('Cart data:', adddata)
  
  return (
    <>
      <InfoItem item={item} hotel={hotel} onAddToCart={adddatasend} />
      {/* Optionally show top items here */}
      {topItems.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topItems.map((topItem, index) => (
              <div key={topItem._id || `topitem-${index}`} className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-bold">{topItem.name}</h3>
                <p className="text-green-600">₹{topItem.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Add_button data={adddata} onRemoveItem={removeFromCart} />
    </>
  )
}

export default InfoItemClient