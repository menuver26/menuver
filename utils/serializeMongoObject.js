/**
 * Serialize MongoDB objects to plain JavaScript objects
 * This removes MongoDB-specific fields and methods like _id, toJSON, etc.
 * and converts them to serializable values for Client Components
 */

export function serializeItem(item) {
  if (!item) return null;
  // console.log(item.images)
  return {
    id: item._id?.toString() || item.id?.toString() || '',
    name: item.name || 'Unknown Item',
    price: Number(item.price) || 0,
    category: item.category || 'General',
    description: item.description || 'No description available',
    images: Array.isArray(item.images)
      ? item.images.map(img => img.url)
      : [],

    rating: Number(item.rating) || 4.5,
    tags: Array.isArray(item.tags) ? item.tags.map(tag => String(tag)) : [],
    hotelSlug: item.hotelSlug || '',
    hotel_id: item.hotel_id?.toString() || '',
    slug: item.slug || '',
    top: Boolean(item.top),
    // Add any other fields you might have
    availability: Boolean(item.availability),
    preparationTime: Number(item.preparationTime) || 15,
    spiceLevel: item.spiceLevel || 'medium',
    vegetarian: Boolean(item.vegetarian),
    vegan: Boolean(item.vegan),
    glutenFree: Boolean(item.glutenFree)
  };
}

export function serializeItems(items) {
  if (!Array.isArray(items)) return [];
  
  return items.map(item => serializeItem(item));
}

export default serializeItem;
