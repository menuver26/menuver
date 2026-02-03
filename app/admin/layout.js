import Link from 'next/link';
import AdminNavbar from '../components/AdminNavbar';

export const metadata = {
  title: "Admin Dashboard - Menu System",
  description: "Admin panel for managing hotels and menus",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation */}
    
      <AdminNavbar />
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
