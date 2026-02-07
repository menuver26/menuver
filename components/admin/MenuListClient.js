// components/admin/MenuListClient.js
"use client";
import React, { useState } from "react";

export default function MenuListClient({ initialMenus = [], hotelMap = {} }) {
  const [menuItems, setMenuItems] = useState(initialMenus);
  const [filterHotel, setFilterHotel] = useState("");
  const [isDeleting, setIsDeleting] = useState(null);

  const uniqueHotels = [...new Set(menuItems.map(m => m.hotelId).filter(Boolean))];
  const filteredMenus = filterHotel
    ? menuItems.filter(menu => menu.hotelId === filterHotel)
    : [];
  console.log(filteredMenus)

  const handleDelete = async (menuId) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    console.log(menuId)
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
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Select Restaurant</label>
          <select
            value={filterHotel}
            onChange={(e) => setFilterHotel(e.target.value)}
            className="w-full px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base"
          >
            <option value="">-- Select a Restaurant --</option>
            {uniqueHotels.map(hId => (
              <option key={hId} value={hId}>{hotelMap[hId] || "Unknown Restaurant"}</option>
            ))}

          </select>
        </div>

        {filterHotel && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredMenus.length} menu items for {hotelMap[filterHotel] || "Unknown Restaurant"}
          </div>
        )}
      </div>

      {!filterHotel ? (
        <div className="text-center py-16 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-lg font-medium">Select a restaurant to view its menus</p>
        </div>
      ) : filteredMenus.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">No menu items found for this restaurant</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMenus.map(menu => (
            <div key={menu._id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-200">
              <div className="relative h-48 bg-gray-200">
                {menu.images ? (
                  <img src={menu.images[0].url}
                    alt={menu.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                    <svg className="w-16 h-16 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
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
                  <button
                    onClick={() => handleDelete(menu._id)}
                    disabled={isDeleting === menu._id}
                    className={`flex-1 py-2 sm:py-3 rounded-xl font-semibold transition-all ${isDeleting === menu._id ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700'}`}
                  >
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