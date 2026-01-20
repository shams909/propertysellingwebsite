import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import usePropertyById from "../../../hooks/usePropertyById";
import { AuthContext } from "../../../provider/AuthProvider";
import axiosSecure from "../../../axios/axiosSecure";
import toast from "react-hot-toast";
import useAdmin from "../../../hooks/useAdmin";

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

const UpdatePropertyDetails = () => {
  const param = useParams();
  const id = param.id;
  const { user } = useContext(AuthContext);
  const { data: property, isLoading } = usePropertyById(id);
  const { data: isAdmin } = useAdmin(user?.email);

  const rule = isAdmin?.admin;
  const [admin, setAdmin] = useState(false);
  if (rule === true) {
    if (!admin) {
      setAdmin(true);
    }
  }

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
      agencyEmail: "",
      agency: {
        agencyName: "",
        location: "",
        title: "",
        logoUrl: "",
      },
      isFeatured: false,
    },
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Populate form when property data loads
  useEffect(() => {
    if (property) {
      setValue("propertyName", property.propertyName || "");
      setValue("propertyType", property.propertyType || "Apartment");
      setValue("propertyStatus", property.propertyStatus || "For Sale");
      setValue("price", property.price || "");
      setValue("thumbnail", property.thumbnail || "");
      setValue("details.totalRoom", property.details?.totalRoom || "");
      setValue("details.beds", property.details?.beds || "");
      setValue("details.baths", property.details?.baths || "");
      setValue("details.belcony", property.details?.belcony || "");
      setValue("details.area", property.details?.area || "");
      setValue("details.buildYear", property.details?.buildYear || "");
      setValue("amenities", property.amenities || []);
      setValue("images", property.images || []);
      setValue("videos", property.videos || []);
      setValue("location.address", property.location?.address || "");
      setValue("location.area", property.location?.area || "");
      setValue("location.city", property.location?.city || "");
      setValue("location.country", property.location?.country || "");
      setValue("location.zip_code", property.location?.zip_code || "");
      setValue("description", property.description || "");
      setValue("agent.phone", property.agent?.phone || "");

      setValue("agent.name", property.agent?.name || "");
      setValue("agent.email", property.agent?.email || "");
      setValue("agent.photoUrl", property.agent?.photoUrl || "");

      setValue("agencyId", property.agencyId || "");
      setValue("agencyEmail", property.agencyEmail || "");
      setValue("agency.agencyName", property.agency?.agencyName || "");
      setValue("agency.location", property.agency?.location || "");
      setValue("agency.title", property.agency?.title || "");
      setValue("agency.logoUrl", property.agency?.logoUrl || "");
      setValue("isFeatured", property.isFeatured || false);

      // Set image previews
      if (property.images && property.images.length > 0) {
        setImagePreviews(property.images);
      }
    }
  }, [property, setValue, user]);

  const onSubmit = async (data) => {
    if (!data.propertyName || !data.price) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (!data.images || data.images.length === 0) {
      toast.error("Please upload at least one property image!");
      return;
    }

    setLoading(true);

    const updatedPropertyData = {
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
        name: data.agent.name || "",
        phone: data.agent.phone || "",
        email: data.agent.email || "",
        photoUrl: data.agent.photoUrl || "",
      },
      agencyId: data.agencyId || "",
      agencyEmail: data.agencyEmail || "",
      agency: data.agency || {},
      isFeatured: data.isFeatured || false,
      isAdminAproved: admin ? property?.isAdminAproved : "pending",
    };

    try {
      const response = await axiosSecure.patch(
        `/allProperties/${id}`,
        updatedPropertyData
      );

      if (response.data) {
        toast.success("Property updated successfully!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update property");
      setLoading(false);
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

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);

      const urls = await Promise.all(files.map((file) => uploadImage(file)));

      setValue("images", urls);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl my-6 mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-orange-600">Update Property</h2>

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
              readOnly
              placeholder="Agent Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              readOnly
              {...register("agent.email")}
              placeholder="Agent Email"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              {...register("agent.phone")}
              placeholder="Agent Phone"
              className="input input-bordered w-full"
            />
            <input
              readOnly
              {...register("agent.photoUrl")}
              placeholder="Agent Photo URL"
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
              placeholder="Agency Email"
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
            ? "Updating Property..."
            : uploading
            ? "Uploading Images..."
            : "Update Property"}
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

export default UpdatePropertyDetails;
