import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-red-500">
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30">
                <p className="text-sm sm:text-base font-semibold text-white">Legal</p>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
              Privacy Policy
            </h1>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-base sm:text-lg font-medium text-white">
                Last updated: February 2026
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 11.1C120 22 240 44 360 48.9C480 53 600 40 720 35.6C840 31 960 36 1080 44.4C1200 53 1320 67 1380 73.3L1440 80V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="url(#wave-gradient)"/>
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EEF2FF" />
                <stop offset="100%" stopColor="#FAF5FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        
        {/* Introduction */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 mb-8 border-2 border-indigo-200 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome to Menuver</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Welcome to Menuver. Your privacy is important to us. This Privacy Policy explains how information is handled when you visit our website.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Menuver is an informational website that displays hotel and restaurant menus. <strong className="text-indigo-600">We do not collect, store, or require any personal data from users.</strong>
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            By using Menuver, you agree to this Privacy Policy.
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 mb-8 border-2 border-green-200 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 p-4 rounded-2xl shadow-lg flex-shrink-0">
              <span className="text-3xl font-black text-white">1</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Information We Do NOT Collect</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 mb-4 font-medium">
            Menuver does not collect:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {['Names', 'Email addresses', 'Phone numbers', 'Login credentials', 'Payment information', 'User-generated content'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 p-6 rounded-2xl shadow-lg">
            <p className="text-base sm:text-lg text-white font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              There is no sign-up, no login, and no account system on our website.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 mb-8 border-2 border-blue-200 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-2xl shadow-lg flex-shrink-0">
              <span className="text-3xl font-black text-white">2</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Automatically Collected Information</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            Like most websites, Menuver may automatically collect non-personal, technical information such as:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {['Browser type', 'Device type', 'Pages visited', 'Time and date of visit'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-200">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-base sm:text-lg text-gray-700 italic">
            This data is anonymous and used only to understand website performance and improve user experience.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 mb-8 border-2 border-purple-200 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg flex-shrink-0">
              <span className="text-3xl font-black text-white">3</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Cookies</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            Menuver may use cookies to:
          </p>
          <div className="space-y-3 mb-4">
            {['Improve site functionality', 'Analyze traffic and usage patterns'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                <div className="bg-purple-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-base sm:text-lg text-gray-700">
            You can disable cookies through your browser settings if you prefer. Disabling cookies may affect certain site features.
          </p>
        </div>

        {/* Section 4 */}
        {/* <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 mb-8 border-2 border-orange-200 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl shadow-lg flex-shrink-0">
              <span className="text-3xl font-black text-white">4</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Advertising (Google AdSense)</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            Menuver may display advertisements provided by third-party services such as Google AdSense.
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-4">
            Google may use cookies (including the DoubleClick cookie) to serve ads based on a user's visit to this and other websites.
          </p>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-200 mb-4">
            <p className="text-base sm:text-lg text-gray-700 mb-3 font-semibold">
              Manage your ad preferences:
            </p>
            <div className="space-y-3">
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium group">
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Google Ad Settings
              </a>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium group">
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Google Privacy Policy
              </a>
            </div>
          </div>
        </div> */}

        {/* Sections 5-10 in a compact grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Section 5 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-red-200 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-red-500 to-rose-600 p-3 rounded-xl shadow-lg">
                <span className="text-2xl font-black text-white">4</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Third-Party Links</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Menuver may contain links to third-party websites (such as hotel or restaurant pages). We are not responsible for the privacy practices or content of those external sites.
            </p>
          </div>

          {/* Section 6 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-teal-200 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-3 rounded-xl shadow-lg">
                <span className="text-2xl font-black text-white">5</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Data Security</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Since Menuver does not collect personal data, the risk to user privacy is minimal. We still take reasonable technical measures to keep the website secure.
            </p>
          </div>

          {/* Section 7 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-pink-200 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-3 rounded-xl shadow-lg">
                <span className="text-2xl font-black text-white">6</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Children&apos;s Information</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Menuver does not knowingly collect any personal information from children under the age of 13.
            </p>
          </div>

          {/* Section 8 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-indigo-200 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <span className="text-2xl font-black text-white">7</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Online Policy Only</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              This Privacy Policy applies only to information collected through this website and not to any offline activities.
            </p>
          </div>

          {/* Section 9 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-yellow-200 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 p-3 rounded-xl shadow-lg">
                <span className="text-2xl font-black text-white">8</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Consent</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              By using Menuver, you consent to this Privacy Policy and agree to its terms.
            </p>
          </div>

          {/* Section 10 */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-cyan-200 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl shadow-lg">
                <span className="text-2xl font-black text-white">9</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Updates</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date.
            </p>
          </div>
        </div>

        {/* Section 11 - Contact */}
        <div className="bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl p-8 sm:p-12 mb-8 text-white transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-lg flex-shrink-0">
              <span className="text-3xl font-black">10</span>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Contact Us</h2>
              <div className="h-1 w-20 bg-white/60 rounded-full"></div>
            </div>
          </div>
          <p className="text-base sm:text-lg mb-6 opacity-90">
            If you have any questions about this Privacy Policy, you may contact us at:
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm opacity-75">Email us at</p>
                <a className="text-xl sm:text-2xl font-bold hover:underline">
                  menuver26@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl p-8 sm:p-12 text-center text-white">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Menuver
          </h3>
          <p className="text-xl sm:text-2xl font-medium mb-2">
            Simple menus. No data collection.
          </p>
          <p className="text-sm sm:text-base opacity-75">
            Your privacy matters to us 🔒
          </p>
        </div>
      </div>
    </div>
  );
}