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
    <div className="py-5 bg-transparent">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "rgba(255,255,255,0.1)",
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <TabList
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="property tabs"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#F97316", // orange-500
                  height: 3,
                  borderRadius: 2
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
                      color: "#9CA3AF", // gray-400
                      "&.Mui-selected": {
                        color: "#fff",
                        fontWeight: "bold",
                        textShadow: "0 0 20px rgba(249, 115, 22, 0.5)"
                      },
                      textTransform: "none",
                      fontSize: "0.95rem",
                      minWidth: { xs: 100, sm: 130 },
                      mr: 1
                    }}
                  />
                )
              )}
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ px: 0, py: 4 }}>
            <AboutTab />
          </TabPanel>
          <TabPanel value="2" sx={{ px: 0, py: 4 }}>
            <FeatureTab />
          </TabPanel>
          <TabPanel value="3" sx={{ px: 0, py: 4 }}>
            <GalleryTab />
          </TabPanel>
          <TabPanel value="4" sx={{ px: 0, py: 4 }}>
            <VideoTab />
          </TabPanel>
          <TabPanel value="5" sx={{ px: 0, py: 4 }}>
            <FloorPlan />
          </TabPanel>
          <TabPanel value="6" sx={{ px: 0, py: 4 }}>
            <LocationTab />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default TabSection;
