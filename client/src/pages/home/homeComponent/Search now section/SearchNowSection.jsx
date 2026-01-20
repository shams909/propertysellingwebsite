import React from "react";
import searchNowBg from "../../../../assets/searchNowBg.png";
import "./ripple.css";
import { CgPlayButtonO } from "react-icons/cg";

const SearchNowSection = () => {
  return (
    <div
      style={{
        backgroundImage: "url(" + (searchNowBg || "/placeholder.svg") + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[600px] sm:h-[500px] md:h-[550px] flex items-center justify-center px-4 sm:px-6 relative"
    >
      {/* Dark Overlay for Background Image */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      <div className="container mx-auto w-full flex flex-col lg:flex-row items-center lg:justify-between gap-10 lg:gap-0 relative z-10">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl text-center p-8 sm:p-12 md:p-16 flex flex-col items-center gap-4 shadow-2xl relative overflow-hidden group">

            {/* Glow */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />

            {/* Tag */}
            <h1 className="bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1 text-orange-400 font-bold text-sm sm:text-base relative z-10">
              #RealEstate
            </h1>

            {/* Title */}
            <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl leading-snug relative z-10">
              Are you worried <br /> sick about moving out?
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-400 font-medium max-w-[300px] sm:max-w-[380px] relative z-10">
              We know how it feels! Elegant retreat in a quiet Coral Gables setting. This home provides wonderful entertaining spaces with a chef kitchen.
            </p>

            {/* Button */}
            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition text-sm sm:text-base shadow-lg shadow-orange-500/20 relative z-10 font-semibold">
              Search Now
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center">
          {/* Ripple Animation */}
          <span className="absolute w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-orange-500 rounded-full opacity-30 animate-ripple"></span>

          {/* Play Button */}
          <button className="relative bg-orange-500 text-2xl sm:text-3xl text-white w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center shadow-lg">
            <CgPlayButtonO />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchNowSection;
