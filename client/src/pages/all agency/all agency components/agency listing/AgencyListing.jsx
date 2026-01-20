import React from "react";
import SingleAgencyCard from "../single agency card/SingleAgencyCard";
import FeaturePropertySidebar from "../feature property sidebar/FeaturePropertySidebar";

const AgencyListing = ({allAgency}) => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-8 items-start gap-2">
        {/* Agency listing */}
        <div className="lg:col-span-6">
          <div>
            <h1 className="font-bold text-3xl">Agency Listing</h1>
            <p className="text-gray-500">
              Showing <span className="text-orange-500">{allAgency?.length || 0}</span>{" "}
              {allAgency?.length === 1 ? "Agency" : "Agencies"}
            </p>
          </div>

          <div className="divider mt-5" />

          {/* Cards */}
          {allAgency && allAgency.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {allAgency.map((item) => (
                <SingleAgencyCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No agencies found.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-2">
          <FeaturePropertySidebar />
        </aside>
      </div>
    </div>
  );
};

export default AgencyListing;
