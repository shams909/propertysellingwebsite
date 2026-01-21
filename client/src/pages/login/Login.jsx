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

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, finalUserData);
    } catch (error) {
      console.error(error);
      errorToast(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-32 pb-6 sm:py-10">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-600/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm relative z-10">
        {/* FORM CONTAINER */}
        <div className="p-5 sm:p-6 flex flex-col justify-center">
          {/* Header */}
          <div className="mb-4 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Login to manage your properties
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleSignInWIthGoogle}
            className="btn bg-white/5 hover:bg-white/10 border border-white/10 text-white w-full mb-3 flex items-center justify-center gap-3 h-10 min-h-0 rounded-lg text-sm transition-all font-medium"
          >
            <FcGoogle size={18} />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="divider divider-neutral text-gray-500 text-[10px] sm:text-xs my-3">
            OR LOGIN WITH EMAIL
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="input bg-black/20 border border-white/10 text-white text-sm w-full h-10 rounded-lg focus:border-orange-500/50 focus:outline-none placeholder-gray-600 transition-all"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input bg-black/20 border border-white/10 text-white text-sm w-full h-10 rounded-lg focus:border-orange-500/50 focus:outline-none pr-10 placeholder-gray-600 transition-all"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-xs font-medium"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning border-white/30 rounded"
                {...register("checkbox", { required: "Required" })}
              />
              <p className="text-xs text-gray-400">
                I agree to the{" "}
                <span className="text-orange-500 cursor-pointer hover:underline font-medium">
                  Privacy Policy
                </span>
              </p>
            </div>
            {errors.checkbox && (
              <p className="text-red-500 text-xs font-medium">
                {errors.checkbox.message}
              </p>
            )}

            {/* Login Button */}
            <button className="btn bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border-none w-full h-10 min-h-0 rounded-lg text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all mt-2">
              {loading ? (
                <span className="loading loading-spinner loading-xs text-white"></span>
              ) : (
                "Login Account"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-gray-400 mt-4 text-center text-xs sm:text-sm">
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