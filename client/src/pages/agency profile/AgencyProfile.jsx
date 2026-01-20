import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import bannerImage from "../../assets/agency-profile-bg.jpg";
import Breadcumb from "../../component/breadcrumb/Breadcumb";
import AgencyInfo from "./agency profile components/agency info/AgencyInfo";

import useAgencyById from "../../hooks/useAgencyById";
import Loading from "../../component/loading/Loading";

const AgencyProfile = () => {
  const { id } = useParams();
  
  const { data: agency, isLoading, error } = useAgencyById(id)

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
          <h1 className="text-white text-4xl font-semibold ">
            {agency?.agencyName || "Agency Profile"}
          </h1>
          <div>
            <Breadcumb></Breadcumb>
          </div>
        </div>
      </div>
      {/* agency profile content */}
     {isLoading && <Loading />}

      {error && (
        <div className="container mx-auto py-8 px-4 text-center text-red-500">
          Error loading agency. Please try again.
        </div>
      )}
      {agency && <AgencyInfo agency={agency} agencyId={id}></AgencyInfo>}
    </div>
  );
};

export default AgencyProfile;
