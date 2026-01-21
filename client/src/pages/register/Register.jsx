import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser, updateUser, logout, signInWithGoogle } =
    useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  // CLOUDINARY IMAGE UPLOAD
  const uploadUserImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "users_image"); // your preset
    setUploading(true);
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dunx2j1ru/image/upload",
        formData,
      );

      setImageUrl(data.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Failed to upload image!");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error("Please upload a profile photo!");
      return;
    }

    const finalData = { ...data, photo: imageUrl };
    try {
      setLoading(true);

      await createUser(finalData.email, finalData.password);

      await updateUser(finalData.name, imageUrl);

      await logout();

      const { password, confirmPassword, privacy, username, ...userData } =
        finalData;
      userData.createdAt = new Date().toISOString();
      userData.logInWithGoogle = false;
      userData.role = ["buyer", "seller"];

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);

      toast.success("User Registered Successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      // Sign in with Google
      const result = await signInWithGoogle();

      // The logged-in user info is inside result.user
      const loggedInUser = result.user;

      toast.success("Login successful via Google!");
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-25 pb-8 sm:py-28">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-600/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl relative z-10 flex flex-col lg:flex-row gap-0">
        {/* LEFT SIDE - FORM FIELDS */}
        <div className="w-full lg:w-1/2 p-5 sm:p-6 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Header */}
          <div className="mb-4 sm:mb-6 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Create Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Join as a Buyer or Seller
            </p>
          </div>

          {/* Social Login */}
          <button
            onClick={handleSignInWithGoogle}
            className="btn bg-white/5 hover:bg-white/10 border border-white/10 text-white w-full mb-4 flex items-center justify-center gap-3 h-10 min-h-0 rounded-lg text-sm transition-all font-medium"
          >
            <FcGoogle size={18} />
            <span>Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="divider divider-neutral text-gray-500 text-[10px] sm:text-xs my-3 sm:my-4">
            OR REGISTER
          </div>

          {/* LEFT FORM FIELDS */}
          <form className="space-y-3 sm:space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input bg-black/20 border border-white/10 text-white text-sm w-full h-10 rounded-lg focus:border-orange-500/50 focus:outline-none placeholder-gray-600 transition-all"
                {...register("name", { required: "Required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">
                Username
              </label>
              <input
                type="text"
                placeholder="johndoe123"
                className="input bg-black/20 border border-white/10 text-white text-sm w-full h-10 rounded-lg focus:border-orange-500/50 focus:outline-none placeholder-gray-600 transition-all"
                {...register("username", { required: "Required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Profile Photo */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">
                Profile Photo
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 h-10 rounded border border-dashed border-orange-500/30 flex items-center justify-center bg-black/20 cursor-pointer overflow-hidden hover:border-orange-500/50 transition-all">
                  <span className="text-gray-500 text-xs font-medium">
                    Upload Photo
                  </span>
                  {uploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="loading loading-spinner loading-sm text-orange-500"></span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadUserImage}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="w-10 h-10 rounded border border-white/10 bg-black/20 flex items-center justify-center overflow-hidden shrink-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-500">?</span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE - REMAINING FORM FIELDS */}
        <div className="w-full lg:w-1/2 p-5 sm:p-6 flex flex-col justify-center">
          {/* Divider Header for Mobile */}
          <div className="mb-4 text-center lg:hidden">
            <h3 className="text-lg font-bold text-white">
              Continue Registration
            </h3>
          </div>

          {/* RIGHT FORM FIELDS */}
          <form
            className="space-y-3 sm:space-y-4"
            onSubmit={handleSubmit(onSubmit)}
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
                {...register("email", { required: "Required" })}
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
                  placeholder="••••••"
                  className="input bg-black/20 border border-white/10 text-white text-sm w-full h-10 rounded-lg focus:border-orange-500/50 focus:outline-none pr-10 placeholder-gray-600 transition-all"
                  {...register("password", {
                    required: "Required",
                    minLength: { value: 6, message: "Min 6 chars" },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs font-medium transition-colors"
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

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="input bg-black/20 border border-white/10 text-white text-sm w-full h-10 rounded-lg focus:border-orange-500/50 focus:outline-none pr-10 placeholder-gray-600 transition-all"
                  {...register("confirmPassword", {
                    required: "Required",
                    validate: (v) => v === password || "Passwords don't match",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs font-medium transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Privacy */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-xs checkbox-warning border-white/30 rounded"
                {...register("privacy", { required: "Required" })}
              />
              <p className="text-xs text-gray-400">
                I agree to{" "}
                <span className="text-orange-500 font-medium">
                  Privacy Policy
                </span>
              </p>
            </div>
            {errors.privacy && (
              <p className="text-red-500 text-xs font-medium">
                {errors.privacy.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border-none w-full h-10 min-h-0 rounded-lg text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-gray-400 mt-4 text-center text-xs sm:text-sm">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 font-bold hover:text-orange-400 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;