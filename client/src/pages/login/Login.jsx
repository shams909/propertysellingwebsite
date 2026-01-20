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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full">
        {/* LEFT SIDE LOTTIE */}
        <div className="hidden lg:flex items-center justify-center bg-orange-50 p-8">
          <DotLottieReact
            src="/lotties/Appointment booking with smartphone.lottie"
            loop
            autoplay
            style={{ width: "100%", maxWidth: 400 }}
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-2">Welcome Back </h2>
          <p className="text-gray-500 mb-6">
            Login to manage your properties easily
          </p>

          <button
            onClick={handleSignInWIthGoogle}
            className="btn btn-outline w-full mb-4 flex items-center gap-2"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <div className="divider">OR</div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password with Show/Hide */}
            <div className="relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full pr-12"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                className="absolute right-2 top-0 text-gray-500"
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

            {/* Privacy Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-orange"
                {...register("checkbox", { required: "Checkbox is required" })}
              />
              <p className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="text-orange-500 cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>
            {errors.checkbox && (
              <p className="text-red-500 text-sm">{errors.checkbox.message}</p>
            )}

            {/* Login Button */}
            <button className="btn bg-orange-500 hover:bg-orange-600 text-white w-full flex items-center justify-center">
              {loading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to={"/register"}
              className="text-orange-500 cursor-pointer font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
