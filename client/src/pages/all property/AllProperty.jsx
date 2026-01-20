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
          <h1 className="text-white text-4xl font-semibold ">All Property</h1>
          <div>
            <Breadcumb></Breadcumb>
          </div>
        </div>
      </div>
      <PropertyListing></PropertyListing>
    </div>
  );
};

export default AllProperty;
