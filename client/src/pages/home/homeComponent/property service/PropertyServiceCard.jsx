import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const PropertyServiceCard = ({ image, serviceName, serviceDetails }) => {
  return (
    <div className="relative my-16 mx-4 sm:mx-6 lg:mx-8">
      {/* Icon Image */}
      <img
        className="
          w-16 sm:w-20
          p-4 rounded-md bg-red-400
          absolute -top-8 sm:-top-10
          left-4 sm:left-6 lg:-left-6
        "
        src={image}
        alt=""
      />

      {/* Card */}
      <div className="bg-gray-50 rounded-md p-5 sm:p-6 lg:p-8 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700 mt-8 sm:mt-10">
          {serviceName}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 my-4 sm:my-5 leading-relaxed">
          {serviceDetails}
        </p>

        <button className="text-base sm:text-lg font-semibold text-red-500 flex items-center gap-2">
          View Details
          <IoIosArrowRoundForward className="text-2xl mt-1" />
        </button>
      </div>
    </div>
  );
};

export default PropertyServiceCard;
