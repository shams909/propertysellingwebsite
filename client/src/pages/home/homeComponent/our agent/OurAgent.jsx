import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Keyboard, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import Title from "../../../../component/title/Title";
import OurAgentCard from "./OurAgentCard";

const agents = [
  {
    id: 1,
    name: "Tex Ryta",
    email: "tex@gmail.com",
    image: "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
    description: "Real estate professional providing huge space to live peacefully",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@gmail.com",
    image: "https://media.istockphoto.com/id/2255544683/photo/young-asian-woman-wearing-an-orange-sweater-looking-up-while-shopping-inside-a-modern-retail.jpg?s=1024x1024&w=is&k=20&c=MElViOEb1t87trry1BHj46ORIdO9E798RN7TjayJobo=",
    description: "Luxury property expert with 8+ years of experience",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@gmail.com",
    image: "https://media.istockphoto.com/id/2211735693/photo/portrait-of-a-confident-asian-business-man-leader-looking-at-camera-with-smile.webp?a=1&b=1&s=612x612&w=0&k=20&c=SsijSyTPdXd__kUTB3cVlQeOvfuykClAKwwIeBZduDc=",
    description: "Helping families find their dream homes",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@gmail.com",
    image: "https://images.unsplash.com/photo-1634551053528-d50092733600?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsaWVudCUyMHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
    description: "Trusted agent for modern city apartments",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david@gmail.com",
    image: "https://images.unsplash.com/photo-1714331251780-db56109a9887?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsaWVudCUyMHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
    description: "Specialist in commercial and office properties",
  },
];

const OurAgent = () => {
  return (
    <div className="container mx-auto py-12 relative px-4">
      <Title
        title="Our Agents"
        description="Meet our experienced and professional real estate agents"
      />

      {/* Custom Navigation Buttons */}
      <div className="absolute top-12 right-5 sm:right-10 z-10 flex gap-3">
        <div className="custom-agent-prev cursor-pointer bg-[#FFEEEC] text-orange-500 shadow-md p-3 rounded-md">
          <FaArrowLeft />
        </div>
        <div className="custom-agent-next cursor-pointer bg-[#FFEEEC] text-orange-500 shadow-md p-3 rounded-md">
          <FaArrowRight />
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop
        keyboard={{ enabled: true }}
        navigation={{
          prevEl: ".custom-agent-prev",
          nextEl: ".custom-agent-next",
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Keyboard, Navigation]}
      >
        {agents.map((agent) => (
          <SwiperSlide key={agent.id}>
            <OurAgentCard agent={agent} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurAgent;
