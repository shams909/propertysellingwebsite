import React from "react";
import Title from "../../../../../component/title/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import usePropertyById from "../../../../../hooks/usePropertyById";

const VideoTab = () => {
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id);

  const videos = property.videos;
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
    <div className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8 relative">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">
            Videos & <span className="text-orange-500">Property Tour</span>
          </h2>
          <p className="text-gray-400">
            Everything you need for comfort and security.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: ".custom-video-prev",
            nextEl: ".custom-video-next",
          }}
          loop={true}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="relative overflow-hidden bg-black">
                <div className="w-full h-[400px] md:h-[500px]">
                  <iframe
                    src={video}
                    title={`property-video-${index}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  ></iframe>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Absolute Navigation Buttons */}
        <div className="absolute -bottom-16 right-1/2 transform translate-x-1/2 z-50 flex gap-3">
          <div className="custom-video-prev cursor-pointer bg-white/5 text-white hover:bg-orange-500 border border-white/10 shadow-lg p-3 rounded-xl backdrop-blur-md transition active:scale-95">
            <FaArrowLeft size={20} />
          </div>
          <div className="custom-video-next cursor-pointer bg-white/5 text-white hover:bg-orange-500 border border-white/10 shadow-lg p-3 rounded-xl backdrop-blur-md transition active:scale-95">
            <FaArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTab;
