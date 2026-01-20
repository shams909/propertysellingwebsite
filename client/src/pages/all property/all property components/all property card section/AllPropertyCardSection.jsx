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
    <div className="w-80 h-full p-4 bg-white flex flex-col gap-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2">Advanced Filters</h1>
      <FilterSection filter={filter} setFilter={setFilter} />
      <CategoryFilterSection filter={filter} setFilter={setFilter} />
      <ContactInfo />
      <RecentlyAddedSection />
    </div>
  );

  return (
    <div className="my-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Property Listings</h1>
        {/* Mobile Filter Button */}
        <button
          onClick={toggleDrawer(true)}
          className="lg:hidden py-2 px-4 bg-orange-500 text-white rounded-full shadow hover:bg-white hover:text-orange-500 transition-all"
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
