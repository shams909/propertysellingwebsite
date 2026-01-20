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
    <div className="relative py-20">
      {/* Background */}
      <div className="absolute bottom-0 left-0 h-[40%] md:h-[35%] w-full bg-gray-200 -z-10"></div>

      {/* Title */}
      <div className="container mx-auto px-4">
        <Title
          title="Property Service"
          description="Elegant retreat in Coral Gables setting. This home provides entertaining spaces with kitchen opening"
        />
      </div>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-10 right-5 md:top-1/4 md:right-10 z-10 flex gap-3">
        <div className="custom-service-prev cursor-pointer bg-[#FFEEEC] text-orange-500 shadow-md p-3 rounded-md">
          <FaArrowLeft />
        </div>
        <div className="custom-service-next cursor-pointer bg-[#FFEEEC] text-orange-500 shadow-md p-3 rounded-md">
          <FaArrowRight />
        </div>
      </div>

      {/* Swiper */}
      <div className="container mx-auto mt-10 px-4">
        <Swiper
          loop={true}
          spaceBetween={20}
          keyboard={{ enabled: true }}
          navigation={{
            prevEl: ".custom-service-prev",
            nextEl: ".custom-service-next",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },         // mobile
            480: { slidesPerView: 1.2 },     // small mobile
            640: { slidesPerView: 2 },       // tablet
            1024: { slidesPerView: 3 },      // laptop
          }}
          modules={[Keyboard, Navigation]}
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
