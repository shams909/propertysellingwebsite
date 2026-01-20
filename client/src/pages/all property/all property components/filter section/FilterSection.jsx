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
    <div className="mt-3 p-3 bg-white rounded-xl ">
      <h1 className="text-gray-700 font-bold text-2xl mb-3">Advanced Filter</h1>
      <div className="w-16 h-1 bg-orange-500 rounded-full mb-6"></div>

      <form className="flex flex-col gap-6">
        {/* Property Status & Type */}
        <div className="flex flex-col gap-2">
          <select
            onChange={(e) => handleFilterChange("propertyStatus", e.target.value)}
            value={filter.propertyStatus}
            className="input input-bordered w-full"
          >
            <option value="">Property Status</option>
            <option>For Sale</option>
            <option>For Rent</option>
          </select>

          <select
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            value={filter.propertyType}
            className="input input-bordered w-full"
          >
            <option value="">Property Type</option>
            {types?.map((type, index) => (
              <option key={index}>{type}</option>
            ))}
          </select>
        </div>

        {/* Details Section */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-gray-600 font-semibold text-lg mb-3">Details</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Beds"
              value={filter.beds || ""}
              onChange={(e) => handleFilterChange("beds", e.target.value)}
              className="input input-bordered w-1/2"
              min={0}
            />
            <input
              type="number"
              placeholder="Max Rooms"
              value={filter.maxRooms || ""}
              onChange={(e) => handleFilterChange("maxRooms", e.target.value)}
              className="input input-bordered w-1/2"
              min={0}
            />
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Baths"
              value={filter.baths || ""}
              onChange={(e) => handleFilterChange("baths", e.target.value)}
              className="input input-bordered w-1/2"
              min={0}
            />
            <input
              type="number"
              placeholder="Balcony"
              value={filter.belcony || ""}
              onChange={(e) => handleFilterChange("belcony", e.target.value)}
              className="input input-bordered w-1/2"
              min={0}
            />
          </div>
        </div>

        {/* Price Section */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-gray-600 font-semibold text-lg mb-3">Price</h2>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={filter.minPrice || ""}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="input input-bordered w-1/2"
              min={0}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filter.maxPrice || ""}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="input input-bordered w-1/2"
              min={0}
            />
          </div>
        </div>

        {/* Area Section */}
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-gray-600 font-semibold text-lg mb-3">Area (sq ft)</h2>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Area"
              value={filter.minArea || ""}
              onChange={(e) => handleFilterChange("minArea", e.target.value)}
              className="input input-bordered w-1/2"
              min={0}
            />
            <input
              type="number"
              placeholder="Max Area"
              value={filter.maxArea || ""}
              onChange={(e) => handleFilterChange("maxArea", e.target.value)}
              className="input input-bordered w-1/2"
              min={0}
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="border-t border-gray-200 pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="flex w-full btn items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-white hover:text-orange-600 border border-orange-600 transition-all"
          >
            <RiResetLeftFill />
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
