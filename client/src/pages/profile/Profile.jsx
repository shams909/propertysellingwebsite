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
    <div className="min-h-screen bg-[#050505] relative">
      {/* Bg Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header Background */}
        <div className="relative h-48 bg-linear-to-r from-orange-900/40 to-black/40 rounded-t-3xl border border-white/5 border-b-0 overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent opacity-50"></div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-b-3xl border border-white/10 shadow-2xl">
          {/* Profile Header Section */}
          <div className="relative px-4 sm:px-8 pb-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-24 relative z-10">
              {/* Profile Picture */}
              <div className="relative group">
                <img
                  src={
                    user?.photoURL ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                  }
                  alt={user?.displayName || "User"}
                  className="w-32 h-32 rounded-3xl border-4 border-[#0a0a0a] shadow-2xl object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-[#0a0a0a] shadow-lg shadow-green-500/50"></div>
              </div>

              {/* User Basic Info */}
              <div className="flex-1 mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      {user?.displayName || "User Profile"}
                    </h1>
                    <p className="text-orange-400 font-medium text-lg mt-1 flex items-center gap-2">
                      {profileData.role}
                      <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20 uppercase tracking-wider">Verified</span>
                    </p>
                    <p className="text-gray-400 mt-2 flex items-center gap-2 text-sm">
                      <span className="text-yellow-400 text-base">★</span>
                      <span className="text-white font-bold">{profileData.rating}</span>
                      <span>({profileData.reviews} reviews)</span>
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-semibold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-md"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 sm:px-8 py-8 border-t border-white/5">
            <StatCard value={profileData.properties} label="Properties Listed" color="text-blue-400" bg="bg-blue-500/5" border="border-blue-500/20" />
            <StatCard value={profileData.reviews} label="Total Reviews" color="text-purple-400" bg="bg-purple-500/5" border="border-purple-500/20" />
            <StatCard value={profileData.favorites} label="Favorites" color="text-pink-400" bg="bg-pink-500/5" border="border-pink-500/20" icon={<Heart size={18} />} />
            <StatCard value={profileData.rating} label="Average Rating" color="text-green-400" bg="bg-green-500/5" border="border-green-500/20" />
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-8">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-md">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ContactItem icon={<Mail size={20} />} label="Email" value={user?.email || "user@example.com"} color="text-blue-400" bg="bg-blue-500/10" />
                  <ContactItem icon={<Phone size={20} />} label="Phone" value={profileData.phone} color="text-green-400" bg="bg-green-500/10" />
                  <ContactItem icon={<MapPin size={20} />} label="Location" value={profileData.location} color="text-purple-400" bg="bg-purple-500/10" />
                  <ContactItem icon={<Calendar size={20} />} label="Member Since" value={profileData.joinDate} color="text-orange-400" bg="bg-orange-500/10" />
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-md">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                  About
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {profileData.about}
                </p>
                <p className="text-gray-400 leading-relaxed mt-4 text-sm">
                  {profileData.bio}
                </p>
              </div>
            </div>

            {/* Sidebar - Verification & Status */}
            <div className="flex flex-col gap-6">
              {/* Verification Status */}
              <div className="bg-green-500/5 rounded-2xl p-6 border border-green-500/20 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4">
                  Verification Status
                </h3>
                <div className="space-y-3">
                  <VerificationItem label="Email Verified" />
                  <VerificationItem label="Identity Verified" />
                  <VerificationItem label="Phone Verified" />
                </div>
              </div>

              {/* Premium Badge */}
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30 backdrop-blur-md relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-amber-400 mb-2">
                    Premium Member
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Enjoy exclusive benefits and priority support
                  </p>
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm">
                    Manage Membership
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-blue-500/5 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-blue-400" />
                  Activity
                </h3>
                <div className="space-y-4 text-sm">
                  <ActivityItem label="Last Login" value="Today at 10:30 AM" />
                  <ActivityItem label="Profile Views" value="1,234 this month" />
                  <ActivityItem label="Properties Viewed" value="156 this month" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-8 py-8 border-t border-white/5">
            <ActionButton label="Edit Profile" bg="bg-white/5" hover="hover:bg-white/10" text="text-white" border="border-white/10" />
            <ActionButton label="My Properties" bg="bg-orange-500" hover="hover:bg-orange-600" text="text-white" border="border-transparent" shadow="shadow-lg shadow-orange-500/20" />
            <ActionButton label="Settings" bg="bg-white/5" hover="hover:bg-white/10" text="text-white" border="border-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ value, label, color, bg, border, icon }) => (
  <div className={`text-center p-4 ${bg} rounded-2xl border ${border} hover:scale-105 transition-transform duration-300`}>
    <div className={`text-2xl font-bold ${color} flex items-center justify-center gap-1.5`}>
      {icon} {value}
    </div>
    <div className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">{label}</div>
  </div>
);

const ContactItem = ({ icon, label, value, color, bg }) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
    <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">{label}</p>
      <p className="text-gray-200 font-medium truncate text-sm">{value}</p>
    </div>
  </div>
);

const VerificationItem = ({ label }) => (
  <div className="flex items-center gap-3">
    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-black text-xs font-bold shadow-lg shadow-green-500/50">
      ✓
    </div>
    <span className="text-gray-300 text-sm font-medium">{label}</span>
  </div>
);

const ActivityItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-300 font-medium">{value}</span>
  </div>
);

const ActionButton = ({ label, bg, hover, text, border, shadow = "" }) => (
  <button className={`${bg} ${hover} ${text} ${border} ${shadow} font-bold py-3.5 px-6 rounded-xl transition-all duration-300 border backdrop-blur-sm`}>
    {label}
  </button>
);

export default Profile;
