import React from "react";

import bannerImage from "../../assets/all-agency-bg.jpg";
import Breadcumb from "../../component/breadcrumb/Breadcumb";
import AgencyListing from "./all agency components/agency listing/AgencyListing";

import useAgencies from "../../hooks/useAgencies";
import { useEffect } from "react";
import Loading from "../../component/loading/Loading";

const AllAgency = () => {
  const { data: allAgency, isLoading, error } = useAgencies()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50">
      <div
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "450px",
        }}
        className="flex items-center "
      >
        <div className="container mx-auto px-4 lg:px-0">
          <h1 className="text-white text-4xl font-semibold ">All Agency</h1>
          <div>
            <Breadcumb></Breadcumb>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}

      {error && (
        <div className="container mx-auto py-8 px-4 text-center text-red-500">
          Error loading agencies. Please try again.
        </div>
      )}
      {allAgency && <AgencyListing allAgency={allAgency}></AgencyListing>}
    </div>
  );
};

export default AllAgency;
