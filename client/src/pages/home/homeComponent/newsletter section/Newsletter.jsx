import React from "react";
import newsletterBg from "../../../../assets/newsletterbg.jpg";

const Newsletter = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${newsletterBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full py-24 flex items-center justify-center"
    >
      <div className="container mx-auto">
        <div className="bg-white rounded-md shadow-xl text-center flex flex-col gap-5 w-full md:w-1/2 mx-auto py-12 px-10">
          
          {/* Tag */}
          <h1 className="bg-[#FEF0F1] rounded-lg px-5 py-1 text-orange-600 font-semibold mx-auto">
            #Realstate
          </h1>

          {/* Title */}
          <p className="text-3xl font-bold text-gray-800">
            Stay Up to Date
          </p>

          {/* Description */}
          <p className="text-sm font-medium text-gray-500 w-4/5 mx-auto leading-relaxed">
            Elegant retreat in a quiet Coral Gables setting. This home provides 
            wonderful entertaining spaces with a chef kitchen opening into an 
            elegant living area.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4 mt-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                bg-[#FEF0F1]
                text-red-500
                py-3 px-4
                rounded-lg
                text-center
                
                focus:outline-none
                focus:ring-2
                focus:ring-orange-400
                focus:bg-[#FEF0F1]
                placeholder:text-red-500
                transition
              "
            />

            <button className="bg-orange-500 text-white px-8 py-3 rounded-md text-sm font-semibold hover:bg-orange-600 transition self-center">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
