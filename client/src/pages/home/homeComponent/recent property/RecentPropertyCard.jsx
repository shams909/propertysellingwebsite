import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineBathroom, MdOutlineBed } from "react-icons/md";
import { RiLandscapeAiLine } from "react-icons/ri";
import recent1 from "../../../../assets/recent1.jpg";
import { Link } from "react-router-dom";

const RecentPropertyCard = ({ item }) => {
  return (
    <div className="group bg-white/5 border border-white/5 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-orange-500/10 transition-all duration-300 h-full">

      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        <img
          src={item.thumbnail}
          alt="Property"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent opacity-60" />

        {/* Price Badge */}
        <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full shadow-lg text-sm font-bold border border-white/10 z-10">
          ${item.price.toLocaleString()}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
          <Link to={`all-property/${item._id}`} className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-black/70 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-orange-500 hover:border-orange-500 hover:text-white shadow-lg">
            View Details <IoIosArrowRoundForward className="text-2xl" />
          </Link>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-6 space-y-6">

        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-orange-400 transition-colors">{item.propertyName}</h3>
            <p className="text-gray-400 text-sm">{item.propertyType}</p>
          </div>
          <div className="bg-white/5 p-2 rounded-lg border border-white/5">
            <IoHomeOutline className="text-orange-500 text-xl" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <MdOutlineBed className="text-orange-400 text-xl mb-1" />
            <span className="text-white font-bold text-sm">{item.details.beds}</span>
            <span className="text-xs text-gray-500">Beds</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-center border-x border-white/5 px-4">
            <MdOutlineBathroom className="text-orange-400 text-xl mb-1" />
            <span className="text-white font-bold text-sm">{item.details.baths}</span>
            <span className="text-xs text-gray-500">Baths</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <RiLandscapeAiLine className="text-orange-400 text-xl mb-1" />
            <span className="text-white font-bold text-sm">{item.details.area}</span>
            <span className="text-xs text-gray-500">Sqft</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentPropertyCard;
