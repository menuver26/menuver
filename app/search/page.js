import Menu from "@/models/menu";
import connectdb from "@/dbcoonect/connectdb";
import Link from "next/link";
import Image from "next/image";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.query;
  const hotelSlug = params.hotel; // Get hotel slug from search params

  await connectdb();

  console.log("=== SEARCH PAGE DEBUG ===");
  console.log("Query:", query);
  console.log("Hotel slug:", hotelSlug);

  // Build filter query - match the same logic as API
  const filterQuery = {
    name: { $regex: query, $options: "i" }
  };

  // If hotel slug is provided, filter by that hotel using same OR logic
  if (hotelSlug) {
    filterQuery.$or = [
      { slug: hotelSlug },
      { hotelSlug: hotelSlug },
      { slug: hotelSlug.replace(/-/g, ' ') },
      { hotelSlug: hotelSlug.replace(/-/g, ' ') }
    ];
    console.log("Filtering with OR conditions");
  }

  const results = await Menu.find(filterQuery).lean();
  console.log("Results found:", results.length);
  console.log("=== END SEARCH PAGE DEBUG ===");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50">
      {/* Header Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Link href={hotelSlug ? `/${hotelSlug}` : "/"} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Search Results {hotelSlug && `- ${hotelSlug}`}
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-2xl border-2 border-amber-200">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-lg text-gray-700">
              Showing results for: <span className="font-bold text-amber-700">&quot;{query}&quot;</span>
              {hotelSlug && <span className="ml-2 text-gray-600">in <span className="font-semibold">{hotelSlug}</span></span>}
            </span>
            <span className="ml-auto bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
              {results.length} {results.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white rounded-full p-8 shadow-lg mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No items found</h2>
            <p className="text-gray-500 text-center max-w-md">
              {hotelSlug 
                ? `We couldn't find "${query}" in ${hotelSlug}. Try different keywords or browse our menu.`
                : "We couldn't find any items matching your search. Try different keywords or browse our categories."
              }
            </p>
            <Link href={hotelSlug ? `/${hotelSlug}` : "/"} className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all inline-block">
              Back to Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(item => (
              <Link href={`/${item.slug}/info/${item._id}`} key={item._id.toString()}>
                <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.images?.[0]?.url || "/images/meal.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {item.name}
                    </h2>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald-600">₹{item.price}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <span className="text-lg">⭐</span>
                        <span className="text-gray-600 font-medium text-sm">{item.category || "Food"}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-3 rounded-2xl font-semibold hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}