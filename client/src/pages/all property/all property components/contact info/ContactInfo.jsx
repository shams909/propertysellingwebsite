import React from "react";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";

const ContactInfo = () => {
  return (
    <div className="mt-6">
      <h1 className="text-gray-600 font-semibold text-xl">Contact Info</h1>
      <div className="bg-orange-500 w-[30px] h-0.5 rounded-full"></div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2  text-gray-600">
          <CiLocationOn />
          <span> A-32, Albany, Newyork.</span>
        </div>
        <div className="flex items-center gap-2  text-gray-600">
          <CiPhone />
          <span> (+066) 518 - 457 - 5181</span>
        </div>
        <div className="flex items-center gap-2  text-gray-600">
          <MdOutlineEmail />
          <span> Contact@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
