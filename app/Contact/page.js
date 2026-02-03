"use client";
import  { useState } from 'react';
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-400 to-red-500  text-white">
        <div className="absolute inset-0 "></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              <p className="text-sm sm:text-base font-semibold">Get In Touch</p>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 drop-shadow-2xl">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto leading-relaxed px-4">
            Have a restaurant to list? Found a bug? Want to give feedback?<br className="hidden sm:block" />
            We'd love to hear from you.
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 32C840 27 960 21 1080 21.3C1200 21 1320 27 1380 29.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="#F0F9FF"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        
        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl inline-block mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">📧 Email</h3>
            <a  className="text-base sm:text-lg text-blue-600 hover:text-blue-700 font-medium break-all">
              menuver26@gmail.com
            </a>
            <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4">
              Send us an email anytime. We typically respond within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-200 hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl inline-block mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">📍 Location</h3>
            <p className="text-base sm:text-lg text-gray-700 font-medium">
              Karnataka, India
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4">
              We&apos;re a remote-first team building MenuVer from India.
            </p>
          </div>
        </div>

        {/* Restaurant Owners Section */}
        <div className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-2xl flex-shrink-0">
                <span className="text-3xl sm:text-4xl">👨‍🍳</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">For Restaurant Owners</h2>
                <p className="text-sm sm:text-base md:text-lg opacity-90">
                  Want your restaurant listed on MenuVer? Contact us with your restaurant name and details.
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
              <p className="text-sm sm:text-base mb-3 sm:mb-4">✨ What we need from you:</p>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>• Restaurant name and location</li>
                <li>• Contact information</li>
                <li>• Brief description of your restaurant</li>
                <li>• Menu details (We&apos;ll help you digitize it!)</li>
              </ul>
            </div>

            <a href="./Registeration">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Register Your Restaurant →
              </button>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
              Send Us a Message
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Fill out the form below and We&apos;ll get back to you as soon as possible
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border-4 border-purple-200">
            <div className="space-y-5 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base sm:text-lg">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-base sm:text-lg"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base sm:text-lg">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-base sm:text-lg"
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base sm:text-lg">
                  Subject <span className="text-gray-400 text-sm">(optional)</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-base sm:text-lg"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-base sm:text-lg">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-base sm:text-lg resize-none"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-400 to-red-600  text-white py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                Send Message
              </button>

              <p className="text-center text-gray-500 text-xs sm:text-sm mt-4">
                We'll respond to your message within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
            Looking for something specific?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
            <a href="./About" className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-700 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border-2 border-gray-200">
              About MenuVer
            </a>
            <a href="./Allhotels" className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-700 rounded-full font-semibold hover:shadow-lg transition-all duration-300 border-2 border-gray-200">
              Browse Restaurants
            </a>
            <a href="./Registeration" className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              List Your Restaurant
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;