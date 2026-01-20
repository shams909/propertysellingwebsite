import React, { useState } from 'react';

import Hero from './homeComponent/hero/Hero';
import LatestProperty from './homeComponent/latest property/LatestProperty';
import FeaturedProperty from './homeComponent/featured property/FeaturedProperty';
import PropertyService from './homeComponent/property service/PropertyService';
import RecentProperty from './homeComponent/recent property/RecentProperty';
import SearchNowSection from './homeComponent/Search now section/SearchNowSection';
import HappyClient from './homeComponent/happy client section/HappyClient';
import Newsletter from './homeComponent/newsletter section/Newsletter';
import OurAgent from './homeComponent/our agent/OurAgent';
import { useEffect } from 'react';

const Home = () => {
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen relative overflow-hidden">
      {/* Global Background Ambience for Home */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

      <Hero filter={filter} setFilter={setFilter}></Hero>
      <div className="relative z-10">
        <LatestProperty></LatestProperty>
        <FeaturedProperty></FeaturedProperty>
        <PropertyService></PropertyService>
        <RecentProperty></RecentProperty>
        <SearchNowSection></SearchNowSection>
        <HappyClient></HappyClient>
        <Newsletter></Newsletter>
        <OurAgent></OurAgent>
      </div>
    </div>
  );

};

export default Home;