import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Star, Shield, Home } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Hero = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("role", role);
    navigate("/dashboard");
  };

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-[#050505] pt-32 pb-20 flex items-center">
      {/* 🔮 Liquid Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-orange-500/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-10 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-300 tracking-wide">
                No. 1 Real Estate Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="block text-white">
                Find Your
              </span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-200 to-orange-400 animate-gradient-x">
                Dream Home.
              </span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-xl text-lg text-gray-400 leading-relaxed font-light">
              Experience the future of real estate. Buy, sell, and manage properties with our
              <span className="text-white font-medium"> premium liquid interface</span>.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dashboard" onClick={() => handleRoleSelect("buyer")}>
                <button className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden">
                  <span className="relative z-10">Go as a Buyer</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>
              </Link>

              <Link to="/dashboard" onClick={() => handleRoleSelect("seller")}>
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold backdrop-blur-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                  Go as a Seller
                  <Home className="w-4 h-4 text-gray-400" />
                </button>
              </Link>
            </div>

            {/* Stats Glass Card */}
            <div className="grid grid-cols-3 gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-xl shadow-2xl mt-8">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Properties</p>
              </div>
              <div className="text-center lg:text-left border-l border-white/10 pl-6">
                <p className="text-2xl sm:text-3xl font-bold text-white">1k+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Clients</p>
              </div>
              <div className="text-center lg:text-left border-l border-white/10 pl-6">
                <p className="text-2xl sm:text-3xl font-bold text-white">15+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Years</p>
              </div>
            </div>
          </div>

          {/* RIGHT LOTTIE */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* Background Glow behind Image */}
            <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full transform scale-75" />

            <div className="w-full max-w-[800px] h-[700px] relative z-10 drop-shadow-2xl">
              <DotLottieReact
                src="/lotties/herolottie.lottie"
                loop
                autoplay
                className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
