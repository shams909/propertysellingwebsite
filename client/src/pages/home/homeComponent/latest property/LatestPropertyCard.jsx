import React from "react";
import { MdOutlineReadMore } from "react-icons/md";
import { Link } from "react-router-dom";

const LatestPropertyCard = ({item}) => {
  return (
    <div className="w-full">
      <div
        className="
          w-full 
          h-60 
          sm:h-72 
          md:h-80 
          lg:h-72 
          relative 
          rounded-xl 
          overflow-hidden 
          group
        "
        style={{
          backgroundImage:
            `url(${item.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/80 to-transparent"></div>

        {/* Badge */}
        <div className="badge bg-orange-500 text-white font-semibold mt-2 ml-2">
          {item.propertyStatus}
        </div>

        {/* Bottom Sliding Panel */}
        <div
          className="
            absolute 
            w-full 
            -bottom-[60px] 
            group-hover:bottom-0 
            transition-all 
            duration-700
          "
        >
          <div className="flex justify-between px-3 items-center py-3">
            {/* Property Name + Price */}
            <div>
              <h1 className="text-xl sm:text-2xl text-white font-semibold">
               {item.propertyName}
              </h1>
              <p className="text-sm sm:text-lg text-white">
                ${item.price} <span className="text-xs sm:text-sm">/start from</span>
              </p>
            </div>

            {/* Details Button */}
            <Link
              to={`all-property/${item._id}`}
              className="
                flex items-center 
                space-x-1 px-3 sm:px-4 
                py-2 bg-orange-600 
                text-white font-medium 
                rounded-lg 
                hover:bg-white 
                hover:text-orange-600 
                transition-all duration-200 
                shadow-md hover:shadow-lg 
                text-xs sm:text-sm
              "
            >
              <MdOutlineReadMore />
              <span>Details</span>
            </Link>
          </div>

          {/* Bottom Features */}
          <div className="flex w-full text-sm sm:text-base">
            <div className="bg-[#636363] flex-1 p-2 text-white text-center">
              <h1>Beds</h1>
              <p>{item.details.beds}</p>
            </div>
            <div className="bg-[#565656] flex-1 p-2 text-white text-center">
              <h1>Bath</h1>
              <p>{item.details.baths}</p>
            </div>
            <div className="bg-[#494949] flex-1 p-2 text-white text-center">
              <h1>Balcony</h1>
              <p>{item.details.belcony}</p>
            </div>
            <div className="bg-[#3E3D3D] flex-1 p-2 text-white text-center">
              <h1>Area</h1>
              <p>{item.details.area}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPropertyCard;
