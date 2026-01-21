import React from "react";
import { RiResetLeftFill } from "react-icons/ri";
import usePropertyTypes from "../../../../hooks/usePropertyTypes";

const FilterSection = ({ filter, setFilter }) => {
  const { data: types } = usePropertyTypes();

  const handleReset = () => {
    setFilter({
      propertyStatus: "",
      propertyType: "",
      beds: "",
      maxRooms: "",
      baths: "",
      belcony: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      maxArea: "",
    });
  };

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mt-3 p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-xl">
      <h1 className="text-white font-bold text-2xl mb-3">Advanced Filter</h1>
      <div className="w-16 h-1 bg-orange-500 rounded-full mb-8"></div>

      <form className="flex flex-col gap-6">
        {/* Property Status & Type */}
        <div className="flex flex-col gap-4">
          <select
            onChange={(e) => handleFilterChange("propertyStatus", e.target.value)}
            value={filter.propertyStatus}
            className="select bg-black/20 border-white/10 text-white w-full h-12 rounded-xl focus:outline-none focus:border-orange-500/50"
          >
            <option value="" className="text-black">Property Status</option>
            <option className="text-black">For Sale</option>
            <option className="text-black">For Rent</option>
          </select>

          <select
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            value={filter.propertyType}
            className="select bg-black/20 border-white/10 text-white w-full h-12 rounded-xl focus:outline-none focus:border-orange-500/50"
          >
            <option value="" className="text-black">Property Type</option>
            {types?.map((type, index) => (
              <option key={index} className="text-black">{type}</option>
            ))}
          </select>
        </div>

        {/* Details Section */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="text-gray-300 font-semibold text-lg mb-4">Details</h2>
          <div className="flex gap-3 mb-3">
            <input
              type="number"
              placeholder="Beds"
              value={filter.beds || ""}
              onChange={(e) => handleFilterChange("beds", e.target.value)}
              className="input bg-black/20 border-white/10 text-white w-1/2 h-12 rounded-xl focus:outline-none focus:border-orange-500/50 placeholder-gray-500"
              min={0}
            />
            <input
              type="number"
              placeholder="Max Rooms"
              value={filter.maxRooms || ""}
              onChange={(e) => handleFilterChange("maxRooms", e.target.value)}
              className="input bg-black/20 border-white/10 text-white w-1/2 h-12 rounded-xl focus:outline-none focus:border-orange-500/50 placeholder-gray-500"
              min={0}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Baths"
              value={filter.baths || ""}
              onChange={(e) => handleFilterChange("baths", e.target.value)}
              className="input bg-black/20 border-white/10 text-white w-1/2 h-12 rounded-xl focus:outline-none focus:border-orange-500/50 placeholder-gray-500"
              min={0}
            />
            <input
              type="number"
              placeholder="Balcony"
              value={filter.belcony || ""}
              onChange={(e) => handleFilterChange("belcony", e.target.value)}
              className="input bg-black/20 border-white/10 text-white w-1/2 h-12 rounded-xl focus:outline-none focus:border-orange-500/50 placeholder-gray-500"
              min={0}
            />
          </div>
        </div>

        {/* Price Section */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="text-gray-300 font-semibold text-lg mb-4">Price</h2>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min Price"
              value={filter.minPrice || ""}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="input bg-black/20 border-white/10 text-white w-1/2 h-12 rounded-xl focus:outline-none focus:border-orange-500/50 placeholder-gray-500"
              min={0}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filter.maxPrice || ""}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="input bg-black/20 border-white/10 text-white w-1/2 h-12 rounded-xl focus:outline-none focus:border-orange-500/50 placeholder-gray-500"
              min={0}
            />
          </div>
        </div>

        {/* Area Section */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="text-gray-300 font-semibold text-lg mb-4">Area (sq ft)</h2>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min Area"
              value={filter.minArea || ""}
              onChange={(e) => handleFilterChange("minArea", e.target.value)}
              className="input bg-black/20 border-white/10 text-white w-1/2 h-12 rounded-xl focus:outline-none focus:border-orange-500/50 placeholder-gray-500"
              min={0}
            />
            <input
              type="number"
              placeholder="Max Area"
              value={filter.maxArea || ""}
              onChange={(e) => handleFilterChange("maxArea", e.target.value)}
              className="input bg-black/20 border-white/10 text-white w-1/2 h-12 rounded-xl focus:outline-none focus:border-orange-500/50 placeholder-gray-500"
              min={0}
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="border-t border-white/10 pt-6 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="flex w-full btn items-center justify-center gap-2 px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-full font-bold border border-orange-500/30 transition-all backdrop-blur-md"
          >
            <RiResetLeftFill size={18} />
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
