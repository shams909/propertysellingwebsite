import React from "react";
import bed from "../../../../assets/bed.png";
import bath from "../../../../assets/bath.png";
import { Link } from "react-router-dom";
import { MdOutlineReadMore } from "react-icons/md";
import { FaBed, FaBath } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";

const FeaturedPropertyCard = ({ item }) => {
  return (
    <div className="w-full flex flex-col items-center gap-8 px-4 lg:px-0">
      <div className="bg-white/5 border border-white/5 backdrop-blur-3xl rounded-3xl p-6 w-full max-w-5xl flex flex-col md:flex-row gap-8 shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 group">

        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden rounded-2xl">
          <img
            src={item.thumbnail}
            alt="property"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

          {/* Featured Badge */}
          <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full shadow-lg text-xs font-bold uppercase tracking-wider border border-white/10">
            Featured
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">

          {/* Headers */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 leading-tight group-hover:text-orange-400 transition-colors">
              {item.propertyName}
            </h1>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {item.location.address}
            </p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4">
            {item.description.slice(0, 150)}...
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-3 my-2">
            <FeatureBox icon={<FaBed />} label={`${item.details.beds} Beds`} />
            <FeatureBox icon={<FaBath />} label={`${item.details.baths} Baths`} />
            <FeatureBox icon={<TbRulerMeasure />} label={`${item.details.area} sqft`} />
          </div>

          <div className="flex items-center justify-between mt-2 pt-6 border-t border-white/5">
            <div>
              <p className="text-2xl font-bold text-white flex items-center gap-1">
                <span className="text-orange-500">$</span>{item.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Start Price</p>
            </div>

            <Link
              to={`all-property/${item._id}`}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
            >
              <span>Details</span>
              <MdOutlineReadMore className="text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureBox = ({ icon, label }) => (
  <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center gap-1 group/box hover:bg-white/10 transition-colors">
    <span className="text-orange-400 text-lg group-hover/box:text-white transition-colors">{icon}</span>
    <span className="text-gray-300 text-xs font-semibold">{label}</span>
  </div>
);

export default FeaturedPropertyCard;
