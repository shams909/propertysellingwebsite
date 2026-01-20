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
      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center px-4">
        <div className="bg-white w-full p-6 rounded-lg text-center space-y-3">
          <div className="flex justify-center gap-3">
            <h1 className="text-lg font-bold text-red-500">{name}</h1>
            <div className="bg-[#FEF0F1] text-red-500 rounded-full p-2">
              <FaHeart size={16} />
            </div>
          </div>

          <p className="text-gray-700 text-sm font-semibold">{description}</p>
          <p className="text-gray-500 text-sm">{email}</p>

          <div className="flex justify-center gap-4 mt-3">
            <div className="bg-[#FEF0F1] text-red-500 p-2 rounded-full">
              <FaFacebook />
            </div>
            <div className="bg-[#FEF0F1] text-red-500 p-2 rounded-full">
              <FaInstagram />
            </div>
            <div className="bg-[#FEF0F1] text-red-500 p-2 rounded-full">
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAgentCard;
