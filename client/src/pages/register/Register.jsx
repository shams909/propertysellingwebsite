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

    const finalData = { ...data,  photo: imageUrl };
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
        role:["buyer","seller"], // e.g., "buyer" or "seller"
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-orange-100">
      {/* LEFT SIDE LOTTIE */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-orange-50 p-8">
        <DotLottieReact
          src="/lotties/login.lottie"
          loop
          autoplay
          style={{ width: "100%", maxWidth: 500 }}
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Register Now</h2>
          <p className="text-gray-500 mb-6">
            Create your account as a Buyer or Seller
          </p>

         

          {/* Social Login */}
          <button
            onClick={handleSignInWithGoogle}
            className="btn btn-outline w-full mb-4 flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          <div className="divider">OR</div>

          {/* Registration Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}

            {/* Profile Photo */}
            <div className="flex items-center gap-2">
              <div className="relative w-full h-16 rounded-md border-2 border-dashed border-orange-400 flex items-center justify-center bg-orange-50 cursor-pointer overflow-hidden">
                <span className="text-gray-500 text-sm font-medium">
                  Upload Profile Photo
                </span>
                {uploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <span className="loading loading-spinner text-orange-500"></span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadUserImage}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="w-16 h-16 rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">Preview</span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG • Max 5MB</p>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-12"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: "Include uppercase, lowercase & number",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter Password"
                className="input input-bordered w-full pr-12"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Privacy */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-orange"
                  {...register("privacy", {
                    required: "You must accept the privacy policy",
                  })}
                />
                <span className="text-gray-600 text-sm">
                  I agree to the{" "}
                  <span className="text-orange-500 cursor-pointer">
                    Privacy Policy
                  </span>
                </span>
              </div>
              {errors.privacy && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.privacy.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`btn w-full flex items-center justify-center gap-2 ${
                loading
                  ? "bg-orange-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner"></span>}
              <span>{loading ? "Registering..." : "Register"}</span>
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
