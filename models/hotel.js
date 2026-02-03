import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    hotel_id: Number,
    description: String,
    location:String,
    image:String,
    rating:{type:Number ,require:false}
  },
  { timestamps: true }
);


// const restaurantSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//     index: true
//   },
//   slug: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true
//   },
//   description: String,
//   logo: {
//     url: String,
//     alt: String
//   },
//   contact: {
//     email: { type: String, lowercase: true },
//     phone: String,
//     website: String
//   },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String,
//     country: String,
//     coordinates: {
//       lat: Number,
//       lng: Number
//     }
//   },
//   businessHours: [{
//     day: {
//       type: String,
//       enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
//     },
//     open: String,
//     close: String,
//     isClosed: { type: Boolean, default: false }
//   }],
//   cuisine: [String],
//   settings: {
//     currency: { type: String, default: 'USD' },
//     taxRate: { type: Number, default: 0 },
//     serviceCharge: { type: Number, default: 0 },
//     acceptsOnlineOrders: { type: Boolean, default: false },
//     acceptsReservations: { type: Boolean, default: false }
//   },
//   socialMedia: {
//     facebook: String,
//     instagram: String,
//     twitter: String,
//     youtube: String
//   },
//   isActive: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// restaurantSchema.index({ slug: 1 });
// restaurantSchema.index({ 'address.city': 1, cuisine: 1 });

export default mongoose.models.Hotel ||
  mongoose.model("Hotel", hotelSchema);