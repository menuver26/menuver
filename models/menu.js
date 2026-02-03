import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    hotelSlug: String,
    hotel_id: Number,
    price: Number,
    description: String,
    category: String,
    images: [{ url: String, public_id: String }],
    top: Boolean,
  },
  { timestamps: true }
);

const Menu =
  mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
