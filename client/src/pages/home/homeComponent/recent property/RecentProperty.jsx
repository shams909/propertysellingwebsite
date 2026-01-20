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
    <div className="md:px-4 lg:px-0 relative py-20 bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Title */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recent <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">Properties</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the latest additions to our exclusive portfolio, featuring modern amenities and prime locations.
          </p>
        </div>
      </div>

      {/* Custom Navigation Buttons */}
      <div
        className="
        absolute 
        top-10 right-5 
         sm:right-10
        z-10 flex gap-3
      "
      >
        <div className="custom-recent-prev cursor-pointer bg-white/5 hover:bg-orange-500 text-white shadow-lg p-3 rounded-xl border border-white/10 backdrop-blur-md transition-all active:scale-95">
          <FaArrowLeft />
        </div>
        <div className="custom-recent-next cursor-pointer bg-white/5 hover:bg-orange-500 text-white shadow-lg p-3 rounded-xl border border-white/10 backdrop-blur-md transition-all active:scale-95">
          <FaArrowRight />
        </div>
      </div>

      {/* Swiper */}
      <div className="mt-8 container mx-auto px-4">
        <Swiper
          loop={true}
          spaceBetween={24}
          keyboard={{ enabled: true }}
          navigation={{
            prevEl: ".custom-recent-prev",
            nextEl: ".custom-recent-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Keyboard, Navigation]}
          className="mySwiper pb-12!"
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
