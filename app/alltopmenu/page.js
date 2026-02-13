import connectdb from "@/dbcoonect/connectdb";
import Menu from "@/models/menu";
import Hotel from "@/models/hotel";
import Link from "next/link";

export default async function TopItemsPage() {
  await connectdb();

  // Fetch only top items (isTop: true) — adjust field name to match your schema
  const menus = await Menu.find({ top: true }).lean();
  const hotels = await Hotel.find({}).lean();

  const hotelMap = {};
  hotels.forEach(h => {
    hotelMap[h._id.toString()] = h.name;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl sm:text-4xl">🏆</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Top Items
            </h1>
          </div>
          <p className="text-sm sm:text-base opacity-90">
            {menus.length} top-rated items
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {menus.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="bg-white rounded-full p-8 shadow-lg mb-6">
              <span className="text-6xl">🏆</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No top items yet</h3>
            <p className="text-gray-500">Mark items as top to show them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {menus.map((menu, index) => (
              <div
                key={menu._id.toString()}
                className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100"
              >
                {/* Image */}
                <div className="relative h-36 sm:h-44 md:h-52 overflow-hidden">
                  {menu.images ? (
                    <img
                      src={menu.images?.[0]?.url}
                      alt={menu.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-amber-300 flex items-center justify-center">
                      <span className="text-5xl">🍽️</span>
                    </div>
                  )}

                  {/* Rank Badge */}
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-2 py-0.5 rounded-full shadow">
                    <p className="text-[10px] sm:text-xs font-bold text-white">
                      # {index + 1}
                    </p>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow">
                    <p className="text-[10px] sm:text-xs font-semibold text-amber-600">
                      ⭐ Top Pick
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-2.5 sm:p-4">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
                    {menu.name}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2 line-clamp-1">
                    {hotelMap[menu.hotelId?.toString()] || 'Restaurant'}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg md:text-xl font-bold text-emerald-600">
                      ₹{menu.price}
                    </span>
                    <Link href={`/menu/info/${menu._id}`}>
                      <button className="text-xs sm:text-sm bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-medium hover:from-yellow-500 hover:to-amber-600 transition-all">
                        Info
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}