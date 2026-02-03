"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
export default function AddMenuPage() {
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const formRef = useRef(null);
  const objectUrlRef = useRef("");

  const handleImageChange = (e) => {
  const files = Array.from(e.target.files); // ✅ ALL files

  if (!files.length) return;
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  for (const file of files) {
    if (!allowed.includes(file.type)) {
      setMessage({ type: "error", text: "Only JPG, PNG, WEBP allowed" });
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Each image must be under 5MB" });
      e.target.value = "";
      return;
    }
  }
  // Preview only first image (optional)
  if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  const previewUrl = URL.createObjectURL(files[0]);
  objectUrlRef.current = previewUrl;
  setImagePreview(previewUrl);
};
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      const newformdata = new FormData(e.target);
      console.log(newformdata.get('hotel_id'))
      const iddata = await fetch("/api/hotelmenuidmatch", {
        method: "POST",
        body: newformdata,
      });
      const response = await iddata.json();
      console.log(response)
      if (!response.success) {
        console.log("Hotel ID not matched");
        alert("hotel ID and name is not valid");
        return;
      }
      const formData = new FormData(e.target);
      const res = await fetch("/api/menu", {
        method: "POST",
        body: formData,
      });


      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Failed to add menu item.");
      }

      setMessage({ type: "success", text: "Menu added successfully!" });

      formRef.current?.reset();
      setImagePreview("");

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = "";
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleReset = () => {
    setImagePreview("");
    setMessage({ type: "", text: "" });
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-800">Add Menu</h1>
          <p className="text-slate-500">Create a new menu item and upload its image.</p>
        </header>

        {message.text ? (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
              }`}
          >
            {message.text}
          </div>
        ) : null}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onReset={handleReset}
          encType="multipart/form-data"
          className="grid gap-6 lg:grid-cols-3"
        >
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">

              {/* ✅ Menu Name (required by schema) */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Menu Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. Chicken Biryani"
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
                />
              </div>

              {/* ✅ Category */}
              <div>
                <label htmlFor="category" className="mb-1 block text-xs font-medium text-slate-600">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="meal">Meal</option>
                  <option value="dessert">Dessert</option>
                  <option value="snack">Snack</option>
                  <option value="drink">Drink</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>


              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Price</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  placeholder="199"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Rating</label>
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                  placeholder="4.5"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Menu Slug</label>
                <input
                  name="hotelSlug"
                  type="text"
                  placeholder="ocean-view-hotel"
                  required
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Hotel slug (main)</label>
                <input
                  name="slug"
                  type="text" 
                  required
                  placeholder="Hotel name"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Hotel ID (Main)</label>
                <input
                  name="hotel_id"
                  type="number"
                  required
                  placeholder="1"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"

                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Top Dish?</label>
                <select
                  name="top"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className="mb-2 block text-sm font-medium">Image</label>
              <div className="relative">
                <label className="group flex h-56 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-slate-50">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="no button" className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-center text-slate-500">
                      <p>Click to upload</p>
                    </div>
                  )}
                </label>

                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  required
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex justify-end gap-3">
            <button
              type="reset"
              className="rounded-lg border px-4 py-2"
              disabled={isSubmitting}
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Menu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
