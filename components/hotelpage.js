"use client"
import { useState, useEffect, useRef } from 'react';
import Add_button from "@/components/add_button";
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams, notFound } from 'next/navigation';

const Hotelpage = ({ data }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [topdata, settopdata] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const router = useRouter();
  const hotelname = usePathname();
  const parts = hotelname.split('/')[1];
  const nameWithSpaces = parts.replace("-", ' ').toUpperCase();
  const [adddata, setadddata] = useState([])
  const searchBoxRef = useRef(null);

  if (!data) {
    notFound();
  }

  const adddatasend = (val) => {
    setadddata([...adddata, val])
  }

  // top data 
  useEffect(() => {
    settopdata(prev => {
      // Get new top items from data that aren't already in prev
      const newTopItems = data.filter(item =>
        item.top && !prev.some(existing => existing._id === item._id)
      );

      // Combine old and new
      return [...prev, ...newTopItems];
    });
  }, [data]);

  // Handle click outside search dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSearchDropdown(false);
        setSearchResults([]);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search with debounce
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setSearchLoading(true);
    setShowSearchDropdown(true);

    const timer = setTimeout(async () => {
      try {
        // Pass hotel slug to search API
        const res = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}&hotel=${encodeURIComponent(parts)}`);
        const results = await res.json();
        setSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [searchTerm, parts]);

  console.log(data)

  // Where you have the Link, add this:
  const removeFromCart = (index) => {
    const filteredData = adddata.filter((_, i) => i !== index);
    setadddata(filteredData);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    document.getElementById("category")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollTomenu = () => {
    document.getElementById("menus")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSearchSelect = (itemName) => {
    setShowSearchDropdown(false);
    setSearchTerm(itemName);
    // Navigate to search page with hotel parameter
    router.push(`/search?query=${encodeURIComponent(itemName)}&hotel=${encodeURIComponent(parts)}`);
  };

  const handleSearchButtonClick = () => {
    if (searchTerm.trim()) {
      setShowSearchDropdown(false);
      router.push(`/search?query=${encodeURIComponent(searchTerm)}&hotel=${encodeURIComponent(parts)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
      {/* Floating Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl border border-white/50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              MenuVer
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-6">
            <button onClick={scrollTomenu} className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Menu</button>
            <button className="text-gray-600 hover:text-orange-600 transition-colors font-medium" onClick={scrollToContact}>Categories</button>
            <Link href="./About" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Unique Design */}
      <section className="relative pt-24 pb-14 px-4 ">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6">
                <span className="bg-gradient-to-r text-4xl from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">Welcome to</span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  {nameWithSpaces}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Experience culinary excellence with our handcrafted dishes and premium ingredients
              </p>
            </div>
          </div>

          {/* Enhanced Search Section */}
          <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative" ref={searchBoxRef}>
              <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-8 py-6 text-lg bg-white/80 rounded-2xl border-2 border-transparent focus:border-orange-400 focus:outline-none transition-all placeholder:text-gray-400 shadow-lg"
                      placeholder="What's your craving today?"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    {/* Search Dropdown */}
                    {showSearchDropdown && searchTerm && (
                      <div className="absolute w-full top-full mt-2 bg-white rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                        {searchLoading && (
                          <div className="p-4 text-center text-gray-500">
                            <p>Searching...</p>
                          </div>
                        )}
                        {!searchLoading && searchResults.length === 0 && (
                          <div className="p-4 text-center text-gray-500">
                            <p>No items found in {nameWithSpaces}</p>
                          </div>
                        )}
                        {!searchLoading && searchResults.length > 0 && (
                          <div>
                            {searchResults.map((item) => (
                              <div
                                key={item._id}
                                onClick={() => handleSearchSelect(item.name)}
                                className="p-4 cursor-pointer border-b last:border-b-0 hover:bg-gray-100 transition-colors flex items-center gap-3"
                              >
                                <img
                                  src={item.images?.[0]?.url || "/images/meal.jpg"}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1 text-left">
                                  <p className="font-medium text-gray-800">{item.name}</p>
                                  <p className="text-sm text-gray-500">₹{item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleSearchButtonClick}
                    className="px-12 py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
     <section className="py-16 px-4" id="category">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Browse Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore our diverse culinary offerings
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

            {/* Meals */}
            <Link href={`./${hotelname}/menu/meal`} className="group">
              <div className="rounded-3xl p-6 text-center bg-orange-100 hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🍽️</span>
                </div>
                <h3 className="font-semibold text-gray-800">Meals</h3>
              </div>
            </Link>

            {/* Desserts */}
            <Link href={`./${hotelname}/menu/dessert`} className="group">
              <div className="rounded-3xl p-6 text-center bg-pink-100 hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🍰</span>
                </div>
                <h3 className="font-semibold text-gray-800">Desserts</h3>
              </div>
            </Link>

            {/* Snacks */}
            <Link href={`./${hotelname}/menu/snack`} className="group">
              <div className="rounded-3xl p-6 text-center bg-red-100 hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🍿</span>
                </div>
                <h3 className="font-semibold text-gray-800">Snacks</h3>
              </div>
            </Link>

            {/* Beverages */}
            <Link href={`./${hotelname}/menu/drink`} className="group">
              <div className="rounded-3xl p-6 text-center bg-green-100 hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🥤</span>
                </div>
                <h3 className="font-semibold text-gray-800">Beverages</h3>
              </div>
            </Link>

            {/* Appetizer */}
            <Link href={`./${hotelname}/menu/appetizer`} className="group">
              <div className="rounded-3xl p-6 text-center bg-green-50 hover:shadow-xl transition-all hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🥗</span>
                </div>
                <h3 className="font-semibold text-gray-800">Appetizers</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Top Sellers Section */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">Top Sellers</h2>
              <p className="text-xl text-gray-600">Most loved dishes by our customers</p>
            </div>
            <div className="hidden sm:flex space-x-2">
              <button className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors">
                ←
              </button>
              <button className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors">
                →
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Container */}
          <div className="w-full overflow-x-auto pb-6 scrollbar-hide">
            <div className="flex gap-6 px-2">
              {topdata.map((val, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-x shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50 flex-shrink-0 w-80">
                  <div className="relative overflow-hidden">
                    <img
                      src={val.images?.[0]?.url || '/images/meal.jpg'}
                      alt={val.name}
                      className="w-full h-56 object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/meal.jpg'
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors truncate">
                      {val.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        ₹{val.price || 200}
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <span className="text-lg">⭐</span>
                        <span className="text-gray-600 font-medium">{val.category}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => adddatasend(val)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Add to Cart
                      </button>
                      <Link href={`/${parts}/info/${val._id}`}>
                        <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors">
                          ℹ️
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom scrollbar styling */}
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .overflow-x-auto::-webkit-scrollbar {
              height: 6px;
            }
            .overflow-x-auto::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.3);
              border-radius: 10px;
            }
            .overflow-x-auto::-webkit-scrollbar-thumb {
              background: linear-gradient(90deg, #f97316, #ef4444);
              border-radius: 10px;
            }
            .overflow-x-auto::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(90deg, #ea580c, #dc2626);
            }
          `}</style>
        </div>
      </section>

      {/* all items */}
      <section id='menus' className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">All Menu</h2>
              <p className="text-xl text-gray-600">view your favourite </p>
            </div>
            <div className="hidden sm:flex space-x-2">
              <button className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors">
                ←
              </button>
              <button className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-orange-600 transition-colors">
                →
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-auto pb-6 scrollbar-hide ">
            <div className="flex gap-6 px-2">
              {data.map((val, index) => (
                <div key={val._id} className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-x shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50 flex-shrink-0 w-80">
                  <div className="relative overflow-hidden">
                    <img
                      src={val.images?.[0]?.url || '/images/meal.jpg'}
                      alt={val.name}
                      className="w-full h-56 object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/meal.jpg'
                      }}
                    />
                  </div>

                  <div className="p-6 ">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors truncate">
                      {val.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-green-600">
                        ₹{val.price || 200}
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <span className="text-lg">⭐</span>
                        <span className="text-gray-600 font-medium">{val.category}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => adddatasend(val)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Add to Cart
                      </button>
                      <Link href={`/${parts}/info/${val._id}`}>
                        <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors">
                          ℹ️
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom scrollbar styling */}
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .overflow-x-auto::-webkit-scrollbar {
              height: 6px;
            }
            .overflow-x-auto::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.3);
              border-radius: 10px;
            }
            .overflow-x-auto::-webkit-scrollbar-thumb {
              background: linear-gradient(90deg, #f97316, #ef4444);
              border-radius: 10px;
            }
            .overflow-x-auto::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(90deg, #ea580c, #dc2626);
            }
          `}</style>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                🍽️
              </div>
              <div>
                <div className="text-2xl font-bold">  Restaurant Menus
                </div>
                <div className="text-orange-100">
                  All menus in one place</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                📖
              </div>
              <div>
                <div className="text-2xl font-bold">Easy Browsing </div>
                <div className="text-orange-100">
                  Well-organized categories and items</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                🔍
              </div>
              <div>
                <div className="text-2xl font-bold">Smart Search </div>
                <div className="text-orange-100">Find dishes and restaurants faster</div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                📱
              </div>
              <div>
                <div className="text-2xl font-bold">Mobile Friendly  </div>
                <div className="text-orange-100">Works smoothly on all devices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Ratings Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 mb-8">Real reviews from real food lovers</p>

            {/* Overall Rating Summary */}
            {/* <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 max-w-md mx-auto">
              <div className="text-6xl font-bold text-orange-600 mb-2">4.8</div>
              <div className="flex justify-center mb-3">
                <div className="flex space-x-1 text-3xl text-yellow-400">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
              </div>
              <p className="text-gray-600 font-medium">Based on 2,450+ reviews</p>
              <div className="mt-4 text-sm text-gray-500">
                <div className="flex justify-between items-center mb-1">
                  <span>Food Quality</span>
                  <span className="font-semibold">4.9/5</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span>Service</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Value for Money</span>
                  <span className="font-semibold">4.7/5</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Reviews Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
          <div className="text-center text-gray-600 italic">
            {/* Review Card 1 */}
            {/* <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Arjun Sharma</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 mr-2">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Absolutely incredible food! The butter chicken was to die for, and the service was exceptional. The ambiance is perfect for family dinners. Will definitely come back!"
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>👍 Helpful (23)</span>
                <span>Verified Purchase</span>
              </div>
            </div> */}

            {/* Review Card 2 */}
            {/* <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Priya Patel</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 mr-2">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Best biryani in town! The flavors are authentic and the portion sizes are generous. The digital menu made ordering so convenient. Highly recommended!"
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>👍 Helpful (18)</span>
                <span>Verified Purchase</span>
              </div>
            </div> */}

            {/* Review Card 3 */}
            {/* <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Rahul Kumar</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 mr-2">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm text-gray-500">3 days ago</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Fast service, delicious food, and reasonable prices. The staff is very friendly and accommodating. The desserts are a must-try!"
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>👍 Helpful (31)</span>
                <span>Verified Purchase</span>
              </div>
            </div> */}

            {/* Review Card 4 */}
            {/* <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Sneha Reddy</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 mr-2">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm text-gray-500">5 days ago</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Outstanding experience! The food quality is consistent every time I visit. The online ordering system is user-friendly and efficient."
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>👍 Helpful (27)</span>
                <span>Verified Purchase</span>
              </div>
            </div> */}

            {/* Review Card 5 */}
            {/* <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Mukesh Gupta</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 mr-2">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Perfect place for celebrations! Booked for my anniversary and the staff made it special. Food presentation was beautiful and taste was phenomenal!"
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>👍 Helpful (42)</span>
                <span>Verified Purchase</span>
              </div>
            </div> */}

            {/* Review Card 6 */}
            {/* <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/50">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  K
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Kavya Singh</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 mr-2">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                    <span className="text-sm text-gray-500">4 days ago</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Vegetarian options are incredible! As a pure vegetarian, I was impressed by the variety and authentic flavors. Clean and hygienic preparation."
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>👍 Helpful (19)</span>
                <span>Verified Purchase</span>
              </div>
            </div> */}
            <span className='bg-gray-400 w-full text-center  p-3 text-2xl rounded-3xl'>Coming soon</span>
          </div>

          {/* View More Reviews Button */}
          {/* <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
              View All Reviews
            </button>
          </div> */}
        </div>
      </section>

      <Add_button data={adddata} onRemoveItem={removeFromCart} />
    </div>
  );
};

export default Hotelpage;