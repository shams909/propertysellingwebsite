import React from "react";
import useProperties from "../../../../hooks/useProperties";
import { Link } from "react-router-dom";

const RecentlyAddedSection = () => {
  const { data: property } = useProperties({});

  return (
    <div className="mt-8">
      <h1 className="text-gray-600 font-semibold text-xl">Recently Added</h1>
      <div className="bg-orange-500 w-[30px] h-0.5 rounded-full"></div>
      <div className="mt-6">
        {property && property.length > 0 ? (
          property.slice(0, 3).map((item) => (
            <Link 
            to={`/all-property/${item._id}`}
              key={item._id}
              className="flex w-full gap-3 justify-between p-2 rounded-xl items-center"
            >
              <img
                className="w-[40%] rounded-lg"
                src={item.thumbnail}
                alt={item.name || "Property"}
              />
              <div className="w-[60%]">
                <h1 className="text-gray-600 font-semibold">{item.propertyType || "Apartment"}</h1>
                <p className="text-orange-500">
                  $ {item.price || "1234.00"}{" "}
                  <sub className="text-gray-600">/month</sub>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No recently added properties.</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAddedSection;
