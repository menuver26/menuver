"use client"
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { IndianRupee } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);
  const [menudata, setmenudata] = useState([])
  const [RandomItems, setRandomItems] = useState([]);
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalMenuItems: 0,
    categories: { meal: 0, dessert: 0, snack: 0, drink: 0, appetizer : 0 }
  });

  useEffect(() => {
    setIsLoaded(true);
    fetchStats();
allMenuData();  


  }, []);

  const fetchStats = async () => {
  try {
    const response = await fetch('/api/stats');
    const result = await response.json();
    if (result.success) {
      setStats({
        totalHotels: result.hotelCount,
        totalMenuItems: result.menuItemCount,
        categories: result.categories
      });
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};

  const allMenuData = async () => {
  const response = await fetch('/api/allmenudata');
  const result = await response.json();

  if (result.success) {
    setmenudata(result.data);

    // 👇 use result.data, NOT menudata
    const shuffled = [...result.data].sort(() => 0.5 - Math.random());
    setRandomItems(shuffled.slice(0, 3));
  }
};

  // 



  const categories = [
    { id: "all", name: "All Restaurants", icon: "🍽️", count: stats.totalHotels },
    { id: "meal", name: "Meals", icon: "🍽️", count: stats.categories.meal },
    { id: "dessert", name: "Desserts", icon: "🍰", count: stats.categories.dessert },
    { id: "snack", name: "Snacks", icon: "🍔", count: stats.categories.snack },
    { id: "drink", name: "Drinks", icon: "☕", count: stats.categories.drink },
    { id: "appetizer", name: "Appetizers", icon: "🥗", count: stats.categories.appetizer},
  ];

  // const featuredRestaurants = [
  //   {
  //     name: "The Royal Palace",
  //     slug: "royal-palace",
  //     cuisine: "Indian Fine Dining",
  //     rating: 4.8,
  //     image: "/food_bg.jpg",
  //     speciality: "Authentic Mughlai Cuisine",
  //     priceRange: "₹₹₹",
  //     discount: "20% OFF",
  //     deliveryTime: "30-45 min"
  //   },
  //   {
  //     name: "Spice Garden",
  //     slug: "spice-garden",
  //     cuisine: "Multi-Cuisine",
  //     rating: 4.6,
  //     image: "/food_bg.jpg",
  //     speciality: "Farm Fresh Ingredients",
  //     priceRange: "₹₹",
  //     discount: "15% OFF",
  //     deliveryTime: "25-35 min"
  //   },
  //   {
  //     name: "Coastal Breeze",
  //     slug: "coastal-breeze",
  //     cuisine: "Seafood",
  //     rating: 4.7,
  //     image: "/food_bg.jpg",
  //     speciality: "Fresh Catch Daily",
  //     priceRange: "₹₹₹",
  //     discount: "10% OFF",
  //     deliveryTime: "40-50 min"
  //   },
  //   {
  //     name: "Urban Bites",
  //     slug: "urban-bites",
  //     cuisine: "Continental",
  //     rating: 4.5,
  //     image: "/food_bg.jpg",
  //     speciality: "Modern Fusion",
  //     priceRange: "₹₹",
  //     discount: "25% OFF",
  //     deliveryTime: "20-30 min"
  //   }
  // ];

  const features = [
    {
      icon: "🍽️",
      title: "Smart Menu Discovery",
      description: "Find your favorite dishes instantly with fast and simple search"
    },
    {
      icon: "📸",
      title: "Visual Menus",
      description: "Beautiful food images with clear prices and categories"
    },

    {
      icon: "⚡",
      title: "Fast & Smooth Experience",
      description: "Lightweight, quick-loading menus that work on any device"
    },
    {
      icon: "🏪 ",
      title: " Restaurant Focused",
      description: "Designed specially for hotels & restaurants to showcase their best dishes"
    }
  ];

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-50">
        {/* Navigation Bar */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  MenuVer
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Home</Link>
                <Link href="/AllHotels" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Restaurants</Link>
                <Link href="./About" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">About</Link>
                <Link href="./Contact" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Contact</Link>
              </div>

              <div className="flex items-center space-x-4">
                {/* <Link href="/login">
                  <button className="px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors font-medium">
                    Sign In
                  </button>
                </Link> */}
                <Link href="/Registeration">
                  <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                  🚀 The Future of Dining is Here
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-800 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Digital Menus
                </span>
                <br />
                <span className="text-gray-800">Reimagined</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover exceptional restaurants, explore interactive digital menus, and order your favorite dishes
                with our revolutionary platform. Experience dining like never before.
              </p>

              {/* Enhanced Search Bar */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="relative">
                  <div className="max-w-4xl mx-auto mb-12">
                    {/* <div className="flex flex-col md:flex-row items-center justify-center gap-6">

                      <a
                        href="/restaurants"
                        className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                      >
                        🍽️ Explore Menu
                      </a>

                      <a
                        href="/categories"
                        className="px-10 py-4 bg-white text-gray-800 font-semibold rounded-2xl text-lg border-2 border-gray-200 hover:border-orange-400 hover:text-orange-600 transition-all duration-300 shadow-md"
                      >
                        📂 Browse Categories
                      </a>

                    </div> */}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row gap-6 justify-center mb-2.5">
                <Link href="./AllHotels" className="group">
                  <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform group-hover:scale-105 shadow-xl">
                    Explore Restaurants
                    <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
                <Link href="./Registeration" className="group">
                  <button className="px-10 py-4 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 transform group-hover:scale-105 shadow-xl border border-gray-200">
                    List Your Restaurant
                    <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Why Choose <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">MenuVer</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the perfect blend of technology and culinary excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white hover:from-orange-50 hover:to-red-50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-orange-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Browse by <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Category</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find exactly what you’re craving from our curated menu
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`cursor-pointer group p-8 rounded-3xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${selectedCategory === category.id
                    ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-2xl scale-105'
                    : 'bg-white hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 text-gray-700 shadow-lg'
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-sm mb-2">{category.name}</h3>
                  <p className={`text-xs ${selectedCategory === category.id ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                    {category.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Featured <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Restaurants</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the finest dining experiences, carefully curated for food lovers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {menudata.map((restaurant, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={restaurant.images?.[0]?.url }
                      alt={restaurant.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex items-center bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-lg">
                    <IndianRupee className="w-3"></IndianRupee>
                      {restaurant.price}
                    </div>
                   
                    
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-600 text-sm mb-3">{restaurant.speciality}</p>
                    <p className="text-gray-500 text-xs mb-4 flex items-center">
                       {restaurant.slug}
                    </p>

                    <Link href={`./${restaurant.slug}`}>
                      <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform group-hover:scale-105 shadow-lg">
                        View Menu
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="./AllHotels">
                <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
                  View All Restaurants
                  <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.02%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20">
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Growing With  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Restaurants</span>
              </h2>
              <p className="text-xl text-gray-300">Supporting restaurants as they move toward digital menus</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-3 group-hover:scale-110 transition-transform">
                  {stats.totalHotels}
                </div>
                <div className="text-xl text-gray-300 font-semibold">Partner Restaurants</div>
                <div className="text-sm text-gray-400 mt-2">Real-time count</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-3 group-hover:scale-110 transition-transform">
                  {stats.totalMenuItems}
                </div>
                <div className="text-xl text-gray-300 font-semibold">Menu Items</div>
                <div className="text-sm text-gray-400 mt-2">Live from database</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-3 group-hover:scale-110 transition-transform">
                  {stats.totalHotels + stats.totalMenuItems}
                </div>
                <div className="text-xl text-gray-300 font-semibold">Total Items</div>
                <div className="text-sm text-gray-400 mt-2">Restaurants + Menu</div>
              </div>
            </div>
          </div>
        </section >

        {/* How It Works */}
        < section className="py-24 bg-gradient-to-br from-orange-50 to-red-50" >
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                How It <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your restaurant online and start reaching more customers in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group relative">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <span className="text-3xl">📝</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800 font-bold text-sm">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Register Your Restaurant</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sign up and create your restaurant profile with basic details like name, location, and description. It takes just a few minutes to get started.
                </p>
              </div>

              <div className="text-center group relative">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <span className="text-3xl">📋</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800 font-bold text-sm">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Add Your Menu Items</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload your menu with photos, prices, descriptions, and categories. Our easy-to-use dashboard makes menu management simple and efficient.
                </p>
              </div>

              <div className="text-center group relative">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <span className="text-3xl">🌐</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800 font-bold text-sm">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Go Live & Get Customers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your restaurant and menu will be instantly visible on our platform. Start receiving orders and reaching thousands of hungry customers today!
                </p>
              </div>
            </div>
          </div>
        </section >

        {/* Testimonials */}
        {/* < section className="py-24 bg-white" >
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                What Our <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Customers</span> Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  location: "Mumbai",
                  rating: 5,
                  text: "MenuVer has completely changed how I discover new restaurants. The digital menus are so detailed and the ordering process is seamless!",
                  avatar: "👩‍💼"
                },
                {
                  name: "Raj Patel",
                  location: "Delhi",
                  rating: 5,
                  text: "As a restaurant owner, this platform has helped us reach so many more customers. The interface is beautiful and easy to manage.",
                  avatar: "👨‍🍳"
                },
                {
                  name: "Anita Kumar",
                  location: "Bangalore",
                  rating: 5,
                  text: "I love how I can see detailed photos and ingredients for every dish. It's perfect for my dietary restrictions!",
                  avatar: "👩‍🎓"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section > */}

        {/* Final CTA Section */}
        < section className="py-24 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white relative overflow-hidden" >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to Transform Your
              <br />
              <span className="text-yellow-300">Dining Experience?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Be among the first food lovers and restaurant owners to explore digital menus with MenuVer.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link href="/restaurants">
                <button className="px-12 py-5 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl text-lg">
                  🍽️ Start Exploring Now
                </button>
              </Link>
              <Link href="/register-restaurant">
                <button className="px-12 py-5 bg-transparent border-3 border-white text-white font-bold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-110 text-lg">
                  🚀 List Your Restaurant
                </button>
              </Link>
            </div>

            <div className="mt-12 text-sm text-orange-100">
              <p>✨ No setup fees • 📱 Easy to use • ⚡ Instant setup</p>
            </div>
          </div>
        </section >

        {/* Footer */}
        < footer className="bg-gray-900 text-white py-12" >
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <span className="text-xl font-bold">MenuVer</span>
                </div>
                <p className="text-gray-400">Revolutionizing the way you discover, explore, and enjoy great food.</p>
              </div>

              {/* <div>
                <h3 className="font-bold mb-4">For Customers</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/" className="hover:text-white transition-colors">Browse Restaurants</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Order Food</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Track Orders</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Reviews</Link></li>
                </ul>
              </div> */}

              <div>
                <h3 className="font-bold mb-4">For Restaurants</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="./AllHotels" className="hover:text-white transition-colors">List Your Restaurant</Link></li>
                  <li><Link href="/" className="hover:text-white transition-colors">Manage Menu</Link></li>
                  {/* <li><Link href="/" className="hover:text-white transition-colors">Analytics</Link></li> */}
                  {/* <li><Link href="/" className="hover:text-white transition-colors">Support</Link></li> */}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Connect</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="./About" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="./contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="./privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  {/* <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li> */}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 MenuVer. All rights reserved. Made with ❤️ for food lovers.</p>
            </div>
          </div>
        </footer >
      </div >
    </>
  );
}
