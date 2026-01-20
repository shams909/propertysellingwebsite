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
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl my-10 flex flex-col lg:flex-row gap-8 shadow-2xl relative overflow-hidden group">

        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

        {/* Left Section */}
        <div className="flex-1 relative z-10">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{propertyName}</h1>
            <p className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 font-semibold rounded-full py-1 text-sm uppercase tracking-wider backdrop-blur-md">
              {propertyStatus}
            </p>
          </div>
          <p className="uppercase tracking-[4px] font-semibold text-lg mb-6 mt-4 text-gray-400 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-orange-500"></span> {location.country}
          </p>

          {/* Property Icons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <InfoBadge icon={<IoBedOutline />} label={`${details.beds} Bedroom`} />
            <InfoBadge icon={<PiBathtubLight />} label={`${details.baths} Bathroom`} />
            <InfoBadge icon={<MdOutlineBedroomParent />} label={`${details.totalRoom} Room`} />
            <InfoBadge icon={<GiThermometerScale />} label={`${details.area} Sq ft`} />
            <InfoBadge icon={<PiGarageLight />} label="1 Garage" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="btn btn-sm bg-orange-500 text-white border-none rounded-full hover:bg-orange-600 flex items-center gap-2 shadow-lg shadow-orange-500/20">
              <FaRegShareFromSquare /> Share
            </button>
            <button className="btn btn-sm bg-white/10 text-white border-white/10 rounded-full hover:bg-white/20 flex items-center gap-2 backdrop-blur-md">
              <CiHeart /> Save
            </button>
            <button className="btn btn-sm bg-white/10 text-white border-white/10 rounded-full hover:bg-white/20 flex items-center gap-2 backdrop-blur-md">
              <BsPrinter /> Print
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 md:flex-none md:w-[350px] lg:text-right relative z-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
          {/* Rating */}
          <div className="rating justify-start lg:justify-end mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className={`mask mask-star-2 ${star <= 3 ? 'bg-orange-400' : 'bg-gray-600'}`} aria-label={`${star} star`}></div>
            ))}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 text-left lg:text-right flex flex-col lg:items-end">
            <span className="text-orange-500">${price.toLocaleString()}</span>
            <span className="text-gray-500 text-sm font-normal uppercase tracking-wider mt-1">Starting Price</span>
          </h2>

          {/* Badges */}
          <div className="flex flex-wrap justify-start lg:justify-end gap-2 mt-6">
            {amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="badge badge-outline border-white/20 text-gray-300 py-3 px-4">
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoBadge = ({ icon, label }) => (
  <div className="flex items-center gap-2 font-medium text-gray-300 bg-white/5 px-4 py-2 rounded-xl border border-white/5 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300">
    <span className="text-orange-400 text-lg">{icon}</span>
    <span className="text-sm">{label}</span>
  </div>
);

export default PropertyInfo;
