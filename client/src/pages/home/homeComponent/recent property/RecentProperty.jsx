import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Keyboard, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Title from "../../../../component/title/Title";
import RecentPropertyCard from "./RecentPropertyCard";
import useProperties from "../../../../hooks/useProperties";

const RecentProperty = () => {
  const { data: latestProperty } = useProperties({});
  const finalData = latestProperty?.slice(3, 6) || [];
  return (
    <div className="container mx-auto py-12 px-4 lg:px-0 relative">
      <Title
        title={"Recent Property"}
        description={
          "Elegant retreat in Coral Gables setting. This home provides entertaining spaces with kitchen opening"
        }
      />

      {/* Custom Navigation Buttons */}
      <div
        className="
        absolute 
        top-10 right-5 
         sm:right-10
        z-10 flex gap-3
      "
      >
        <div className="custom-recent-prev cursor-pointer bg-[#FFEEEC] text-orange-500 shadow-md p-3 rounded-md">
          <FaArrowLeft />
        </div>
        <div className="custom-recent-next cursor-pointer bg-[#FFEEEC] text-orange-500 shadow-md p-3 rounded-md">
          <FaArrowRight />
        </div>
      </div>

      {/* Swiper */}
      <div className="mt-8">
        <Swiper
          loop={true}
          spaceBetween={20}
          keyboard={{ enabled: true }}
          navigation={{
            prevEl: ".custom-recent-prev",
            nextEl: ".custom-recent-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 }, // Mobile
            640: { slidesPerView: 1.2 }, // Small screens
            768: { slidesPerView: 2 }, // Tablets
            1024: { slidesPerView: 3 }, // Desktop
          }}
          modules={[Keyboard, Navigation]}
          className="mySwiper"
        >
          {finalData.map((item) => (
            <SwiperSlide key={item._id}>
              <RecentPropertyCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecentProperty;
