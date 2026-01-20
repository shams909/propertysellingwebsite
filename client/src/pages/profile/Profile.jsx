import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  //   const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        navigate("/");
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success",
        );
      }
    });
  };

  // Mock data for demonstration
  const profileData = {
    bio: "Professional real estate agent with 8+ years of experience in property sales and management.",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    joinDate: "Joined January 2023",
    properties: 24,
    reviews: 156,
    rating: 4.8,
    favorites: 12,
    role: "Premium Agent",
    about:
      "Specialized in luxury properties and commercial real estate. Dedicated to providing exceptional service to all clients.",
  };

  return (
    <div className="min-h-screen bg-linear-to-br  from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Background */}
        <div className="relative h-48 bg-linear-to-r from-blue-600 to-indigo-600 rounded-t-3xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-b-3xl shadow-xl">
          {/* Profile Header Section */}
          <div className="relative px-4 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-24 relative z-10">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={
                    user?.photoURL ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                  }
                  alt={user?.displayName || "User"}
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
              </div>

              {/* User Basic Info */}
              <div className="flex-1 mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 lg:text-white">
                      {user?.displayName || "User Profile"}
                    </h1>
                    <p className="text-indigo-600 lg:text-white font-semibold text-lg mt-2">
                      {profileData.role}
                    </p>
                    <p className="text-gray-600 mt-1 flex items-center gap-2">
                      <span className="text-yellow-400 text-lg">★</span>
                      {profileData.rating} ({profileData.reviews} reviews)
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 sm:px-8 py-6 border-t border-gray-100">
            <div className="text-center p-4 bg-linear-to-br  from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-blue-600">
                {profileData.properties}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Properties Listed
              </div>
            </div>
            <div className="text-center p-4 bg-linear-to-br  from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-purple-600">
                {profileData.reviews}
              </div>
              <div className="text-sm text-gray-600 mt-1">Reviews</div>
            </div>
            <div className="text-center p-4 bg-linear-to-br  from-pink-50 to-pink-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-1">
                <Heart size={20} />
                {profileData.favorites}
              </div>
              <div className="text-sm text-gray-600 mt-1">Favorites</div>
            </div>
            <div className="text-center p-4 bg-linear-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-2xl font-bold text-green-600">
                {profileData.rating}
              </div>
              <div className="text-sm text-gray-600 mt-1">Rating</div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-8">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="bg-linear-to-br  from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-indigo-600 rounded"></div>
                  Contact Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900 font-semibold break-all">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-900 font-semibold">
                        {profileData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="text-gray-900 font-semibold">
                        {profileData.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="text-orange-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="text-gray-900 font-semibold">
                        {profileData.joinDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-linear-to-br  from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200 mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-indigo-600 rounded"></div>
                  About
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {profileData.about}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  {profileData.bio}
                </p>
              </div>
            </div>

            {/* Sidebar - Verification & Status */}
            <div className="flex flex-col gap-6">
              {/* Verification Status */}
              <div className="bg-linear-to-br  from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Verification Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <span className="text-gray-700 font-medium">
                      Email Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <span className="text-gray-700 font-medium">
                      Identity Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                      ✓
                    </div>
                    <span className="text-gray-700 font-medium">
                      Phone Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Premium Badge */}
              <div className="bg-linear-to-br  from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Premium Member
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Enjoy exclusive benefits and priority support
                </p>
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Manage Membership
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-linear-to-br  from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-blue-600" />
                  Activity
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Last Login:</span> Today at
                    10:30 AM
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Profile Views:</span> 1,234
                    this month
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Properties Viewed:</span>{" "}
                    156 this month
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-8 py-6 border-t border-gray-100">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              Edit Profile
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              My Properties
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
