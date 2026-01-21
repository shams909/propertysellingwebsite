import React, { useState } from "react";
import SinglePropertyCard from "../single property card/SinglePropertyCard";
import { Drawer } from "@mui/material";
import FilterSection from "../filter section/FilterSection";
import CategoryFilterSection from "../category section/CategoryFilterSection";
import ContactInfo from "../contact info/ContactInfo";
import RecentlyAddedSection from "../recently added property/RecentlyAddedSection";

const AllPropertyCardSection = ({ properties, filter, setFilter }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => () => setOpenDrawer(open);

  const drawerContent = (
    <div className="w-80 h-full p-6 bg-[#0a0a0a] border-r border-white/10 flex flex-col gap-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2 text-white">Advanced Filters</h1>
      <FilterSection filter={filter} setFilter={setFilter} />
      <CategoryFilterSection filter={filter} setFilter={setFilter} />
      <ContactInfo />
      <RecentlyAddedSection />
    </div>
  );

  return (
    <div className="my-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Property Listings</h1>
        {/* Mobile Filter Button */}
        <button
          onClick={toggleDrawer(true)}
          className="lg:hidden py-2.5 px-5 bg-white/10 hover:bg-orange-500/20 text-white rounded-full shadow-lg border border-white/10 hover:border-orange-500/30 transition-all backdrop-blur-md font-medium"
        >
          Filter
        </button>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((property) => (
          <SinglePropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default AllPropertyCardSection;
