import React from "react";
import {
  FaWifi,
  FaBuilding,
  FaBatteryFull,
  FaTshirt,
  FaShieldAlt,
  FaVideo,
  FaDoorOpen,
  FaStethoscope,
  FaShower,
  FaParking,
} from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { TbAirConditioning } from "react-icons/tb";

import { useParams } from "react-router-dom";
import usePropertyById from "../../../../../hooks/usePropertyById";

// Data mapping the features to their corresponding icons
const amenitiesIconMap = {
  Lift: FaBuilding,
  Parking: FaParking,
  Security: FaShieldAlt,
  Generator: FaBatteryFull,
  "Free Wi-Fi": FaWifi,
  Laundry: FaTshirt,
  CCTV: FaVideo,
  "Air Conditioning": TbAirConditioning,
  Shower: FaShower,
  Doctor: FaStethoscope,
  "Emergency Exit": FaDoorOpen,
  Gym: CgGym,
  // add all other possible amenities
};

const FeatureItem = ({ name, Icon }) => {
  return (
    <div
      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 
                    hover:border-orange-500/50 hover:bg-orange-500/10 transition duration-300 transform hover:-translate-y-1 group"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-[#0a0a0a] border border-white/10 text-orange-500 rounded-lg group-hover:text-white group-hover:bg-orange-500 transition-colors">
        {Icon && <Icon className="text-xl" />}
      </div>

      <p className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{name}</p>
    </div>
  );
};

const FeatureTab = () => {
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id);

  const { amenities } = property || [];

  // Map amenities to icons
  const amenitiesWithIcons = amenities ? amenities.map((name) => ({
    name,
    Icon: amenitiesIconMap[name] || null, // fallback if icon not found
  })) : [];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <span className="loading loading-spinner loading-xl text-orange-500"></span>
      </div>
    );

  return (
    <section className="py-8">
      <div className="container mx-auto max-w-6xl">
        <div className=" mb-10 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">
            Amenities &{" "}
            <span className="text-orange-500">Property Features</span>
          </h2>
          <p className="text-gray-400">
            Everything you need for comfort and security.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenitiesWithIcons.map((feature, index) => (
            <FeatureItem
              key={index}
              name={feature.name}
              Icon={feature.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureTab;
