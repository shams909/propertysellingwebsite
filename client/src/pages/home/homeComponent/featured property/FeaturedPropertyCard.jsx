import React from "react";
import bed from "../../../../assets/bed.png";
import bath from "../../../../assets/bath.png";
import { Link } from "react-router-dom";
import { MdOutlineReadMore } from "react-icons/md";

const FeaturedPropertyCard = ({item}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between gap-7 bg-white px-4 lg:px-0">

      {/* Image Section */}
      <div className="relative w-full sm:w-1/2">
        <img
          src={item.thumbnail}
          alt="property"
          className="rounded-md w-full h-full object-cover"
        />

        {/* Featured Badge */}
        <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-md shadow-md text-sm sm:text-base font-semibold">
          Featured Property
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full sm:w-1/2 px-4 flex flex-col justify-center">
        {/* Title + Location */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700 leading-tight">
          {item.propertyName}
          </h1>
          <p className="text-sm sm:text-md text-gray-400">
          {item.location.address}
          </p>

          <p className="text-sm sm:text-lg text-gray-600 my-4 sm:my-5">
            {item.description.slice(0,400)}
          </p>
        </div>

        <hr className="h-px bg-gray-300 border-0" />

        {/* Feature Icons */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 my-6 sm:my-8">
          <div className="flex items-center gap-2 text-sm sm:text-lg">
            <img
              className="bg-[#FFEEEC] px-3 py-2 rounded-md w-10 h-10"
              src={bed}
              alt="bed"
            />
            <span>Bedroom</span>
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-lg">
            <img
              className="bg-[#FFEEEC] px-3 py-2 rounded-md w-10 h-10"
              src={bath}
              alt="bath"
            />
            <span>Bathroom</span>
          </div>

          <div className="bg-[#FFEEEC] px-3 py-2 rounded-md text-sm sm:text-lg w-fit font-semibold text-orange-500">
            {item.details.area} sq ft
          </div>
        </div>

        <hr className="h-px bg-gray-300 border-0" />

        {/* Price + Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-start sm:items-center justify-between mt-6">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-[#586167]">
              ${item.price}.00
            </p>
            <p className="text-sm sm:text-md font-semibold mt-2 text-[#8A9094]">
              Home for sale
            </p>
          </div>

          <Link
            to={`all-property/${item._id}`}
            className="
              flex items-center space-x-1 
              px-4 py-2 
              bg-orange-600 text-white 
              font-medium rounded-lg 
              hover:bg-white hover:text-orange-600  
              active:scale-95 
              transition-all duration-200 
              shadow-md hover:shadow-lg 
              text-sm sm:text-base
            "
          >
            <MdOutlineReadMore />
            <span>Submit Property</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
