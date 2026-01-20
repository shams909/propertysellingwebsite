import React from "react";
import useProperties from "../../../../hooks/useProperties";
import { Link } from "react-router-dom";

const RecentlyAddedSection = () => {
  const { data: property } = useProperties({});

  return (
    <div className="mt-8 p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl">
      <h1 className="text-white font-bold text-xl">Recently Added</h1>
      <div className="bg-orange-500 w-[30px] h-1 rounded-full mt-2"></div>
      <div className="mt-6 flex flex-col gap-4">
        {property && property.length > 0 ? (
          property.slice(0, 3).map((item) => (
            <Link
              to={`/all-property/${item._id}`}
              key={item._id}
              className="flex w-full gap-4 justify-between p-3 rounded-xl items-center hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group"
            >
              <img
                className="w-20 h-20 object-cover rounded-lg"
                src={item.thumbnail}
                alt={item.name || "Property"}
              />
              <div className="flex-1">
                <h1 className="text-gray-200 font-bold text-sm group-hover:text-orange-400 transition-colors line-clamp-1">{item.propertyType || "Apartment"}</h1>
                <h2 className="text-xs text-gray-400 line-clamp-1 mt-1">
                  {typeof item.location === 'object'
                    ? `${item.location.city || ''}, ${item.location.country || ''}`
                    : item.location || "Location"}
                </h2>
                <p className="text-orange-500 font-bold text-sm mt-2">
                  $ {item.price || "1234.00"}{" "}
                  <sub className="text-gray-500 font-normal">/mo</sub>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No recently added properties.</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAddedSection;
