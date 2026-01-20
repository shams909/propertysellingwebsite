import React from "react";
import usePropertyById from "../../hooks/usePropertyById";
import Loading from "../loading/Loading";
import { FiMapPin, FiMaximize, FiDollarSign, FiHome, FiCheckCircle } from "react-icons/fi";

const PropertyDetailsModal = ({ id }) => {
  const { data: property, isLoading } = usePropertyById(id);

  if (isLoading) return <div className="h-64 flex items-center justify-center"><Loading /></div>;

  if (!property) return <div className="text-white text-center p-10">Property not available</div>;

  const {
    propertyName,
    propertyImage,
    propertyLocation,
    description,
    agentName,
    agentImage,
    price,
    status,
    location
  } = property;

  return (
    <div className="flex flex-col md:flex-row bg-black/90 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-5xl w-full mx-auto md:max-h-[85vh]">

      {/* Left Side: Hero Image (Sticky on Desktop) */}
      <div className="w-full md:w-1/2 relative h-64 md:h-auto">
        <img
          src={propertyImage}
          alt={propertyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${status === 'verified' ? 'bg-emerald-500/90 text-white' : 'bg-orange-500/90 text-white'
            } shadow-lg backdrop-blur-md`}>
            {status || 'For Sale'}
          </span>
        </div>

        {/* Price Tag Overlay - Mobile Only */}
        <div className="absolute bottom-4 left-4 md:hidden">
          <span className="text-2xl font-bold text-white drop-shadow-md">
            ${price}
          </span>
        </div>
      </div>

      {/* Right Side: Details (Scrollable) */}
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col text-white max-h-[60vh] md:max-h-full overflow-y-auto custom-scrollbar">

        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
            {propertyName}
          </h2>
          <div className="flex items-center text-gray-400 gap-2 text-sm">
            <FiMapPin className="text-orange-500" />
            <span>{location?.country || propertyLocation || "Location Unavailable"}</span>
          </div>
        </div>

        {/* Price Section - Desktop */}
        <div className="hidden md:flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
          <div className="p-3 bg-white/5 rounded-full">
            <FiDollarSign className="text-emerald-400 text-xl" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Price</p>
            <p className="text-3xl font-bold">${price?.toLocaleString()}</p>
          </div>
        </div>

        {/* Agent Info Card */}
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl mb-8 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring-2 ring-orange-500/50">
              <img src={agentImage} alt={agentName} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">Listed by</p>
            <p className="font-medium text-lg">{agentName}</p>
          </div>
          <button className="ml-auto btn btn-sm btn-circle btn-ghost text-orange-400">
            <FiCheckCircle size={20} />
          </button>
        </div>

        {/* Description */}
        <div className="mb-8 space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiHome className="text-orange-400" /> Description
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 flex gap-3">
          <button className="flex-1 btn bg-white text-black hover:bg-gray-200 border-none rounded-xl h-12 text-base shadow-lg shadow-white/10">
            Make an Offer
          </button>
          <button className="btn btn-square btn-outline border-white/20 text-white hover:bg-white/10 hover:border-white rounded-xl h-12 w-12">
            <FiMaximize size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsModal;
