"use client"
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your hotels and menu system</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏨</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Hotels</h3>
              <p className="text-sm text-gray-600">Manage hotel listings</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/admin/dashboard/hotels"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors duration-200"
            >
              Manage Hotels
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Menus</h3>
              <p className="text-sm text-gray-600">Manage the Menu</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/admin/dashboard/menus"

              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors duration-200"
            >
              Manage Menu
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
              <p className="text-sm text-gray-600">System configuration</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              disabled
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-md cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/dashboard/hotels"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-2xl mr-3">➕</span>
            <div>
              <div className="font-medium text-gray-900">Add Hotel</div>
              <div className="text-sm text-gray-500">Create new hotel</div>
            </div>
          </Link>

          <Link
            href="/admin/hotels"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-2xl mr-3">📝</span>
            <div>
              <div className="font-medium text-gray-900">Edit Hotels</div>
              <div className="text-sm text-gray-500">Manage existing</div>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-2xl mr-3">👁️</span>
            <div>
              <div className="font-medium text-gray-900">View Site</div>
              <div className="text-sm text-gray-500">Public website</div>
            </div>
          </Link>

          <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50 cursor-not-allowed">
            <span className="text-2xl mr-3">📊</span>
            <div>
              <div className="font-medium text-gray-400">Analytics</div>
              <div className="text-sm text-gray-400">Coming soon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Getting Started</h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Start by adding your first hotel using the "Hotels" section</li>
          <li>Fill in all hotel details including name, slug, location, and description</li>
          <li>Upload a high-quality image for your hotel</li>
          <li>Your hotel will be accessible via the slug URL (e.g., &quot;/your-hotel-slug&quot;)</li>        </ol>
      </div>
    </div>
  );
}
