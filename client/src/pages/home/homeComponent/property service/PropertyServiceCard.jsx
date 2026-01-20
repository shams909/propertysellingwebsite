import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const PropertyServiceCard = ({ image, serviceName, serviceDetails }) => {
  return (
    <div className="relative group mx-2 my-8 h-full">
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-linear-to-r from-orange-600 to-orange-400 rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

      <div className="relative bg-white/5 border border-white/5 backdrop-blur-xl rounded-3xl p-8 h-[320px] shadow-2xl flex flex-col items-center text-center transition-all duration-300">

        {/* Floating Icon Container */}
        <div className="w-20 h-20 bg-[#0a0a0a] rounded-2xl border border-white/10 flex items-center justify-center -mt-16 mb-6 shadow-xl shadow-black/50 group-hover:border-orange-500/50 group-hover:shadow-orange-500/20 transition-all duration-300 relative z-10">
          <img
            className="w-10 h-10 object-contain brightness-0 invert group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] transition-all duration-300"
            src={image}
            alt={serviceName}
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
          {serviceName}
        </h1>

        <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3 text-sm">
          {serviceDetails}
        </p>

        <button className="mt-auto text-orange-500 font-bold flex items-center gap-2 group-hover:gap-3 transition-all text-sm uppercase tracking-wider bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20 hover:bg-orange-500 hover:text-white">
          View Details
          <IoIosArrowRoundForward className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default PropertyServiceCard;
