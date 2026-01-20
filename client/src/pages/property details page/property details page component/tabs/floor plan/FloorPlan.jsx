import React from 'react';
import Title from '../../../../../component/title/Title';
import floorplanImg from '../../../../../assets/floorplan.png'; // Replace with your floor plan image path

const FloorPlan = () => {
  return (
    <div className="w-full py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
       <div className=" mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            FloorPlan & <span className="text-orange-600">Property Plan</span>
          </h2>
          <p className="text-gray-600">
            Everything you need for comfort and security.
          </p>
        </div>

        {/* Floor Plan Image */}
        <div className="relative overflow-hidden rounded-xl hover:shadow-2xl transition-shadow duration-300">
          <img
            src={floorplanImg}
            alt="Property Floor Plan"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
