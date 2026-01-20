import React from "react";
import Title from "../../../../component/title/Title";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import HappyClientCard from "./HappyClientCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HappyClient = () => {
  return (
    <div className="container mx-auto my-18 px-4 sm:px-6">
      <Title
        title={"Happy Client"}
        description={
          "Elegant retreat in Coral Gables setting. This home provides entertaining spaces with kitchen opening"
        }
      />

      <div className="relative mt-6">
        {/* Custom Navigation Buttons */}
        <div className="
          absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3
          lg:left-auto sm:right-10 sm:translate-x-0
          z-10
        ">
          <div className="custom-client-prev cursor-pointer text-[#FFEEEC] bg-orange-500 shadow-md p-3 rounded-md">
            <FaArrowLeft />
          </div>
          <div className="custom-client-next cursor-pointer text-[#FFEEEC] bg-orange-500 shadow-md p-3 rounded-md">
            <FaArrowRight />
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".custom-client-prev",
            nextEl: ".custom-client-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <HappyClientCard />
          </SwiperSlide>
          <SwiperSlide>
            <HappyClientCard />
          </SwiperSlide>
          <SwiperSlide>
            <HappyClientCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HappyClient;
