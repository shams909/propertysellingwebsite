import React from "react";
import usePropertyById from "../../hooks/usePropertyById";
import useAgencyById from "../../hooks/useAgencyById";

import {
  FaRulerCombined,
  FaDollarSign,
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaDoorOpen,
  FaImages,
} from "react-icons/fa";
import { MdBalcony } from "react-icons/md";

const PropertyDetailsModal = ({ id }) => {
  const { data: property } = usePropertyById(id);

  const { data: agencyData } = useAgencyById(property?.agencyId, {
    enabled: !!property?.agencyId,
  });

  if (!property) return null;

  const {
    propertyName,
    propertyType,
    propertyStatus,
    price,
    thumbnail,
    details = {},
    amenities = [],
    images = [],
    description,
    agent = {},
    isAdminAproved,
    location = {},
  } = property;

  const phone =
    typeof agent?.phone === "object"
      ? agent.phone?.$numberLong
      : agent?.phone;

  return (
    <div className="w-full max-w-7xl mx-auto bg-black/95 backdrop-blur-2xl text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row h-[90vh] lg:h-[85vh]">

      {/* 🖼️ Left Side: Hero Image & Gallery Preview */}
      <div className="relative w-full lg:w-[55%] h-64 lg:h-full group overflow-hidden">
        <img
          src={thumbnail}
          alt={propertyName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
          <div className="flex flex-wrap gap-2">
            <span className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              {propertyType}
            </span>
            <span className="bg-orange-600/90 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg">
              {propertyStatus}
            </span>
          </div>

          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/10 shadow-lg ${isAdminAproved === "approved"
              ? "bg-green-500/80"
              : isAdminAproved === "pending"
                ? "bg-yellow-500/80"
                : "bg-red-500/80"
              }`}
          >
            {isAdminAproved}
          </span>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-md">
            {propertyName}
          </h2>
          <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
            <FaMapMarkerAlt className="text-orange-500" />
            <span className="truncate">
              {location.address}, {location.area}, {location.city}
            </span>
          </div>
        </div>
      </div>

      {/* 📜 Right Side: Scrollable Details */}
      <div className="w-full lg:w-[45%] h-full flex flex-col bg-[#0a0a0a]">

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">

          {/* Price Tag */}
          <div className="flex justify-between items-center bg-white/5 border border-white/10 p-5 rounded-2xl">
            <div>
              <p className="text-gray-400 text-sm mb-1">Price</p>
              <h3 className="text-3xl font-bold text-white flex items-center gap-1">
                <FaDollarSign className="text-orange-500 text-2xl" />
                {price?.toLocaleString()}
              </h3>
            </div>
            <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition-all shadow-lg shadow-orange-600/20">
              Make Offer
            </button>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Info icon={<FaBed />} label="Bedrooms" value={details.beds} />
            <Info icon={<FaBath />} label="Bathrooms" value={details.baths} />
            <Info icon={<FaRulerCombined />} label="Area" value={details.area ? `${details.area} sqft` : "N/A"} />
            <Info icon={<MdBalcony />} label="Balcony" value={details.belcony} />
            <Info icon={<FaDoorOpen />} label="Rooms" value={details.totalRoom} />
            <Info icon={<FaCalendarAlt />} label="Year" value={details.buildYear} />
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-l-4 border-orange-500 pl-3">Overview</h3>
            <p className="text-gray-400 leading-relaxed text-sm text-justify">
              {description}
            </p>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-orange-500 pl-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {amenities.map((a, i) => (
                  <span
                    key={i}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-4 py-2 rounded-xl text-xs font-medium transition-colors"
                  >
                    ✨ {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mini Gallery */}
          {images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-orange-500 pl-3">Gallery</h3>
              <div className="grid grid-cols-3 gap-2">
                {images.slice(0, 6).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Gallery ${i}`}
                    className="h-24 w-full object-cover rounded-xl border border-white/10 hover:opacity-80 cursor-pointer transition"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Agent & Agency Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            {/* Agent */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <img
                src={agent.photoUrl}
                alt={agent.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
              />
              <div className="overflow-hidden">
                <p className="font-bold text-white text-sm truncate">{agent.name}</p>
                <p className="text-xs text-orange-400">Listing Agent</p>
              </div>
            </div>

            {/* Agency */}
            {agencyData && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                <img
                  src={agencyData.logoUrl}
                  alt={agencyData.agencyName}
                  className="w-12 h-12 rounded-lg object-cover bg-white"
                />
                <div className="overflow-hidden">
                  <p className="font-bold text-white text-sm truncate">{agencyData.agencyName}</p>
                  <p className="text-xs text-gray-400 truncate">{agencyData.title}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions (Sticky) */}
        <div className="p-4 bg-[#0a0a0a] border-t border-white/10 flex gap-3">
          <button className="flex-1 bg-white hover:bg-gray-200 text-black font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
            <FaPhone className="text-sm" /> Call Agent
          </button>
          <button className="flex-1 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
            <FaEnvelope className="text-sm" /> Email
          </button>
        </div>

      </div>
    </div>
  );
};

// Reusable Info Item
const Info = ({ icon, label, value }) => (
  <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors">
    <span className="text-orange-500 text-lg">{icon}</span>
    <div>
      <p className="text-[10px] text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="font-bold text-sm text-gray-200">{value || "N/A"}</p>
    </div>
  </div>
);

export default PropertyDetailsModal;
