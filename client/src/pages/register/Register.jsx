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
        formData
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
        "Something went wrong!"
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

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        finalUserData
      );

    } catch (error) {
      console.error(error);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 pt-25 pb-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-lg shadow-2xl overflow-hidden max-w-xs w-full relative z-10">
        {/* FORM ONLY - Single Column */}
        <div className="p-2.5 flex flex-col justify-center max-h-[90vh] overflow-y-auto">
          <div className="mb-1.5 text-center">
            <h2 className="text-base font-bold text-white">Create Account</h2>
            <p className="text-gray-400 text-[9px]">Join as a Buyer or Seller</p>
          </div>

          {/* Social Login */}
          <button
            onClick={handleSignInWithGoogle}
            className="btn bg-white/5 hover:bg-white/10 border-white/10 text-white w-full mb-1.5 flex items-center gap-1.5 h-7 min-h-0 rounded text-xs transition-all"
          >
            <FcGoogle size={14} />
            <span className="font-medium">Sign up with Google</span>
          </button>

          <div className="divider divider-neutral text-gray-500 text-[9px] my-1">OR REGISTER WITH EMAIL</div>

          {/* Registration Form */}
          <form className="space-y-1.5" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="space-y-0.5">
              <label className="text-[10px] font-semibold text-gray-300 ml-0.5">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="input bg-black/20 border-white/10 text-white text-xs w-full h-7 min-h-0 rounded focus:border-orange-500/50 focus:outline-none placeholder-gray-600 transition-all px-2"
                {...register("name", { required: "Required" })}
              />
            </div>

            {/* Username */}
            <div className="space-y-0.5">
              <label className="text-[10px] font-semibold text-gray-300 ml-0.5">Username</label>
              <input
                type="text"
                placeholder="johndoe123"
                className="input bg-black/20 border-white/10 text-white text-xs w-full h-7 min-h-0 rounded focus:border-orange-500/50 focus:outline-none placeholder-gray-600 transition-all px-2"
                {...register("username", { required: "Required" })}
              />
            </div>

            {/* Profile Photo */}
            <div className="space-y-0.5">
              <label className="text-[10px] font-semibold text-gray-300 ml-0.5">Photo</label>
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1 h-7 rounded border border-dashed border-orange-500/30 flex items-center justify-center bg-black/20 cursor-pointer overflow-hidden hover:border-orange-500/50 transition-all">
                  <span className="text-gray-500 text-[9px] font-medium">Upload</span>
                  {uploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="loading loading-spinner loading-xs text-orange-500"></span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={uploadUserImage} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                <div className="w-7 h-7 rounded border border-white/10 bg-black/20 flex items-center justify-center overflow-hidden shrink-0">
                  {imageUrl ? <img src={imageUrl} alt="" className="w-full h-full object-cover" /> : <span className="text-[8px] text-gray-500">?</span>}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-0.5">
              <label className="text-[10px] font-semibold text-gray-300 ml-0.5">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="input bg-black/20 border-white/10 text-white text-xs w-full h-7 min-h-0 rounded focus:border-orange-500/50 focus:outline-none placeholder-gray-600 transition-all px-2"
                {...register("email", { required: "Required" })}
              />
            </div>

            {/* Password */}
            <div className="space-y-0.5">
              <label className="text-[10px] font-semibold text-gray-300 ml-0.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="input bg-black/20 border-white/10 text-white text-xs w-full h-7 min-h-0 rounded focus:border-orange-500/50 focus:outline-none pr-10 placeholder-gray-600 transition-all px-2"
                  {...register("password", { required: "Required", minLength: { value: 6, message: "Min 6" } })}
                />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-[9px]" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-0.5">
              <label className="text-[10px] font-semibold text-gray-300 ml-0.5">Confirm</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="input bg-black/20 border-white/10 text-white text-xs w-full h-7 min-h-0 rounded focus:border-orange-500/50 focus:outline-none pr-10 placeholder-gray-600 transition-all px-2"
                  {...register("confirmPassword", { required: "Required", validate: (v) => v === password || "No match" })}
                />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-[9px]" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Privacy */}
            <div className="flex items-center gap-1.5 ml-0.5">
              <input type="checkbox" className="checkbox checkbox-xs checkbox-warning border-white/30 rounded" style={{ width: '12px', height: '12px' }} {...register("privacy", { required: "Required" })} />
              <p className="text-[9px] text-gray-400">I agree to <span className="text-orange-500">Privacy Policy</span></p>
            </div>

            <button type="submit" className="btn bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border-none w-full h-7 min-h-0 rounded text-xs font-bold shadow-lg shadow-orange-500/20 transition-all" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-xs"></span> : "Create Account"}
            </button>
          </form>

          <p className="text-gray-400 mt-2 text-center text-[9px]">
            Have an account? <Link to="/login" className="text-orange-500 font-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
