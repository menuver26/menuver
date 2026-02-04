"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function HotelForm({ hotel, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    location: '',
    image: '',
    description: '',
    hotel_id: '',
    rating:''
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Initialize form with hotel data if editing
  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || '',
        slug: hotel.slug || '',
        location: hotel.location || '',
        image: hotel.image || '',
        description: hotel.description || '',
        hotel_id: hotel.hotel_id || '',
        rating:hotel.rating
      });
      setImagePreview(hotel.image || '');
    }
  }, [hotel]);

  // Auto-generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug when name changes
    if (name === 'name' && !hotel) { // Only auto-generate for new hotels
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    console.log('Uploading file to Cloudinary:', {
      name: file.name,
      size: file.size,
      type: file.type
    });
    
    try {
      // Upload to Cloudinary via the uploads_cloudary endpoint
      const response = await fetch('/api/uploads_cloudary', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        // console.log('Upload response from Cloudinary:', data);
        // console.log('Cloudinary URL:', data.url);
        return data.url; // Use the secure_url from Cloudinary
      } else {
        const errorData = await response.json();
        console.error('Upload error response:', errorData);
        alert(`Upload failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let finalFormData = { ...formData };
      
      // console.log('Form data before image upload:', finalFormData);
      
      // Upload new image if selected
      if (imageFile) {
        // console.log('Image file selected, uploading...');
        const imageUrl = await uploadImage(imageFile);
        if (imageUrl) {
          finalFormData.image = imageUrl;
          console.log('Form data after image upload:', finalFormData);
        } else {
          console.error('Image upload failed, no URL returned');
        }
      } else {
        console.log('No new image file selected');
      }
      
      // console.log('Final form data being submitted:', finalFormData);
      
      await onSubmit(finalFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hotel Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Hotel Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter hotel name"
          />
        </div>

        {/* Hotel ID */}
        <div>
          <label htmlFor="hotel_id" className="block text-sm font-medium text-gray-700 mb-2">
            Hotel ID
          </label>
          <input
            type="number"
            id="hotel_id"
            name="hotel_id"
            value={formData.hotel_id}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter hotel ID (optional)"
          />
          <p className="mt-1 text-xs text-gray-500">Leave empty to auto-generate</p>
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="hotel-slug-for-url"
          />
          <p className="mt-1 text-xs text-gray-500">Used in URLs (lowercase, no spaces)</p>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter hotel location"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter hotel description"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          Hotel Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-2">Preview:</p>
            <Image
              src={imagePreview}
              alt="Hotel preview"
              className="w-32 h-32 object-cover rounded-md border border-gray-300"
            />
          </div>
        )}
        
        {/* Current Image URL (for editing) */}
        {!imageFile && formData.image && (
          <div className="mt-2">
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Or enter image URL"
            />
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {loading ? 'Saving...' : hotel ? 'Update Hotel' : 'Create Hotel'}
        </button>
      </div>
    </form>
  );
}
