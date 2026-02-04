// components/admin/MenuListClient.js
"use client";
import React, { useState } from "react";

export default function MenuListClient({ initialMenus = [], hotelMap = {} }) {
  const [menuItems, setMenuItems] = useState(initialMenus);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterHotel, setFilterHotel] = useState("");
  const [isDeleting, setIsDeleting] = useState(null);

  const uniqueHotels = [...new Set(menuItems.map(m => m.hotelId).filter(Boolean))];

  const filteredMenus = menuItems.filter(menu => {
    const matchesSearch = menu.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHotel = !filterHotel || menu.hotelId === filterHotel;
    return matchesSearch && matchesHotel;
  });

  const handleDelete = async (menuId) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    setIsDeleting(menuId);
    try {
      const res = await fetch(`/api/menu/${menuId}`, { method: "DELETE" });
      if (res.ok) {
        setMenuItems(prev => prev.filter(m => m._id !== menuId));
        alert("Menu item deleted successfully!");
      } else {
        const err = await res.json();
        alert(err?.message || "Failed to delete");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting menu item");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-gray-200">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Search Menu Items</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by dish name..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Filter by Restaurant</label>
            <select value={filterHotel} onChange={(e) => setFilterHotel(e.target.value)} className="w-full px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl">
              <option value="">All Restaurants</option>
              {uniqueHotels.map(hId => (
                <option key={hId} value={hId}>{hotelMap[hId] || "Unknown Restaurant"}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">Showing {filteredMenus.length} of {menuItems.length} items</div>
      </div>

      {filteredMenus.length === 0 ? (
        <div className="text-center py-16">No menu items found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMenus.map(menu => (
            <div key={menu._id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-200">
              <div className="relative h-48 bg-gray-200">
                {menu.image ? (
                  // simple img tag here; if you want next/Image, import and use it with proper sizing and next.config domains
                  <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                    <svg className="w-16 h-16 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <p className="text-xs font-semibold text-gray-700">{hotelMap[menu.hotelId] || 'Unknown'}</p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{menu.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-bold text-lg">₹</span>
                    <span className="text-2xl font-bold text-emerald-600">{menu.price}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <span className="text-sm">⭐</span>
                    <span className="text-sm text-gray-600 font-medium">{menu.category}</span>
                  </div>
                </div>

                {menu.description && <p className="text-sm text-gray-600 mb-4 line-clamp-2">{menu.description}</p>}

                <div className="flex gap-2">
                  <button onClick={() => handleDelete(menu._id)} disabled={isDeleting === menu._id}
                    className={`flex-1 py-2 sm:py-3 rounded-xl font-semibold transition-all ${isDeleting === menu._id ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'}`}>
                    {isDeleting === menu._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}