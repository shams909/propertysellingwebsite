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
    <div className="w-full py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 space-y-8 relative">
        <div className=" mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Videos & <span className="text-orange-600">Property Tour</span>
          </h2>
          <p className="text-gray-600">
            Everything you need for comfort and security.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1} // One video per slide
          navigation={{
            prevEl: ".custom-video-prev",
            nextEl: ".custom-video-next",
          }}
          loop={true}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="w-full h-[400px] md:h-[500px] ">
                  <iframe
                    src={video}
                    title={`property-video-${index}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-xl object-cover"
                  ></iframe>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Absolute Navigation Buttons */}
        <div className="absolute -bottom-15 right-1/2 transform translate-x-1/2 z-50 flex gap-3">
          <div className="custom-video-prev cursor-pointer bg-[#FFEEEC] text-orange-500 shadow-md p-3 rounded-md hover:bg-orange-100 transition">
            <FaArrowLeft size={20} />
          </div>
          <div className="custom-video-next cursor-pointer bg-[#FFEEEC] text-orange-500 shadow-md p-3 rounded-md hover:bg-orange-100 transition">
            <FaArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTab;
