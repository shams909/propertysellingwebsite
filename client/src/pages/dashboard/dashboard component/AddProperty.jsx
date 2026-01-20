import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaBuilding,
  FaParking,
  FaShieldAlt,
  FaBatteryFull,
  FaWifi,
  FaTshirt,
  FaVideo,
  FaShower,
  FaStethoscope,
  FaDoorOpen,
} from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { addProperty } from "../../../api/properties.api";

import toast from "react-hot-toast";

import { AuthContext } from "../../../provider/AuthProvider";

const amenitiesIconMap = {
  Lift: FaBuilding,
  Parking: FaParking,
  Security: FaShieldAlt,
  Generator: FaBatteryFull,
  "Free Wi-Fi": FaWifi,
  Laundry: FaTshirt,
  CCTV: FaVideo,
  "Air Conditioning": TbAirConditioning,
  Shower: FaShower,
  Doctor: FaStethoscope,
  "Emergency Exit": FaDoorOpen,
  Gym: CgGym,
};

const AddProperty = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      propertyName: "",
      propertyType: "Apartment",
      propertyStatus: "For Sale",
      price: "",
      thumbnail: "",
      details: {
        totalRoom: "",
        beds: "",
        baths: "",
        belcony: "",
        area: "",
        buildYear: "",
      },
      amenities: [],
      images: [],
      videos: [],
      location: {
        address: "",
        city: "",
        area: "",
        country: "",
        zip_code: "",
      },
      description: "",
      agent: {
        name: "",
        phone: "",
        email: "",
        photoUrl: "",
      },
      agencyId: "",
      agencyEmail: "",
      agency: {
        agencyName: "",
        location: "",
        title: "",
        logoUrl: "",
      },
      isFeatured: false,
      isAdminAproved: false,
    },
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    // Validate required fields
    if (!data.propertyName || !data.price) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (!data.images || data.images.length === 0) {
      toast.error("Please upload at least one property image!");
      return;
    }

    setLoading(true);
    
    // Step 2: Prepare property data (without agency object, only agencyId)
    const propertyData = {
      propertyName: data.propertyName,
      propertyType: data.propertyType,
      propertyStatus: data.propertyStatus,
      price: Number(data.price),
      thumbnail:
        data.thumbnail ||
        (data.images && data.images.length > 0 ? data.images[0] : ""),
      details: {
        totalRoom: data.details.totalRoom || "",
        beds: data.details.beds || "",
        baths: data.details.baths || "",
        belcony: data.details.belcony || "",
        area: data.details.area || "",
        buildYear: data.details.buildYear || "",
      },
      amenities: data.amenities || [],
      images: data.images || [],
      videos: data.videos
        ? data.videos.filter((video) => video && video.trim() !== "")
        : [],
      location: {
        address: data.location.address || "",
        city: data.location.city || "",
        area: data.location.area || "",
        country: data.location.country || "",
        zip_code: data.location.zip_code || "",
      },
      description: data.description || "",
      agent: {
        name: user?.displayName || "",
        phone: data.agent.phone || "",
        email: user?.email || "",
        photoUrl: user?.photoURL || "",
      },
      agencyId: "",
      agencyEmail: data.agencyEmail || "",
      agency: data.agency || {},
      isFeatured: data.isFeatured || false,
      isAdminAproved:  'pending',
      createdAt: new Date().toISOString(),
    };

    // Step 3: Post property to MongoDB
    const response = await addProperty(propertyData);

    if (response.data) {
      toast.success("Property added successfully!");
      // Reset form
      setImagePreviews([]);
      setLoading(false);
      // Optionally navigate to properties list or reset form
      // navigate("/dashboard/properties");
    }
  };

  const IMGBB_KEY = "cc5debad09732d7aad4794f4dd101dc5";

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data.url;
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 4);

    if (files.length === 0) return;

    try {
      setUploading(true);

      // preview (local)
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);

      // upload → get URLs
      const urls = await Promise.all(files.map((file) => uploadImage(file)));

      //  save URLs instead of files
      setValue("images", urls);

      // Set thumbnail to first image
      if (urls.length > 0) {
        setValue("thumbnail", urls[0]);
      }

      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again!");
      setImagePreviews([]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl my-6 mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-orange-600">Add New Property</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ---------------- General Info ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">
            General Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("propertyName", { required: true })}
              placeholder="Property Name"
              className="input input-bordered w-full"
            />
            <select
              {...register("propertyType")}
              className="select select-bordered w-full"
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Commercial</option>
            </select>
            <select
              {...register("propertyStatus")}
              className="select select-bordered w-full"
            >
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>
        </section>

        {/* ---------------- Property Details ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">
            Property Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              {...register("details.totalRoom")}
              placeholder="Total Rooms"
              className="input input-bordered w-full"
            />
            <input
              {...register("details.beds")}
              placeholder="Beds"
              className="input input-bordered w-full"
            />
            <input
              {...register("details.baths")}
              placeholder="Baths"
              className="input input-bordered w-full"
            />
            <input
              {...register("details.belcony")}
              placeholder="Balcony"
              className="input input-bordered w-full"
            />
            <input
              {...register("details.area")}
              placeholder="Area (sq.ft)"
              className="input input-bordered w-full"
            />
            <input
              {...register("details.buildYear")}
              placeholder="Build Year"
              className="input input-bordered w-full"
            />
          </div>
        </section>

        {/* ---------------- Amenities ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(amenitiesIconMap).map((amenity) => {
              const Icon = amenitiesIconMap[amenity];
              return (
                <label
                  key={amenity}
                  className="flex items-center gap-2 p-2 border rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={amenity}
                    {...register("amenities")}
                    className="checkbox checkbox-primary"
                  />
                  <Icon className="text-orange-600" size={20} />
                  {amenity}
                </label>
              );
            })}
          </div>
        </section>

        {/* ---------------- Images Upload ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">
            Property Images
          </h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="file-input file-input-bordered w-full"
          />
          {uploading && (
            <div className="text-sm text-orange-600">Uploading images...</div>
          )}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {imagePreviews.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Preview ${idx}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </section>

        {/* ---------------- Videos ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">
            Property Videos
          </h3>
          <input
            {...register("videos.0")}
            placeholder="Video URL 1"
            className="input input-bordered w-full"
          />
          <input
            {...register("videos.1")}
            placeholder="Video URL 2"
            className="input input-bordered w-full"
          />
        </section>

        {/* ---------------- Location ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              {...register("location.address")}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <input
              {...register("location.area")}
              placeholder="Area"
              className="input input-bordered w-full"
            />
            <input
              {...register("location.city")}
              placeholder="City"
              className="input input-bordered w-full"
            />
            <input
              {...register("location.country")}
              placeholder="Country"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              {...register("location.zip_code")}
              placeholder="Zip Code"
              className="input input-bordered w-full"
            />
          </div>
        </section>

        {/* ---------------- Description ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">Description</h3>
          <textarea
            {...register("description")}
            placeholder="Property Description"
            className="textarea textarea-bordered w-full h-32"
          />
        </section>

        {/* ---------------- Agent Info ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">Agent Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("agent.name")}
              placeholder="Agent Name"
              value={user?.displayName}
              className="input input-bordered w-full"
            />
            <input
              type="email"
              {...register("agent.email")}
              placeholder="Agent Email"
              value={user?.email}
              className="input input-bordered w-full"
            />
            <input
              type="number"
              {...register("agent.phone")}
              placeholder="Agent Phone"
              className="input input-bordered w-full"
            />
            <input
              {...register("agent.photoUrl")}
              placeholder="Agent Photo URL"
              value={user?.photoURL}
              className="input input-bordered w-full"
            />
          </div>
        </section>

        {/* ---------------- Agency Info ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-orange-500">Agency Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              {...register("agencyEmail")}
              placeholder="Agency Email (to verify existing agency)"
              className="input input-bordered w-full"
            />
            <input
              {...register("agency.agencyName")}
              placeholder="Agency Name"
              className="input input-bordered w-full"
            />
            <input
              {...register("agency.location")}
              placeholder="Agency Location"
              className="input input-bordered w-full"
            />
            <input
              {...register("agency.title")}
              placeholder="Agency Title"
              className="input input-bordered w-full"
            />
            <input
              {...register("agency.logoUrl")}
              placeholder="Agency Logo URL"
              className="input input-bordered w-full"
            />
          </div>
        </section>

        {/* ---------------- Extra Options ---------------- */}
        <section className="p-4 border rounded-lg shadow-sm space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="checkbox checkbox-primary"
            />
            Mark as Featured
          </label>
         
        </section>

        <button
          type="submit"
          disabled={loading || uploading}
          className="btn btn-primary w-full bg-linear-to-r from-orange-400 to-orange-600 border-none text-white disabled:opacity-50"
        >
          {loading
            ? "Adding Property..."
            : uploading
            ? "Uploading Images..."
            : "Add Property"}
        </button>

        {errors.propertyName && (
          <p className="text-red-500 text-sm">Property name is required</p>
        )}
        {errors.price && (
          <p className="text-red-500 text-sm">Price is required</p>
        )}
      </form>
    </div>
  );
};

export default AddProperty;
