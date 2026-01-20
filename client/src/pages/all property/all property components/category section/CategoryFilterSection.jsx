import React from "react";
import { HiArrowSmRight } from "react-icons/hi";
import usePropertyTypes from "../../../../hooks/usePropertyTypes";

const CategoryFilterSection = ({ filter, setFilter }) => {
  const { data: category } = usePropertyTypes();

  const handleCategoryClick = (name) => {
    setFilter((prev) => ({ ...prev, propertyType: name }));
  };

  return (
    <div className="mt-8 p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl">
      <div className="mb-6">
        <h1 className="text-white font-bold text-xl">Category</h1>
        <div className="w-16 h-1 bg-orange-500 rounded-full mt-2"></div>
      </div>

      <div>
        <ul className="flex flex-col gap-2">
          {category?.map((item, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(item)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${filter.propertyType === item
                  ? "bg-orange-500/20 text-orange-400 font-bold border border-orange-500/20"
                  : "hover:bg-white/5 text-gray-400 hover:text-white border border-transparent hover:border-white/5"
                }`}
            >
              <HiArrowSmRight className={`${filter.propertyType === item ? "text-orange-400" : "text-gray-500 group-hover:text-white"}`} />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryFilterSection;
