import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import AgencyPropertyListing from "../agency property listing/AgencyPropertyListing";

const AgencyInfo = ({ agency, agencyId }) => {
  if (!agency) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-8 items-start gap-2">
        {/* ================= Agency Info ================= */}
        <div className="lg:col-span-6">
          <div className="flex flex-col lg:flex-row gap-4 w-full bg-white rounded-lg p-6">
            <img
              className="lg:w-1/2 h-[350px] rounded-lg object-cover"
              src={agency.logoUrl || "https://via.placeholder.com/400x350"}
              alt={agency.agencyName}
            />

            <div className="lg:w-1/2 items-center flex">
              <div className="flex flex-col justify-between gap-6 w-full">
                <div>
                  <h1 className="font-bold text-3xl">{agency.agencyName}</h1>
                  <p className="text-gray-600 text-lg">
                    {agency.title || "Real Estate Agency"}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {agency.location && (
                    <div className="flex text-gray-600 font-semibold items-center gap-1">
                      <div className="bg-gray-100 font-bold p-2 rounded-lg">
                        <IoLocationOutline size={20} />
                      </div>
                      <span>{agency.location}</span>
                    </div>
                  )}

                  {agency.email && (
                    <div className="flex text-gray-600 font-semibold items-center gap-1">
                      <div className="bg-gray-100 font-bold p-2 rounded-lg">
                        <CiMail size={20} />
                      </div>
                      <span>{agency.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-3">
                  <div className="bg-[#FEF0F1] text-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-500 hover:text-white transition">
                    <FaFacebook size={18} />
                  </div>
                  <div className="bg-[#FEF0F1] text-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-500 hover:text-white transition">
                    <FaInstagram size={18} />
                  </div>
                  <div className="bg-[#FEF0F1] text-orange-500 rounded-full p-2 cursor-pointer hover:bg-orange-500 hover:text-white transition">
                    <FaLinkedin size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          {agency.title && (
            <div className="mt-4 bg-white rounded-lg p-6">
              <p className="text-2xl font-semibold mb-3">About the Agency</p>
              <p className="text-gray-600">
                {agency.title}
              </p>
            </div>
          )}

          {/* Agency Properties */}
          <AgencyPropertyListing agencyId={agencyId} />
        </div>

        {/* ================= Desktop Sidebar ================= */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Contact Agency</h2>
            <form className="space-y-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Your Name"
              />

              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Your Email"
              />

              <label className="block text-gray-700">Message</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2"
                rows="4"
                placeholder="Your Message"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white rounded-lg p-2 hover:bg-white hover:text-black border border-orange-500 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyInfo;
