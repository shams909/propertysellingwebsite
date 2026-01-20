import React from "react";
import { CiLocationOn } from "react-icons/ci";
import {
  FaHome,
  FaCalendarAlt,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaCar,
  FaMoneyBillWave,
  FaTag,
  FaBuilding,
  FaFilePdf,
  FaImage,
  FaDownload,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import usePropertyById from "../../../../../hooks/usePropertyById";

const AboutTab = () => {
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id);
  const {
    propertyType,
    propertyStatus,
    price,
    details: { beds, baths, area, buildYear },
    description,
  } = property;

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <span className="loading loading-spinner loading-xl text-orange-500"></span>
      </div>
    );

  return (
    <div className="bg-white/5 border border-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
      <div className="space-y-12">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              About & <span className="text-orange-500">Property Details</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Everything you need for comfort and security.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition bg-orange-500/10 px-4 py-2 rounded-lg border border-orange-500/20 mt-4 sm:mt-0"
          >
            <CiLocationOn className="text-xl" />
            View on map
          </a>
        </div>

        {/* KEY FEATURES */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Detail label="Property Type" value={propertyType} icon={<FaHome />} />
              <Detail label="Operating Since" value={buildYear} icon={<FaCalendarAlt />} />
              <Detail label="Property Size" value={`${area} sq ft`} icon={<FaRulerCombined />} />
            </div>

            <div className="space-y-4">
              <Detail label="Bedrooms" value={beds} icon={<FaBed />} />
              <Detail label="Bathrooms" value={baths} icon={<FaBath />} />
              <Detail label="Garage" value="1 Car" icon={<FaCar />} />
            </div>

            <div className="space-y-4">
              <Detail label="Price" value={price} icon={<FaMoneyBillWave />} />
              <Detail label="Status" value={propertyStatus} icon={<FaTag />} />
              <Detail label="Build Year" value={buildYear} icon={<FaBuilding />} />
            </div>
          </div>
        </div>

        {/* ATTACHMENTS */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <h2 className="text-xl font-bold text-white">Attachments</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AttachmentItem
              icon={<FaFilePdf className="text-red-500 text-3xl" />}
              title="Floorplan PDF"
              size="1.2 MB"
              link="#"
            />

            <AttachmentItem
              icon={<FaImage className="text-blue-500 text-3xl" />}
              title="Blueprint Gallery"
              size="High Resolution"
              link="#"
            />

            <AttachmentItem
              icon={<FaFilePdf className="text-green-500 text-3xl" />}
              title="Property Documents"
              size="900 KB"
              link="#"
            />
          </div>
        </div>

        {/* PROPERTY BRIEF */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Description</h2>
          <p className="text-gray-400 leading-relaxed bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 shadow-inner">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------------------- REUSABLE COMPONENTS ---------------------- */

const Detail = ({ label, value, icon }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-orange-500/30 transition-colors group">
    <div className="text-orange-500 text-xl bg-orange-500/10 p-2 rounded-lg group-hover:bg-orange-500/20 transition-colors">{icon}</div>

    <p className="text-sm font-medium text-gray-400 flex-1 flex flex-col">
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="font-bold text-white text-base">
        {value}
      </span>
    </p>
  </div>
);

const AttachmentItem = ({ icon, title, size, link }) => (
  <a
    href={link}
    className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-orange-500/50 hover:bg-white/5 transition group"
  >
    <div className="flex items-center gap-4">
      <div className="bg-white/5 p-2 rounded-lg">{icon}</div>

      <div>
        <h3 className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">{title}</h3>
        <p className="text-xs text-gray-500">{size}</p>
      </div>
    </div>

    <FaDownload className="text-gray-500 group-hover:text-orange-500 transition" />
  </a>
);

export default AboutTab;
