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
    <div className="relative w-full py-20 bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      {/* Custom Navigation Buttons */}
      <div className="container mx-auto px-4 mb-8 flex justify-end gap-3 relative z-10">
        <div className="custom-prev cursor-pointer bg-white/5 hover:bg-orange-500 text-white border border-white/10 p-3 rounded-xl transition-all active:scale-95 backdrop-blur-md">
          <FaArrowLeft />
        </div>
        <div className="custom-next cursor-pointer bg-white/5 hover:bg-orange-500 text-white border border-white/10 p-3 rounded-xl transition-all active:scale-95 backdrop-blur-md">
          <FaArrowRight />
        </div>
      </div>

      <Swiper
        loop={true}
        spaceBetween={24}
        keyboard={{ enabled: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Keyboard, Navigation]}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
          1280: { slidesPerView: 1 },
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
