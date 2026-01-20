import React from "react";

import bannerImage from "../../assets/allPropertPageBg.jpg";
import Breadcumb from "../../component/breadcrumb/Breadcumb";
import PropertyListing from "./all property components/property listing/PropertyListing";
import { useEffect } from "react";
const AllProperty = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none fixed" />

      <div
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "450px",
        }}
        className="flex items-center relative z-10"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 lg:px-0 relative z-20">
          <h1 className="text-white text-4xl font-bold mb-2">All Property</h1>
          <div className="text-gray-300">
            <Breadcumb></Breadcumb>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <PropertyListing></PropertyListing>
      </div>
    </div>
  );
};

export default AllProperty;
