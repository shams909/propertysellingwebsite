import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { successToast, errorToast } from "../../utils/toastUtils";
import axios from "axios";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInUser(data.email, data.password).then(() => {
        navigate(location.state?.from || "/");
        successToast("Login successful!");
      });
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWIthGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const loggedInUser = result.user;
      successToast("Login successful via Google!");
      navigate(location?.state?.from || "/");

      // Send user data to backend
      const finalUserData = {
        role: ["buyer", "seller"], // e.g., "buyer" or "seller"
        createdAt: new Date().toISOString(),
        photo: loggedInUser.photoURL,
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        logInWithGoogle: true,

      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        finalUserData
      );





    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full relative z-10">

        {/* LEFT SIDE LOTTIE - Darkened */}
        <div className="hidden lg:flex items-center justify-center bg-black/20 p-8 border-r border-white/5">
          <DotLottieReact
            src="/lotties/Appointment booking with smartphone.lottie"
            loop
            autoplay
            style={{ width: "100%", maxWidth: 400, filter: "brightness(0.9)" }}
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2 text-white">Welcome Back</h2>
            <p className="text-gray-400">
              Login to manage your properties easily
            </p>
          </div>

          <button
            onClick={handleSignInWIthGoogle}
            className="btn bg-white/5 hover:bg-white/10 border-white/10 text-white w-full mb-6 flex items-center gap-3 h-12 rounded-xl transition-all"
          >
            <FcGoogle size={22} />
            <span className="font-medium">Continue with Google</span>
          </button>

          <div className="divider divider-neutral text-gray-500 mb-6">OR LOGIN WITH EMAIL</div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-300 ml-1">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="input bg-black/20 border-white/10 text-white w-full h-12 rounded-xl focus:border-orange-500/50 focus:outline-none placeholder-gray-600 transition-all"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password with Show/Hide */}
            <div className="space-y-1.5 relative">
              <label className="text-sm font-semibold text-gray-300 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input bg-black/20 border-white/10 text-white w-full h-12 rounded-xl focus:border-orange-500/50 focus:outline-none pr-12 placeholder-gray-600 transition-all"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-sm font-medium"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-center gap-3 ml-1">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-warning border-white/30 rounded-md"
                {...register("checkbox", { required: "Checkbox is required" })}
              />
              <p className="text-sm text-gray-400">
                I agree to the{" "}
                <span className="text-orange-500 cursor-pointer hover:underline">
                  Privacy Policy
                </span>
              </p>
            </div>
            {errors.checkbox && (
              <p className="text-red-500 text-sm ml-1">{errors.checkbox.message}</p>
            )}

            {/* Login Button */}
            <button className="btn bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border-none w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all mt-2">
              {loading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                "Login Account"
              )}
            </button>
          </form>

          <p className="text-gray-400 mt-8 text-center text-sm">
            Don’t have an account?{" "}
            <Link
              to={"/register"}
              className="text-orange-500 hover:text-orange-400 cursor-pointer font-bold transition-colors"
            >
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
