import React from "react";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div className="mt-8 p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl">
      <h1 className="text-white font-bold text-xl">Contact Info</h1>
      <div className="bg-orange-500 w-[30px] h-1 rounded-full mt-2"></div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors group cursor-pointer">
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-orange-500/20 transition-colors">
            <CiLocationOn className="text-xl" />
          </div>
          <span className="text-sm"> A-32, Albany, Newyork.</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors group cursor-pointer">
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-orange-500/20 transition-colors">
            <CiPhone className="text-xl" />
          </div>
          <span className="text-sm"> (+066) 518 - 457 - 5181</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors group cursor-pointer">
          <div className="p-2 bg-white/5 rounded-full group-hover:bg-orange-500/20 transition-colors">
            <MdOutlineEmail className="text-xl" />
          </div>
          <span className="text-sm"> Contact@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
