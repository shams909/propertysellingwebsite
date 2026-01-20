import React from "react";
import TabSection from "../tab section/TabSection";
import SendRequestSection from "../send request section/SendRequestSection";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ReviewSection from "../review section/ReviewSection";
import RelatedPropertySection from "../related property section/RelatedPropertySection";

const GridSection = ({ property }) => {
  return (
    <div className="container mx-auto py-8 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">

        {/* Left Side */}
        <div className="col-span-1 lg:col-span-5 space-y-10">
          <TabSection />
          <ReviewSection property={property} />
          <RelatedPropertySection property={property} />
          <div className="h-10"></div> {/* Extra space to allow scroll */}
        </div>

        {/* Right Side */}
        <div className="col-span-1 lg:col-span-2">
          <div className="sticky top-24">
            <SendRequestSection />
          </div>
        </div>

      </div>
    </div>

  );
};

export default GridSection;
