import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import AgencyPropertyListing from "../agency property listing/AgencyPropertyListing";

const AgencyInfo = ({ agency, agencyId }) => {
  if (!agency) return null;

  return (
    <div className="container mx-auto py-8 px-4 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-8 items-start gap-6">
        {/* ================= Agency Info ================= */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="flex flex-col lg:flex-row gap-6 relative z-10">
              {/* Agency Image */}
              <div className="lg:w-1/2">
                <img
                  className="w-full h-[300px] lg:h-[350px] rounded-2xl object-cover border border-white/10"
                  src={agency.logoUrl || "https://via.placeholder.com/400x350"}
                  alt={agency.agencyName}
                />
              </div>

              {/* Agency Details */}
              <div className="lg:w-1/2 flex items-center">
                <div className="flex flex-col justify-between gap-6 w-full">
                  <div>
                    <h1 className="font-bold text-3xl text-white">{agency.agencyName}</h1>
                    <p className="text-orange-400 text-lg mt-1">
                      {agency.title || "Real Estate Agency"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {agency.location && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md">
                          <IoLocationOutline size={18} className="text-orange-500" />
                        </div>
                        <span>{agency.location}</span>
                      </div>
                    )}

                    {agency.email && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md">
                          <CiMail size={18} className="text-orange-500" />
                        </div>
                        <span>{agency.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Social Icons */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center cursor-pointer hover:bg-blue-500/30 hover:scale-110 transition-all backdrop-blur-md">
                      <FaFacebook size={16} className="text-blue-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center cursor-pointer hover:bg-pink-500/30 hover:scale-110 transition-all backdrop-blur-md">
                      <FaInstagram size={16} className="text-pink-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center cursor-pointer hover:bg-blue-600/30 hover:scale-110 transition-all backdrop-blur-md">
                      <FaLinkedin size={16} className="text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          {agency.title && (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-3">
                About the <span className="text-orange-500">Agency</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {agency.title}
              </p>
            </div>
          )}

          {/* Agency Properties */}
          <AgencyPropertyListing agencyId={agencyId} />
        </div>

        {/* ================= Desktop Sidebar ================= */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-5">
              Contact <span className="text-orange-500">Agency</span>
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-medium mb-1.5">Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm placeholder-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm placeholder-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wide font-medium mb-1.5">Message</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm placeholder-gray-600 focus:border-orange-500/50 focus:outline-none transition-colors resize-none"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all active:scale-[0.98]"
              >
                <BsSend size={14} />
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
