import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineBathroom, MdOutlineBed } from "react-icons/md";
import { RiLandscapeAiLine } from "react-icons/ri";
import recent1 from "../../../../assets/recent1.jpg";
import { Link } from "react-router-dom";

const RecentPropertyCard = ({item}) => {
  return (
    <div className="card bg-base-100 w-full shadow-md rounded-lg overflow-hidden group">
      
      {/* Image + Hover Overlay */}
      <figure className="relative">
        <img
          src={item.thumbnail}
          alt="Property"
          className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
        />

        {/* Hover Overlay */}
        <div
          className="
            absolute inset-0 flex items-center justify-center 
            bg-black/40 opacity-0 
            group-hover:opacity-100 transition-all duration-500
          "
        >
          <div className="bg-white w-[85%] md:w-[75%] px-4 py-3 rounded-md">
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              How much my property worth?
            </p>
            <p className="text-sm text-gray-600 font-medium my-2">
              This home provides huge space to live peacefully with your family
            </p>
            <Link to={`all-property/${item._id}`} className="text-base font-semibold text-red-500 flex items-center gap-1 sm:gap-2">
              View Details 
              <IoIosArrowRoundForward className="text-2xl" />
            </Link>
          </div>
        </div>
      </figure>

      {/* Card Details */}
      <div className="card-body px-5 py-10 sm:py-12 space-y-4 relative">
        
        {/* Price Badge */}
        <div className="
          bg-red-500 px-3 py-1 text-lg sm:text-xl font-semibold text-white 
          rounded-md absolute -top-4 left-1/2 -translate-x-1/2
        ">
          ${item.price}.00
        </div>

        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-[#FDEEEC] text-orange-500 rounded-full p-2">
              <IoHomeOutline size={18} />
            </div>
            <p className="text-xs sm:text-sm font-medium">{item.propertyType}</p>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-[#FDEEEC] text-orange-500 rounded-full p-2">
              <RiLandscapeAiLine size={18} />
            </div>
            <p className="text-xs sm:text-sm font-medium">{item.details.area} sq ft</p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-[#FDEEEC] text-orange-500 rounded-full p-2">
              <MdOutlineBed size={18} />
            </div>
            <p className="text-xs sm:text-sm font-medium">{item.details.beds} bedrooms</p>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center gap-2 text-gray-700">
            <div className="bg-[#FDEEEC] text-orange-500 rounded-full p-2">
              <MdOutlineBathroom size={18} />
            </div>
            <p className="text-xs sm:text-sm font-medium">{item.details.baths} bathrooms</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentPropertyCard;
