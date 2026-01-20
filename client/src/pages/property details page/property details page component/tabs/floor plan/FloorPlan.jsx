import React from 'react';
import Title from '../../../../../component/title/Title';
import floorplanImg from '../../../../../assets/floorplan.png'; // Replace with your floor plan image path

const FloorPlan = () => {
    return (
        <div className="w-full py-8">
            <div className="max-w-5xl mx-auto px-4 space-y-8">
                <div className="mb-8 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        FloorPlan & <span className="text-orange-500">Property Plan</span>
                    </h2>
                    <p className="text-gray-400">
                        Everything you need for comfort and security.
                    </p>
                </div>

                {/* Floor Plan Image */}
                <div className="relative overflow-hidden rounded-2xl hover:shadow-orange-500/10 hover:shadow-2xl transition-all duration-300 border border-white/10 bg-white/5 p-2">
                    <img
                        src={floorplanImg}
                        alt="Property Floor Plan"
                        className="w-full h-auto object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>
        </div>
    );
};

export default FloorPlan;
