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
        <div className="bg-white/5 border border-white/5 backdrop-blur-xl shadow-2xl p-6 lg:p-8 rounded-3xl w-full lg:w-[90%] lg:-ml-22 relative group hover:bg-white/10 transition-colors">

          {/* Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none" />

          {/* Name + Heart + Rating */}
          <div className="flex justify-between items-center flex-wrap relative z-10">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">Tex Ryta</h1>
              <div className="bg-white/10 text-orange-500 rounded-full p-2 flex items-center justify-center border border-white/5">
                <FaHeart size={18} />
              </div>
            </div>

            <div className="rating flex gap-1 mt-2 md:mt-0">
              <div className="mask mask-star-2 bg-orange-400"></div>
              <div className="mask mask-star-2 bg-orange-400"></div>
              <div className="mask mask-star-2 bg-orange-400"></div>
              <div className="mask mask-star-2 bg-orange-400"></div>
              <div className="mask mask-star-2 bg-orange-400"></div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 mt-4 relative z-10">
            <p className="text-gray-300 font-medium leading-relaxed italic">
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
            <p className="text-orange-500 font-semibold text-sm mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              user@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappyClientCard;
