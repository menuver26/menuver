// app/admin/dashboard/page.js
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700 mb-6">Manage your hotels and menus.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/dashboard/hotels" className="block p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Hotels</h2>
            <p className="text-sm text-gray-500 mt-2">Add / edit hotels</p>
          </Link>

          <Link href="/admin/dashboard/menus" className="block p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Menus</h2>
            <p className="text-sm text-gray-500 mt-2">Manage menu items</p>
          </Link>

          <div className="block p-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Settings</h2>
            <p className="text-sm text-gray-500 mt-2">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}