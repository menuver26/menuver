export const runtime = "nodejs";

import cloudinary from "@/utils/cloudary/cloudary_data";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return Response.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploaded = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "hotels" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return Response.json({
      url: uploaded.secure_url, // 👈 VERY IMPORTANT
      public_id: uploaded.public_id,
    });

  } catch (err) {
    console.error("Hotel image upload error:", err);
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
