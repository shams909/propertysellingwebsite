import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Hero = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("role", role); // ✅ save role
    navigate("/dashboard");
  };
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br  from-slate-950 via-slate-900 to-slate-800 pt-24 pb-32">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-linear-to-br  from-amber-500/20 to-orange-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block rounded-full bg-linear-to-r from-amber-500/10 to-orange-600/10 px-4 py-2 text-sm font-semibold text-amber-400 border border-amber-500/20">
              Welcome to Modern Real Estate
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-white mb-2">
                Your Local Real Estate
              </span>
              <span className="block bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Professionals
              </span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Whether you're buying your dream home or selling your property, we
              provide expert guidance and personalized service to make your real
              estate journey seamless and successful.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/dashboard">
                <button
                  onClick={() => handleRoleSelect("buyer")}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                >
                  Go as a Buyer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>

              <Link to="/dashboard">
                <button
                  onClick={() => handleRoleSelect("seller")}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-600 text-white hover:bg-slate-800/50 font-semibold hover:border-slate-400 transition-all flex items-center justify-center"
                >
                  Go as a Seller
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-700 max-w-2xl mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-400">
                  500+
                </p>
                <p className="text-sm text-slate-400">Properties Listed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-400">
                  1000+
                </p>
                <p className="text-sm text-slate-400">Happy Clients</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-bold text-amber-400">
                  15 Years
                </p>
                <p className="text-sm text-slate-400">Industry Experience</p>
              </div>
            </div>
          </div>

          {/* RIGHT LOTTIE */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="w-full max-w-[700px] h-[600px]">
              <DotLottieReact
                src="/lotties/herolottie.lottie"
                loop
                autoplay
                className="w-full h-full object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
