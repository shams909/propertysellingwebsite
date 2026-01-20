import React from "react";
import SinglePropertyCard from "../../../all property/all property components/single property card/SinglePropertyCard";
import usePropertyByAgencyId from "../../../../hooks/usePropertyByAgencyId";

const AgencyPropertyListing = ({ agencyId }) => {
  const { data: properties, isLoading, error } = usePropertyByAgencyId(agencyId);
    

  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center text-red-500">
        Error loading properties. Please try again.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div>
        <div>
          <h1 className="font-bold text-3xl">Property Listing</h1>
          <p className="text-gray-500">
            Showing <span className="text-orange-500">
              {properties?.length || 0}
            </span>{" "}
            {properties?.length === 1 ? "Property" : "Properties"}
          </p>
        </div>
      </div>
      <div className="divider mt-5"></div>
      {properties && properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {properties.map((property) => (
            <SinglePropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No properties found for this agency.</p>
        </div>
      )}
    </div>
  );
};

export default AgencyPropertyListing;
