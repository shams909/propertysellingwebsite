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
        <div className="w-full py-8">
            <div className="max-w-6xl mx-auto px-4 space-y-6">
                {/* Section Header */}
                <div className="mb-6 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Location & <span className="text-orange-500">Property Map</span>
                    </h2>
                    <p className="text-gray-400">
                        Explore the property location on the map.
                    </p>
                </div>

                {/* Google Map */}
                <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                    <iframe
                        src={mapSrc}
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full border-0 rounded-2xl filter grayscale-50 hover:grayscale-0 transition-all duration-700"
                        title="Property Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default LocationTab;
