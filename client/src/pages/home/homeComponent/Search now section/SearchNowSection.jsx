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
      className="w-full h-[600px] sm:h-[500px] md:h-[550px] flex items-center justify-center px-4 sm:px-6"
    >
      <div className="container mx-auto w-full flex flex-col lg:flex-row items-center lg:justify-between gap-10 lg:gap-0">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white rounded-lg text-center p-8 sm:p-12 md:p-16 flex flex-col items-center gap-4 shadow-lg">
            
            {/* Tag */}
            <h1 className="bg-[#FEF0F1] rounded-lg px-3 sm:px-4 py-1 text-orange-600 font-bold text-sm sm:text-base">
              #Realstate
            </h1>

            {/* Title */}
            <h1 className="text-gray-700 font-bold text-xl sm:text-2xl md:text-3xl leading-snug">
              Are you worried <br /> sick about moving out?
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-[300px] sm:max-w-[380px]">
              We know how it feels! Elegant retreat in a quiet Coral Gables setting. This home provides wonderful entertaining spaces with a chef kitchen.
            </p>

            {/* Button */}
            <button className="bg-orange-500 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-orange-600 transition text-sm sm:text-base">
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
