import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AboutTab from "../tabs/about/AboutTab";
import FeatureTab from "../tabs/feature/FeatureTab";
import GalleryTab from "../tabs/gallery/GalleryTab";
import VideoTab from "../tabs/video/VideoTab";
import FloorPlan from "../tabs/floor plan/FloorPlan";
import LocationTab from "../tabs/location/LocationTab";

const TabSection = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="py-5 md:shadow-lg rounded-lg bg-white">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" }, // hide scrollbar
            }}
          >
            <TabList
              onChange={handleChange}
              variant="scrollable" // makes tabs scrollable on small screens
              scrollButtons="auto"
              aria-label="property tabs"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#F54A00", // indicator bar color
                },
              }}
            >
              {["ABOUT", "FEATURE", "GALLERY", "VIDEO", "FLOORPLAN", "LOCATION"].map(
                (label, index) => (
                  <Tab
                    key={index}
                    label={label}
                    value={`${index + 1}`}
                    sx={{
                      color: "#444",
                      "&.Mui-selected": {
                        color: "#F54A00",
                        fontWeight: "bold",
                      },
                      textTransform: "none", // keep text normal case
                      minWidth: { xs: 120, sm: 150 }, // min width for scrollable
                    }}
                  />
                )
              )}
            </TabList>
          </Box>

          <TabPanel value="1">
            <AboutTab />
          </TabPanel>
          <TabPanel value="2">
            <FeatureTab />
          </TabPanel>
          <TabPanel value="3">
            <GalleryTab />
          </TabPanel>
          <TabPanel value="4">
            <VideoTab />
          </TabPanel>
          <TabPanel value="5">
            <FloorPlan />
          </TabPanel>
          <TabPanel value="6">
            <LocationTab />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default TabSection;
