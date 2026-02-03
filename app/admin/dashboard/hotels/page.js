"use client";
import { useState, useEffect } from 'react';
import HotelForm from '@/components/admin/HotelForm';
import HotelList from '@/components/admin/HotelList';

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Fetch hotels from API
  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/hotels');
      if (response.ok) {
        const data = await response.json();
        setHotels(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleAddHotel = () => {
    setEditingHotel(null);
    setShowForm(true);
  };

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);
    setShowForm(true);
  };

  const handleDeleteHotel = async (hotelId) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        const response = await fetch(`/api/admin/hotels/${hotelId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchHotels(); // Refresh the list
        } else {
          alert('Error deleting hotel');
        }
      } catch (error) {
        console.error('Error deleting hotel:', error);
        alert('Error deleting hotel');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const url = editingHotel 
        ? `/api/admin/hotels/${editingHotel._id}`
        : '/api/admin/hotels';
      
      const method = editingHotel ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingHotel(null);
        fetchHotels(); // Refresh the list
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to save hotel'}`);
      }
    } catch (error) {
      console.error('Error saving hotel:', error);
      alert('Error saving hotel');
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingHotel(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hotel Management</h1>
              <p className="mt-2 text-sm text-gray-600">Manage your hotels and their information</p>
            </div>
            <button
              onClick={handleAddHotel}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Add New Hotel
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
            </h2>
            <HotelForm
              hotel={editingHotel}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Hotels</h2>
            </div>
            <HotelList
              hotels={hotels}
              loading={loading}
              onEdit={handleEditHotel}
              onDelete={handleDeleteHotel}
            />
          </div>
        )}
      </div>
    </div>
  );
}
