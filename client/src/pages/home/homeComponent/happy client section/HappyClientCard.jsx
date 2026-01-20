import React from "react";
import happyClient from "../../../../assets/happyClient1.jpg";
import { FaHeart } from "react-icons/fa";

const HappyClientCard = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center">
      {/* Left Image */}
      <div className="w-full lg:w-1/2">
        <img
          src={happyClient}
          alt="Happy Client"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-1/2 p-0 lg:p-8 flex items-center">
        <div className="bg-white shadow-lg p-6 lg:p-8 rounded-lg w-full lg:w-[90%]  lg:-ml-22">
          {/* Name + Heart + Rating */}
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-red-500">Tex Ryta</h1>
              <div className="bg-[#FEF0F1] text-red-500 rounded-full p-2 flex items-center justify-center">
                <FaHeart size={18} />
              </div>
            </div>

            <div className="rating flex gap-1 mt-2 md:mt-0">
              <div className="mask mask-star-2 bg-yellow-400"></div>
              <div className="mask mask-star-2 bg-yellow-400"></div>
              <div className="mask mask-star-2 bg-yellow-400"></div>
              <div className="mask mask-star-2 bg-yellow-400"></div>
              <div className="mask mask-star-2 bg-yellow-400"></div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 mt-4">
            <p className="text-gray-600 font-medium leading-relaxed">
              “Elegant retreat in the Coral Gables setting. The atmosphere and
              service are unmatched. I’m so grateful for the wonderful
              experience!”
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur eum architecto molestias quasi illo nulla veniam iste,
              ducimus dolore nisi.
            </p>
            {/* Email */}
            <p className="text-orange-600 font-semibold text-sm mt-2">
              user@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappyClientCard;
