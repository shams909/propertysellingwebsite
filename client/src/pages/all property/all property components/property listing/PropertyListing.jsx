import React, { useState } from "react";
import AllPropertyCardSection from "../all property card section/AllPropertyCardSection";
import FilterSection from "../filter section/FilterSection";
import CategoryFilterSection from "../category section/CategoryFilterSection";
import ContactInfo from "../contact info/ContactInfo";
import RecentlyAddedSection from "../recently added property/RecentlyAddedSection";
import useProperties from "../../../../hooks/useProperties";
import { Drawer } from "@mui/material";
import Loading from "../../../../component/loading/Loading";

const PropertyListing = () => {
  const [filter, setFilter] = useState({
    propertyStatus: "",
    propertyType: "",
    beds: "",
    maxRooms: "",
    baths: "",
    belcony: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
  });

  const [openDrawer, setOpenDrawer] = useState(false);


  const { data: properties, isLoading } = useProperties(filter);

  const toggleDrawer = (open) => () => setOpenDrawer(open);

  const drawerContent = (
    <div className=" w-80 h-full p-4 bg-white flex flex-col gap-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2">Advanced Filters</h1>
      <FilterSection filter={filter} setFilter={setFilter} />
      <CategoryFilterSection filter={filter} setFilter={setFilter} />
      <ContactInfo />
      <RecentlyAddedSection />
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
        {/* Sidebar for desktop */}
        <div className="hidden lg:flex flex-col col-span-2 gap-5">
          <FilterSection filter={filter} setFilter={setFilter} />
          <CategoryFilterSection filter={filter} setFilter={setFilter} />
          <ContactInfo />
          <RecentlyAddedSection />
        </div>

        {/* Mobile filter button */}
        <div className="lg:hidden col-span-1 mb-4">
          <button
            onClick={toggleDrawer(true)}
            className="hidden w-full py-2 rounded-full bg-orange-500 text-white shadow hover:bg-white hover:text-orange-500 transition-all font-semibold"
          >
            Filter Properties
          </button>
          <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            {drawerContent}
          </Drawer>
        </div>

        {/* Property listing section */}
        <div className="col-span-6">
          {isLoading ? (
            Loading()
          ) : properties?.length === 0 ? (
            <div className="w-full min-h-[50vh] flex items-center justify-center">
              <p className="text-gray-500 text-sm">No properties found</p>
            </div>
          ) : (
            <AllPropertyCardSection
              properties={properties}
              filter={filter}
              setFilter={setFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
