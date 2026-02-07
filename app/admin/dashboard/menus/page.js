// "use client";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// export default function AddMenuPage() {
//   const [imagePreview, setImagePreview] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const formRef = useRef(null);
//   const objectUrlRef = useRef("");

//   const handleImageChange = (e) => {
//   const files = Array.from(e.target.files); // ✅ ALL files

//   if (!files.length) return;
//   const allowed = ["image/jpeg", "image/png", "image/webp"];
//   for (const file of files) {
//     if (!allowed.includes(file.type)) {
//       setMessage({ type: "error", text: "Only JPG, PNG, WEBP allowed" });
//       e.target.value = "";
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setMessage({ type: "error", text: "Each image must be under 5MB" });
//       e.target.value = "";
//       return;
//     }
//   }
//   // Preview only first image (optional)
//   if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
//   const previewUrl = URL.createObjectURL(files[0]);
//   objectUrlRef.current = previewUrl;
//   setImagePreview(previewUrl);
// };
//   useEffect(() => {
//     return () => {
//       if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
//     };
//   }, []);

//   const handleSubmit = async (e) => {
    
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage({ type: "", text: "" });
//     try {
//       const newformdata = new FormData(e.target);
//       console.log(newformdata.get('hotel_id'))
//       const iddata = await fetch("/api/hotelmenuidmatch", {
//         method: "POST",
//         body: newformdata,
//       });
//       const response = await iddata.json();
//       console.log(response)
//       if (!response.success) {
//         console.log("Hotel ID not matched");
//         alert("hotel ID and name is not valid");
//         return;
//       }
//       const formData = new FormData(e.target);
//       const res = await fetch("/api/menu", {
//         method: "POST",
//         body: formData,
//       });


//       const data = await res.json().catch(() => ({}));

//       if (!res.ok) {
//         throw new Error(data?.error || "Failed to add menu item.");
//       }

//       setMessage({ type: "success", text: "Menu added successfully!" });

//       formRef.current?.reset();
//       setImagePreview("");

//       if (objectUrlRef.current) {
//         URL.revokeObjectURL(objectUrlRef.current);
//         objectUrlRef.current = "";
//       }
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: err?.message || "Something went wrong. Please try again.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   const handleReset = () => {
//     setImagePreview("");
//     setMessage({ type: "", text: "" });
//     if (objectUrlRef.current) {
//       URL.revokeObjectURL(objectUrlRef.current);
//       objectUrlRef.current = "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-10">
//       <div className="mx-auto max-w-5xl px-4">
//         <header className="mb-8">
//           <h1 className="text-2xl font-semibold text-slate-800">Add Menu</h1>
//           <p className="text-slate-500">Create a new menu item and upload its image.</p>
//         </header>

//         {message.text ? (
//           <div
//             className={`mb-6 rounded-lg border px-4 py-3 text-sm ${message.type === "success"
//               ? "border-emerald-200 bg-emerald-50 text-emerald-700"
//               : "border-rose-200 bg-rose-50 text-rose-700"
//               }`}
//           >
//             {message.text}
//           </div>
//         ) : null}

//         <form
//           ref={formRef}
//           onSubmit={handleSubmit}
//           onReset={handleReset}
//           encType="multipart/form-data"
//           className="grid gap-6 lg:grid-cols-3"
//         >
//           <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
//             <div className="grid gap-4 sm:grid-cols-2">

//               {/* ✅ Menu Name (required by schema) */}
//               <div>
//                 <label className="mb-1 block text-xs font-medium text-slate-600">Menu Name</label>
//                 <input
//                   name="name"
//                   type="text"
//                   placeholder="e.g. Chicken Biryani"
//                   required
//                   className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
//                 />
//               </div>

//               {/* ✅ Category */}
//               <div>
//                 <label htmlFor="category" className="mb-1 block text-xs font-medium text-slate-600">
//                   Category
//                 </label>
//                 <select
//                   id="category"
//                   name="category"
//                   required
//                   className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//                 >
//                   <option value="meal">Meal</option>
//                   <option value="dessert">Dessert</option>
//                   <option value="snack">Snack</option>
//                   <option value="drink">Drink</option>
//                   <option value="appetizer">appetizer</option>
//                 </select>
//               </div>


