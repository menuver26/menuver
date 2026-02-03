"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useForm, ValidationError } from "@formspree/react";
function RestaurantListingPage() {
   const [state, handleSubmite] = useForm("xeekrdjr");
  //  if (state.succeeded) {
  //   return (
  //     <div className="text-center p-10 bg-white rounded-2xl shadow-xl">
  //       <h2 className="text-2xl font-bold text-green-600">✅ Request Sent!</h2>
  //       <p className="text-gray-600 mt-2">
  //         We’ll contact you within 24 hours.  Thank you for choosing MenuVer!
  //       </p>
  //     </div>
  //   );
  // }
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    phoneNumber: '',
    city: '',
    whatsapp: ''
  });

  const [stats, setStats] = useState({
    hotelCount: 0,
    menuCount: 0,
    loading: true
  });

  // Fetch stats from database on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        setStats({
          hotelCount: data.hotelCount || 0,
          menuCount: data.menuItemCount || 0,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.restaurantName || !formData.ownerName || !formData.phoneNumber || !formData.city) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Request submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-400 to-red-600 text-white">
        <div className='relative z-30 max-w-1/6 '>

          <Link
            href="/"
            className=" flex items-center gap-2 px-3 py-2 rounded-lg  "
          >
            <ArrowLeft className="w-6 h-6 text-white hover:text-orange-300  " />
            <span className="text-xl font-medium text-white hover:text-orange-300">
              Home
            </span>
          </Link>
        </div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight">
            List Your Restaurant on MenuVer
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Go digital with your menu in minutes. No commissions. No hassle.
          </p>
          
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#FFF5EE" />
          </svg>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Everything you need to take your restaurant digital
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            { icon: '📱', title: 'Digital Menu', desc: 'QR-based access for contactless ordering' },
            { icon: '🖼', title: 'High-Quality Images', desc: 'Showcase your dishes beautifully' },
            { icon: '✏️', title: 'Easy Updates', desc: 'Change menu & prices instantly' },
            { icon: '🌐', title: 'Shareable Link', desc: 'Share your menu anywhere online' },
            { icon: '🚀', title: 'Reach More', desc: 'Attract new customers effortlessly' },
            { icon: '💰', title: 'Zero Commission', desc: 'Keep 100% of your earnings' }
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-100"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{benefit.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{benefit.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto px-4">
      {state.succeeded ? (
        // ✅ Success UI
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-green-600">
            ✅ Request Sent!
          </h2>
          <p className="text-gray-600 mt-2">
            We’ll contact you within 24 hours.
          </p>
        </div>
      ) : (
        // ✅ Form UI
        <form onSubmit={handleSubmite}>
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-orange-200 overflow-hidden">

            <div className="bg-gradient-to-r from-orange-400 to-red-600 p-8 text-white text-center">
              <h2 className="text-3xl font-bold">Ready to Go Digital?</h2>
              <p className="opacity-90">
                Fill out the form below and We&apos;ll get you started!
              </p>
            </div>

            <div className="p-8 space-y-6">

              <input name="restaurantName" required placeholder="Restaurant Name"
                className="w-full p-3 border-2 rounded-xl" />

              <input name="ownerName" required placeholder="Owner Name"
                className="w-full p-3 border-2 rounded-xl" />

              <input name="phone" required placeholder="Phone Number"
                className="w-full p-3 border-2 rounded-xl" />

              <input name="city" required placeholder="City"
                className="w-full p-3 border-2 rounded-xl" />

              <input name="whatsapp" placeholder="WhatsApp (optional)"
                className="w-full p-3 border-2 rounded-xl" />

              <ValidationError errors={state.errors} />

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-gradient-to-r from-orange-400 to-red-600 text-white py-4 rounded-xl font-bold"
              >
                {state.submitting ? "Sending..." : "👉 Request Listing"}
              </button>

            </div>
          </div>
        </form>
      )}
    </div>

        {/* Trust Section - Live Stats from Database */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-white rounded-2xl sm:rounded-full px-6 sm:px-8 py-4 shadow-lg">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {stats.loading ? '...' : stats.hotelCount}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">Restaurants</p>
            </div>
            <div className="hidden sm:block h-12 w-px bg-gray-300"></div>
            <div className="block sm:hidden h-px w-20 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                {stats.loading ? '...' : `${(stats.menuCount / 1000).toFixed(1)}K+`}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">Menu Items</p>
            </div>
            <div className="hidden sm:block h-12 w-px bg-gray-300"></div>
            <div className="block sm:hidden h-px w-20 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">24/7</p>
              <p className="text-gray-600 text-xs sm:text-sm">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantListingPage;