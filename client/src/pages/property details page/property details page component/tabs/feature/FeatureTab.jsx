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
      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 
                    hover:shadow-lg hover:border-orange-200 transition duration-300 transform hover:-translate-y-0.5"
    >
      {/* Icon is used here — so NO warning */}
      <div className="w-10 h-10 flex items-center justify-center bg-orange-50 text-orange-600 rounded-full">
        {Icon && <Icon className="text-xl" />}
      </div>

      <p className="text-sm font-semibold text-gray-700">{name}</p>
    </div>
  );
};

const FeatureTab = () => {
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id);

  const { amenities } = property || [];

  // Map amenities to icons
  const amenitiesWithIcons = amenities.map((name) => ({
    name,
    Icon: amenitiesIconMap[name] || null, // fallback if icon not found
  }));

  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-xl text-orange-500"></span>
        <p className="mt-4 text-sm text-gray-500 tracking-wide">
          loading data...
        </p>
      </div>
    );
  return (
    <section className="py-12 md:bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className=" mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Amenities &{" "}
            <span className="text-orange-600">Property Features</span>
          </h2>
          <p className="text-gray-600">
            Everything you need for comfort and security.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenitiesWithIcons.map((feature) => (
            <FeatureItem
              key={feature.name}
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
