import Hotel from "@/models/hotel";
import connectdb from "@/dbcoonect/connectdb";

export default async function HotelsPage() {
    await connectdb();

    const hotels = await Hotel.find({}).lean();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header Section */}
            <div className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                            Restaurants on
                            <span className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> MenuVer</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Discover restaurants that are going digital        
                                </p>
                        <div className="mt-4 inline-block bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-2 rounded-full">
                            <span className="text-purple-700 font-semibold">
                                {hotels.length} {hotels.length === 1 ? 'Hotel' : 'Hotels'} Available
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hotels Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {hotels.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="bg-white rounded-full p-8 shadow-lg mb-6">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No hotels found</h2>
                        <p className="text-gray-500 text-center max-w-md">
                            There are currently no hotels available in the database.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hotels.map(hotel => (
                            <div
                                key={hotel._id.toString()}
                                className="group bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Hotel Header with Icon */}
                                <div className="relative bg-gradient-to-r from-orange-400 to-red-600 p-6">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="bg-white rounded-full p-4 shadow-lg">
                                            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white text-center group-hover:scale-105 transition-transform duration-300">
                                        {hotel.name}
                                    </h2>
                                </div>

                                {/* Hotel Content */}
                                <div className="p-6">
                                    {/* Location */}
                                    <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-400">
                                        <svg className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Location</p>
                                            <p className="text-gray-800 font-medium mt-1">{hotel.location}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">About</p>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed line-clamp-3">
                                            {hotel.description}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <a href={`/${hotel.slug}`}>
                                        <button className="w-full bg-gradient-to-r from-orange-400 to-red-600 text-white py-3 rounded-2xl font-semibold hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                            View Menu
                                        </button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}