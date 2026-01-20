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
        <div>
         
          <Hero filter={filter} setFilter={setFilter}></Hero>
          <LatestProperty></LatestProperty>
          <FeaturedProperty></FeaturedProperty>
          <PropertyService></PropertyService>
          <RecentProperty></RecentProperty>
          <SearchNowSection></SearchNowSection>
          <HappyClient></HappyClient>
          <Newsletter></Newsletter>
          <OurAgent></OurAgent>
        </div>
    );
};

export default Home;