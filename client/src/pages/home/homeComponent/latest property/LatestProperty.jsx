import React from "react";
import Title from "../../../../component/title/Title";
import LatestPropertyCard from "./LatestPropertyCard";
import useProperties from "../../../../hooks/useProperties";

const LatestProperty = () => {
  const { data: latestProperty } = useProperties({});
  const finalData = latestProperty?.slice(0, 3) || [];

  return (
    <div className="w-full bg-[#050505] py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">Properties</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our newest listings, curated just for you with the finest amenities and prime locations.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalData.map((item) => {
            return <LatestPropertyCard key={item._id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestProperty;
