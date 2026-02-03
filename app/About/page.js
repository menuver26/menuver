import React from 'react';
import Link from 'next/link';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              <p className="text-sm sm:text-base font-semibold">About Us</p>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 drop-shadow-2xl">
            Welcome to MenuVer
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            Making restaurant menus beautiful, accessible, and always up to date
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 21.3C1200 21 1320 27 1380 29.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="#FFFAF0" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">

        {/* What is MenuVer */}
        <div className="mb-16 sm:mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 border-orange-200">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 sm:p-4 rounded-2xl">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">What is MenuVer?</h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              MenuVer is a simple digital menu platform designed to help restaurants showcase their dishes online and help customers explore menus easily. We&apos;re transforming how people discover and experience restaurant offerings.
            </p>
          </div>
        </div>

        {/* The Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-red-200">
            <div className="bg-white p-3 sm:p-4 rounded-2xl inline-block mb-4 shadow-lg">
              <span className="text-3xl sm:text-4xl">😕</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">The Problem</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Many restaurants still rely on physical menus or WhatsApp PDFs. These are hard to update, difficult to browse, and don&apos;t showcase food in the best way possible.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-green-200">
            <div className="bg-white p-3 sm:p-4 rounded-2xl inline-block mb-4 shadow-lg">
              <span className="text-3xl sm:text-4xl">✨</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Our Solution</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              We aim to make menus easy to access, beautiful to view, and always up to date. With MenuVer, restaurants can update their menus instantly and customers can browse effortlessly.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              What We Offer
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a modern digital menu experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: '📱', title: 'Mobile-Friendly Menus', desc: 'Perfectly optimized for smartphones and tablets' },
              { icon: '🍽️', title: 'Category Browsing', desc: 'Organize dishes by categories for easy navigation' },
              { icon: '📸', title: 'High-Quality Images', desc: 'Showcase your dishes with beautiful photos' },
              { icon: '🔍', title: 'Easy Dish Search', desc: 'Find your favorite dishes in seconds' },
              { icon: '🏨', title: 'Dedicated Pages', desc: 'Each restaurant gets its own unique page' },
              { icon: '⚡', title: 'Instant Updates', desc: 'Change your menu anytime, anywhere' }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-100"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className="mb-16 sm:mb-20">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 sm:p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-2xl">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">What&apos;s Next?</h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6">
              In the future, we plan to add more features like restaurant analytics, better discovery, and improved menu management. We&apos;re constantly listening to feedback and building features that matter.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base font-semibold">🚀 Coming Soon: Advanced analytics, QR code generation, online ordering integration, and much more!</p>
            </div>
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-16 sm:mb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 border-yellow-200">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 sm:p-4 rounded-2xl">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Our Journey</h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              MenuVer is a new project, currently growing and improving every day. We&apos;re focused on building a reliable and simple experience. Every feature we add, every bug we fix, brings us closer to our vision of making restaurant menus accessible to everyone.
            </p>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              Built For You
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              MenuVer serves both sides of the table
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-blue-200 transform hover:scale-105 transition-all duration-300">
              <div className="bg-white p-4 sm:p-5 rounded-2xl inline-block mb-4 sm:mb-6 shadow-lg">
                <span className="text-4xl sm:text-5xl">👨‍🍳</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">For Restaurant Owners</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Get a modern, professional digital menu that&apos;s easy to update and share. Showcase your dishes beautifully and reach more customers online.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border-2 border-pink-200 transform hover:scale-105 transition-all duration-300">
              <div className="bg-white p-4 sm:p-5 rounded-2xl inline-block mb-4 sm:mb-6 shadow-lg">
                <span className="text-4xl sm:text-5xl">🍴</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">For Customers</h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Explore restaurant menus faster and easier. Browse beautiful food images, search for dishes, and discover new places to eat—all from your phone.
              </p>
            </div>
          </div>
        </div>
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Advertising & Promotions
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We proudly support restaurants, cafés, and food brands by offering
              advertising and promotional opportunities on our platform.
              If you want to showcase your restaurant, promote special offers,
              or highlight featured dishes, we&apos;re here to help you reach the right audience.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our advertising options are designed to be simple, transparent,
              and effective — helping local businesses grow without unnecessary complexity.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-orange-700 mb-2">
                Want to Advertise With Us?
              </h3>
              <p className="text-gray-700">
                If you&apos;re interested in advertising, featured listings, or partnerships,
                feel free to contact us. Our team will guide you through the process
                and help you choose the best option for your business.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/Contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all"
              >
                Contact Us for Advertising
              </Link>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-orange-400 to-red-600 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Join MenuVer?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a restaurant owner or a food lover, we&apos;re here to make your experience better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register_restaurant">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto">
                List Your Restaurant
              </button>
            </Link>
            <Link href="/AllHotels">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-base sm:text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                Explore Restaurants
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;