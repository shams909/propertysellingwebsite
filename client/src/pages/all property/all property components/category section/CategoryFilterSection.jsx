import React from "react";
import { HiArrowSmRight } from "react-icons/hi";
import usePropertyTypes from "../../../../hooks/usePropertyTypes";

const CategoryFilterSection = ({ filter, setFilter }) => {
  const { data: category } = usePropertyTypes();

  const handleCategoryClick = (name) => {
    setFilter((prev) => ({ ...prev, propertyType: name }));
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-xl shadow-lg">
      <div className="mb-4">
        <h1 className="text-gray-700 font-semibold text-xl">Category</h1>
        <div className="w-16 h-1 bg-orange-500 rounded-full mt-1"></div>
      </div>

      <div>
        <ul className="flex flex-col ">
          {category?.map((item, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(item)}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                filter.propertyType === item
                  ? "bg-orange-100 text-orange-600 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <HiArrowSmRight className="text-orange-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilterSection;
