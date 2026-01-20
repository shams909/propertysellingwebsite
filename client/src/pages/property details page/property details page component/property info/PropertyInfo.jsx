import React from "react";
import { BsPrinter } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { GiThermometerScale } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineBedroomParent } from "react-icons/md";
import { PiBathtubLight, PiGarageLight } from "react-icons/pi";

const PropertyInfo = ({ property }) => {
  const {
    propertyName,
    price,
    propertyStatus,

    details,

    amenities,
    location,
  } = property;
  return (
    <div className="container mx-auto ">
      <div className="bg-white p-6 sm:p-8 rounded-2xl md:shadow-lg my-10 flex flex-col lg:flex-row gap-6 md:gap-10">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-2xl sm:text-4xl font-bold">{propertyName}</h1>
            <p className="bg-red-500 px-4 text-white font-semibold rounded-lg py-1 mt-2 sm:mt-0 w-max">
              {propertyStatus}
            </p>
          </div>
          <p className="uppercase tracking-[4px] font-semibold text-lg mb-4 mt-4 text-gray-600">
            {location.country}
          </p>

          {/* Property Icons */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-1 font-medium text-gray-600 hover:text-orange-500 transition-all duration-300">
              <IoBedOutline />
              <span>{details.beds} Bedroom</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-600 hover:text-orange-500 transition-all duration-300">
              <PiBathtubLight />
              <span>{details.baths} Bathroom</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-600 hover:text-orange-500 transition-all duration-300">
              <MdOutlineBedroomParent />
              <span>{details.totalRoom} Room</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-600 hover:text-orange-500 transition-all duration-300">
              <GiThermometerScale />
              <span>{details.area} Sq ft</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-gray-600 hover:text-orange-500 transition-all duration-300">
              <PiGarageLight />
              <span>1 Garage</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="btn btn-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 flex items-center gap-2 shadow-md">
              <FaRegShareFromSquare /> Share
            </button>
            <button className="btn btn-sm bg-gray-200 text-black rounded-full hover:bg-gray-300 flex items-center gap-2 shadow-md">
              <CiHeart /> Save
            </button>
            <button className="btn btn-sm bg-gray-200 text-black rounded-full hover:bg-gray-300 flex items-center gap-2 shadow-md">
              <BsPrinter /> Print
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 md:flex-none md:w-[300px] lg:text-right">
          {/* Rating */}
          <div className="rating ">
            <div
              className="mask mask-star-2 bg-yellow-500"
              aria-label="1 star"
            ></div>
            <div
              className="mask mask-star-2 bg-yellow-500"
              aria-label="2 star"
            ></div>
            <div
              className="mask mask-star-2 bg-yellow-500"
              aria-label="3 star"
              aria-current="true"
            ></div>
            <div
              className="mask mask-star-2 bg-yellow-500"
              aria-label="4 star"
            ></div>
            <div
              className="mask mask-star-2 bg-yellow-500"
              aria-label="5 star"
            ></div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mt-2 text-left lg:text-right">
            $ {price}{" "}
            <span className="text-gray-600 text-sm sm:text-lg font-semibold">
              /start from
            </span>
          </h2>

          {/* Badges */}
          <div className="flex flex-wrap justify-start lg:justify-end gap-2 mt-4">
            <div className=" badge badge-neutral badge-dash badge-outline badge-sm border-orange-500 text-orange-500">
              {amenities[0]}
            </div>
            <div className="badge badge-neutral badge-dash badge-outline badge-sm border-orange-500 text-orange-500">
              {amenities[1]}
            </div>
            {amenities[2] && (
              <div className="badge badge-neutral badge-dash badge-outline badge-sm border-orange-500 text-orange-500">
                {amenities[2]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
