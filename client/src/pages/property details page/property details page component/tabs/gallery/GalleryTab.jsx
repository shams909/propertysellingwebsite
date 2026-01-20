import React, { useState } from "react";
import Title from "../../../../../component/title/Title";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import usePropertyById from "../../../../../hooks/usePropertyById";

const GalleryTab = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id);

  const images = property.images;
  if (isLoading)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-xl text-orange-500"></span>
        <p className="mt-4 text-sm text-gray-500 tracking-wide">
          loading data...
        </p>
      </div>
    );

  return (
    <div className="w-full relative py-6">
      {/* Navigation Buttons */}
      <div className="absolute -bottom-10 right-1/2 transform translate-x-1/2 z-50 flex gap-3">
        <div className="custom-gallery-prev cursor-pointer bg-white/5 text-white hover:bg-orange-500 border border-white/10 shadow-lg p-3 rounded-xl backdrop-blur-md transition active:scale-95">
          <FaArrowLeft size={18} />
        </div>
        <div className="custom-gallery-next cursor-pointer bg-white/5 text-white hover:bg-orange-500 border border-white/10 shadow-lg p-3 rounded-xl backdrop-blur-md transition active:scale-95">
          <FaArrowRight size={18} />
        </div>
      </div>

      {/* Title */}
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-2xl font-bold text-white mb-2">
          Gallery & <span className="text-orange-500">Property Photos</span>
        </h2>
        <p className="text-gray-400 text-sm">
          Everything you need for comfort and security.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-4">
        {/* Main Slider */}
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={16}
          navigation={{
            prevEl: ".custom-gallery-prev",
            nextEl: ".custom-gallery-next",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="rounded-2xl overflow-hidden shadow-2xl mySwiper2 border border-white/10"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt="Property"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Slider */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={12}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mySwiper mt-4"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-xl overflow-hidden border border-white/10 cursor-pointer hover:border-orange-500 transition-all duration-300 group">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                <img
                  src={img}
                  className="w-full h-[60px] sm:h-[70px] md:h-20 lg:h-[90px] object-cover"
                  alt={`thumb-${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GalleryTab;
