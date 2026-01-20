import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Keyboard, Navigation } from "swiper/modules";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useProperties from "../../../../hooks/useProperties";

const FeaturedProperty = () => {
  const filter = { isFeatured: true };
  const { data: featuredProperty } = useProperties(filter);

  return (
    <div className="relative w-full py-20 sm:py-28 bg-white flex items-center my-8">
      {/* Gray side background */}
      <div
        className="
        absolute top-0 left-0 
        hidden sm:block 
        sm:w-1/3 
        lg:w-[35%] 
        
        h-full bg-gray-200
      "
      ></div>

      {/* Custom Navigation Buttons */}
      <div
        className="
          absolute 
          z-10 flex gap-3
          right-4 top-4
          sm:right-10 sm:top-20 
           md:top-5
        "
      >
        <div className="custom-prev cursor-pointer bg-[#FFEEEC] text-orange-500 shadow p-2 sm:p-3 rounded-md active:scale-90 transition">
          <FaArrowLeft />
        </div>
        <div className="custom-next cursor-pointer bg-[#FFEEEC] text-orange-500 shadow p-2 sm:p-3 rounded-md active:scale-90 transition">
          <FaArrowRight />
        </div>
      </div>

      <Swiper
        loop={true}
        spaceBetween={20}
        keyboard={{ enabled: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Keyboard, Navigation]}
        breakpoints={{
          0: { slidesPerView: 1 }, // Mobile
          640: { slidesPerView: 1 }, // Small tablet
          768: { slidesPerView: 1 }, // Tablet
          1024: { slidesPerView: 1 }, // Laptop
          1280: { slidesPerView: 1 }, // Desktop
        }}
        className="mySwiper container mx-auto px-4"
      >
        {featuredProperty?.map((item) => (
          <SwiperSlide key={item._id}>
            <FeaturedPropertyCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProperty;
