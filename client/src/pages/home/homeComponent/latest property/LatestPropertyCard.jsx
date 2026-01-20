import React from "react";
import { MdOutlineReadMore } from "react-icons/md";
import { FaBed, FaBath } from "react-icons/fa";
import { MdBalcony } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { Link } from "react-router-dom";

const LatestPropertyCard = ({ item }) => {
  return (
    <div className="group relative w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-orange-500/20">
      {/* 🖼️ Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      </div>

      {/* 🏷️ Status Badge */}
      <div className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-orange-500/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-lg border border-white/10">
        {item.propertyStatus}
      </div>

      {/* 📄 Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">

        {/* Title & Price */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md truncate">
            {item.propertyName}
          </h2>
          <p className="text-orange-400 font-semibold text-lg mb-4 flex items-end gap-1">
            ${item.price.toLocaleString()}
            <span className="text-gray-400 text-xs font-normal pb-1">/ {item.propertyType}</span>
          </p>
        </div>

        {/* ℹ️ Features Grid (Hidden initially, slides up) */}
        <div className="grid grid-cols-4 gap-2 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75">
          <Feature icon={<FaBed />} value={item.details.beds} label="Beds" />
          <Feature icon={<FaBath />} value={item.details.baths} label="Baths" />
          <Feature icon={<MdBalcony />} value={item.details.belcony} label="Balcony" />
          <Feature icon={<TbRulerMeasure />} value={item.details.area} label="Sqft" />
        </div>

        {/* 🔘 Action Button */}
        <Link
          to={`all-property/${item._id}`}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-orange-600 backdrop-blur-md border border-white/10 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:border-orange-500"
        >
          <MdOutlineReadMore className="text-xl" />
          See Details
        </Link>
      </div>
    </div>
  );
};

// Micro-component for features
const Feature = ({ icon, value, label }) => (
  <div className="flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-xl p-2 text-white">
    <span className="text-orange-400 text-sm mb-1">{icon}</span>
    <span className="font-bold text-xs">{value}</span>
    <span className="text-[10px] text-gray-400 uppercase">{label}</span>
  </div>
);

export default LatestPropertyCard;
