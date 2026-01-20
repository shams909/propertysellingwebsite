import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const PropertyServiceCard = ({ image, serviceName, serviceDetails }) => {
  return (
    <div className="relative group mx-2 my-8 h-full">
      <div className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-3xl p-8 h-[320px] shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">

        {/* Floating Icon Container */}
        <div className="w-20 h-20 bg-[#050505] rounded-2xl border border-white/10 flex items-center justify-center -mt-16 mb-6 shadow-xl shadow-black/50 group-hover:border-orange-500/30 transition-colors">
          <img
            className="w-10 h-10 object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
            src={image}
            alt={serviceName}
          />
        </div>

        <h1 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
          {serviceName}
        </h1>

        <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
          {serviceDetails}
        </p>

        <button className="mt-auto text-orange-500 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
          View Details
          <IoIosArrowRoundForward className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default PropertyServiceCard;
