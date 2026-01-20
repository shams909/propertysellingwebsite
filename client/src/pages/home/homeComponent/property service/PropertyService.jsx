import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Keyboard, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import service1 from '../../../../assets/service1.png'
import service2 from '../../../../assets/service2.png'
import service3 from '../../../../assets/service3.png'
import service4 from '../../../../assets/service4.png'
import service5 from '../../../../assets/service5.png'

import PropertyServiceCard from "./PropertyServiceCard";
import Title from "../../../../component/title/Title";

const services = [
  { image: service1, serviceName: "Interior Design", serviceDetails: "Elegant and modern interior solutions for your property." },
  { image: service2, serviceName: "Property Renovation", serviceDetails: "Professional renovation services to transform your home." },
  { image: service3, serviceName: "Landscape Design", serviceDetails: "Beautify your garden and outdoor spaces with expert design." },
  { image: service4, serviceName: "Home Inspection", serviceDetails: "Comprehensive property inspection services for safety." },
  { image: service5, serviceName: "Home Inspection", serviceDetails: "Comprehensive property inspection services for safety." },
];

const PropertyService = () => {
  return (
    <div className="relative py-20 bg-[#050505] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Title */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Property <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Elegant retreat in Coral Gables setting. This home provides entertaining spaces with kitchen opening.
          </p>
        </div>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-10 right-5 md:top-1/4 md:right-10 z-10 flex gap-3">
        <div className="custom-service-prev cursor-pointer bg-white/5 hover:bg-orange-500 text-white shadow-lg p-3 rounded-xl border border-white/10 backdrop-blur-md transition-all active:scale-95">
          <FaArrowLeft />
        </div>
        <div className="custom-service-next cursor-pointer bg-white/5 hover:bg-orange-500 text-white shadow-lg p-3 rounded-xl border border-white/10 backdrop-blur-md transition-all active:scale-95">
          <FaArrowRight />
        </div>
      </div>

      {/* Swiper */}
      <div className="container mx-auto mt-10 px-4 relative z-10">
        <Swiper
          loop={true}
          spaceBetween={24}
          keyboard={{ enabled: true }}
          navigation={{
            prevEl: ".custom-service-prev",
            nextEl: ".custom-service-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Keyboard, Navigation]}
          className="pb-12"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <PropertyServiceCard
                image={service.image}
                serviceName={service.serviceName}
                serviceDetails={service.serviceDetails}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PropertyService;
