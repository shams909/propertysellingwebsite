import React from "react";
import { FaFacebook, FaHeart, FaInstagram, FaLinkedin } from "react-icons/fa";

const OurAgentCard = ({ agent }) => {
  const { name, email, image, description } = agent;

  return (
    <div className="relative group w-full max-w-xs rounded-lg overflow-hidden shadow-lg mx-auto">
      {/* Agent Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover rounded-lg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center px-4 backdrop-blur-sm">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 w-full p-6 rounded-2xl text-center space-y-3 shadow-2xl">
          <div className="flex justify-center gap-3 items-center">
            <h1 className="text-xl font-bold text-white">{name}</h1>
            <div className="bg-white/10 text-orange-500 rounded-full p-2 border border-white/5">
              <FaHeart size={14} />
            </div>
          </div>

          <p className="text-gray-300 text-sm font-medium leading-relaxed">{description}</p>
          <p className="text-gray-400 text-xs">{email}</p>

          <div className="flex justify-center gap-4 mt-4">
            <div className="bg-white/5 hover:bg-orange-500 text-white p-2.5 rounded-full transition-all cursor-pointer border border-white/10">
              <FaFacebook size={14} />
            </div>
            <div className="bg-white/5 hover:bg-orange-500 text-white p-2.5 rounded-full transition-all cursor-pointer border border-white/10">
              <FaInstagram size={14} />
            </div>
            <div className="bg-white/5 hover:bg-orange-500 text-white p-2.5 rounded-full transition-all cursor-pointer border border-white/10">
              <FaLinkedin size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAgentCard;