//               <div>
//                 <label className="mb-1 block text-xs font-medium text-slate-600">Price</label>
//                 <input
//                   name="price"
//                   type="number"
//                   step="0.01"
//                   required
//                   placeholder="199"
//                   className="w-full rounded-lg border px-3 py-2.5 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-xs font-medium text-slate-600">Rating</label>
//                 <input
//                   name="rating"
//                   type="number"
//                   step="0.1"
//                   min="0"
//                   max="5"
//                   required
//                   placeholder="4.5"
//                   className="w-full rounded-lg border px-3 py-2.5 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-xs font-medium text-slate-600">Menu Slug</label>
//                 <input
//                   name="hotelSlug"
//                   type="text"
//                   placeholder="ocean-view-hotel"
//                   required
//                   className="w-full rounded-lg border px-3 py-2.5 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-xs font-medium text-slate-600">Hotel slug (main)</label>
//                 <input
//                   name="slug"
//                   type="text" 
//                   required
//                   placeholder="Hotel name"
//                   className="w-full rounded-lg border px-3 py-2.5 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-xs font-medium text-slate-600">Hotel ID (Main)</label>
//                 <input
//                   name="hotel_id"
//                   type="number"
//                   required
//                   placeholder="1"
//                   className="w-full rounded-lg border px-3 py-2.5 text-sm"

//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-xs font-medium text-slate-600">Top Dish?</label>
//                 <select
//                   name="top"
//                   className="w-full rounded-lg border px-3 py-2.5 text-sm"
//                 >
//                   <option value="false">No</option>
//                   <option value="true">Yes</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
//               <label className="mb-2 block text-sm font-medium">Image</label>
//               <div className="relative">
//                 <label className="group flex h-56 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-slate-50">
//                   {imagePreview ? (
//                     <Image width={300}
//                     height={240} src={imagePreview} alt="no button" className="h-full w-full object-cover" />
//                   ) : (
//                     <div className="text-center text-slate-500">
//                       <p>Click to upload</p>
//                     </div>
//                   )}
//                 </label>

//                 <input
//                   name="image"
//                   type="file"
//                   accept="image/*"
//                   required
//                   multiple
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   onChange={handleImageChange}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-3 flex justify-end gap-3">
//             <button
//               type="reset"
//               className="rounded-lg border px-4 py-2"
//               disabled={isSubmitting}
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Adding..." : "Add Menu"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// app/admin/dashboard/menus/page.js
// app/admin/dashboard/menus/page.js
import connectdb from "@/dbcoonect/connectdb";
import Menu from "@/models/menu";
import Hotel from "@/models/hotel";
import MenuListClient from "@/components/admin/MenuListClient";
import Link from "next/link";

export default async function MenuManagementPage() {
  await connectdb();

  const menus = await Menu.find({}).lean();
  const hotels = await Hotel.find({}).lean();

  const hotelMap = {};
  hotels.forEach(h => {
    hotelMap[h.hotel_id?.toString()] = h.name;
  });

  const serializedMenus = menus.map(m => {
    const hotelId = (m.hotelId || m.hotel_id || m.hotel) ? (m.hotelId || m.hotel_id || m.hotel) : null;
    return {
      ...m,
      _id: m._id?.toString(),
      hotelId: hotelId ? hotelId.toString() : null,
      images: Array.isArray(m.images)
        ? m.images.map(img => ({
            url: typeof img === "string" ? img : (img?.url || ""),
            public_id: img?.public_id || img?.publicId || "",
          }))
        : [],
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-100">
      <div className="bg-gradient-to-r  from-orange-400  to-red-500 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-2xl">
              {/* icon */}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Menu Management</h1>
              <p className="text-sm sm:text-base text-gray-300 mt-1">Manage all restaurant menus</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-3 rounded-full inline-block">
              <p className="text-sm sm:text-base font-semibold">Total Menus: {serializedMenus.length}</p>
            </div>

            <Link href="/admin/dashboard/menus/add" className="inline-block">
              <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-md">
                + Add Menu
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <MenuListClient initialMenus={serializedMenus} hotelMap={hotelMap} />
      </div>
    </div>
  );
}