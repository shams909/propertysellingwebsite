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
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl text-center flex flex-col gap-6 w-full md:w-3/5 lg:w-1/2 mx-auto py-16 px-8 relative overflow-hidden group">

          {/* Decor */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[50px] pointer-events-none" />

          {/* Tag */}
          <h1 className="bg-orange-500/10 border border-orange-500/20 rounded-full px-5 py-1.5 text-orange-400 font-semibold mx-auto text-sm tracking-wide">
            #RealEstate
          </h1>

          {/* Title */}
          <p className="text-4xl font-bold text-white">
            Stay Up to Date
          </p>

          {/* Description */}
          <p className="text-gray-400 w-4/5 mx-auto leading-relaxed text-sm">
            Elegant retreat in a quiet Coral Gables setting. This home provides
            wonderful entertaining spaces with a chef kitchen opening into an
            elegant living area.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4 mt-4 w-full sm:w-4/5 mx-auto relative z-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                bg-black/20
                text-white
                py-4 px-6
                rounded-xl
                text-center
                border border-white/10
                focus:outline-none
                focus:border-orange-500/50
                focus:bg-black/30
                placeholder:text-gray-500
                transition-all
              "
            />

            <button className="bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all transform active:scale-95 self-center w-full sm:w-auto">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
