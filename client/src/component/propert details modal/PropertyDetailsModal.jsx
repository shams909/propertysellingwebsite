import React from "react";
import usePropertyById from "../../hooks/usePropertyById";
import useAgencyById from "../../hooks/useAgencyById";

import {
  FaRulerCombined,
  FaDollarSign,
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDoorOpen,
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

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img
          src={thumbnail}
          alt={propertyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
            {propertyType}
          </span>
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {propertyStatus}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold text-white ${isAdminAproved === "approved"
                ? "bg-green-500"
                : isAdminAproved === "pending"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
          >
            {isAdminAproved}
          </span>
        </div>

        {/* Property Name & Location */}
        <div className="absolute bottom-3 left-3 right-3">
          <h2 className="text-xl font-bold text-white mb-1 line-clamp-1">{propertyName}</h2>
          <p className="text-gray-300 text-xs flex items-center gap-1">
            <FaMapMarkerAlt className="text-orange-400" />
            {location.city}, {location.country}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
        <div>
          <p className="text-gray-500 text-xs mb-1">Price</p>
          <h3 className="text-2xl font-bold text-white flex items-center gap-1">
            <FaDollarSign className="text-orange-400" />
            {price?.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        <StatItem icon={<FaBed />} label="Beds" value={details.beds} />
        <StatItem icon={<FaBath />} label="Baths" value={details.baths} />
        <StatItem icon={<FaRulerCombined />} label="Area" value={details.area ? `${details.area}` : "N/A"} />
        <StatItem icon={<MdBalcony />} label="Balcony" value={details.belcony} />
        <StatItem icon={<FaDoorOpen />} label="Rooms" value={details.totalRoom} />
        <StatItem icon={<FaCalendarAlt />} label="Year" value={details.buildYear} />
      </div>

      {/* Description */}
      {description && (
        <div>
          <h3 className="text-sm font-bold text-white mb-2 border-l-2 border-orange-500 pl-2">Overview</h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-4">{description}</p>
        </div>
      )}

      {/* Amenities */}
      {amenities.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-white mb-2 border-l-2 border-orange-500 pl-2">Amenities</h3>
          <div className="flex flex-wrap gap-1.5">
            {amenities.slice(0, 6).map((a, i) => (
              <span
                key={i}
                className="bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-lg text-xs"
              >
                {a}
              </span>
            ))}
            {amenities.length > 6 && (
              <span className="bg-orange-500/20 border border-orange-500/30 text-orange-400 px-2 py-1 rounded-lg text-xs">
                +{amenities.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-white mb-2 border-l-2 border-orange-500 pl-2">Gallery</h3>
          <div className="grid grid-cols-4 gap-1.5">
            {images.slice(0, 4).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                className="h-16 w-full object-cover rounded-lg border border-white/10"
              />
            ))}
          </div>
        </div>
      )}

      {/* Agent & Agency */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
        {agent?.name && (
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-2">
            <img
              src={agent.photoUrl}
              alt={agent.name}
              className="w-10 h-10 rounded-full object-cover border border-orange-500"
            />
            <div className="overflow-hidden">
              <p className="font-bold text-white text-xs truncate">{agent.name}</p>
              <p className="text-[10px] text-orange-400">Agent</p>
            </div>
          </div>
        )}
        {agencyData && (
          <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-2">
            <img
              src={agencyData.logoUrl}
              alt={agencyData.agencyName}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="overflow-hidden">
              <p className="font-bold text-white text-xs truncate">{agencyData.agencyName}</p>
              <p className="text-[10px] text-gray-400">Agency</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Item
const StatItem = ({ icon, label, value }) => (
  <div className="bg-white/5 border border-white/5 p-2.5 rounded-xl text-center">
    <span className="text-orange-400 text-sm block mb-1">{icon}</span>
    <p className="text-[10px] text-gray-500 uppercase">{label}</p>
    <p className="font-bold text-xs text-white">{value || "N/A"}</p>
  </div>
);

export default PropertyDetailsModal;
