import "server-only";
export const runtime = "nodejs";
import menu from "@/models/menu";
import connectdb  from "@/dbcoonect/connectdb";
import cloudinary from "@/utils/cloudary/cloudary_data";



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    await connectdb();
    const formData = await req.formData();
    const images = formData.getAll("image");
    console.log(images)
    console.log("📥 IMAGE COUNT:", images.length);

    if (!images?.length) {
      return Response.json({ error: "No images" }, { status: 400 });
    }

    const uploadedImages = []; 

    for (const img of images) {
      const buffer = Buffer.from(await img.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "menu_items" },
          (err, result) => err ? reject(err) : resolve(result)
        ).end(buffer);
      });
      
      uploadedImages.push({
        url: uploadRes.secure_url,
        public_id: uploadRes.public_id
      });
    }

    console.log("🔗 FINAL IMAGES:", uploadedImages);

    const newMenu = await menu.create({
      name: formData.get("name"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      rating: Number(formData.get("rating")),
      hotelSlug: formData.get("hotelSlug"),
      hotel_id: Number(formData.get("hotel_id")),
      top: formData.get("top") === "true",
      images: uploadedImages  // ✅ Perfect match!
    });

    return Response.json({ success: true, menu: newMenu });
  } catch (err) {
    console.error("❌ Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

