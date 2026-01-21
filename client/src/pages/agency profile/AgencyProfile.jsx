import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Banner */}
      <div className="relative h-[350px] overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-[#050505] to-blue-600/10" />

        {/* Background Orbs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-12">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-white text-4xl font-bold mb-2">
              {agency?.agencyName || "Agency Profile"}
            </h1>
            <Breadcumb />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Background Orbs for content area */}
        <div className="fixed top-1/2 left-0 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        {isLoading && <Loading />}

        {error && (
          <div className="container mx-auto py-8 px-4">
            <div className="bg-red-500/20 border border-red-500/30 backdrop-blur-xl rounded-2xl p-8 text-center">
              <p className="text-red-400">Error loading agency. Please try again.</p>
            </div>
          </div>
        )}

        {agency && <AgencyInfo agency={agency} agencyId={id} />}
      </div>
    </div>
  );
};

export default AgencyProfile;
