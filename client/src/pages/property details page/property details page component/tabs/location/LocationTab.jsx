import React from "react";
import { useParams } from "react-router-dom";
import usePropertyById from "../../../../../hooks/usePropertyById";

const LocationTab = () => {
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id);
  const propertyAddress = property?.location?.address; // Replace with your property address
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    propertyAddress
  )}&output=embed`;

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
    <div className="w-full py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Location & <span className="text-orange-600">Property Map</span>
          </h2>
          <p className="text-gray-600">
            Explore the property location on the map.
          </p>
        </div>

        {/* Google Map */}
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={mapSrc}
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0 rounded-xl"
            title="Property Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LocationTab;
