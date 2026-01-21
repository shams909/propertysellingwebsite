import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaUsers,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBlog,
  FaEnvelope,
  FaGlobe,
  FaHeart,
  FaCalendarCheck,
  FaClipboardList,
  FaUserShield,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { AuthContext } from "../../../provider/AuthProvider";

const DashboardSidebar = () => {
  const role = localStorage.getItem("role");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logout();
        navigate("/");
        Swal.fire({
          title: "Logged Out!",
          text: "You have been logged out successfully.",
          icon: "success",
          confirmButtonColor: "#f97316",
        });
      }
    });
  };

  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 mx-2 mb-1";

  const activeLink =
    "bg-gradient-to-r from-orange-500/20 to-orange-500/5 text-orange-400 font-semibold border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]";

  const normalLink =
    "text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1";

  const navClass = ({ isActive }) =>
    `${linkBase} ${isActive ? activeLink : normalLink}`;

  const SectionLabel = ({ label }) => (
    <p className="px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mt-4 mb-1">
      {label}
    </p>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 text-white p-3 rounded-2xl shadow-2xl transition active:scale-95"
      >
        {isDrawerOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Mobile Drawer Overlay */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ${isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      ></div>

      {/* Sidebar Container */}
      <aside
        className={`sticky top-0 h-screen bg-[#0f0f0f]/60 backdrop-blur-2xl border-r border-white/5 text-white flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-40 ${isDrawerOpen
          ? "fixed left-0 top-0 w-72 translate-x-0 shadow-2xl shadow-black/50"
          : "hidden md:flex md:w-72"
          }`}
      >
        {/* Logo Section */}
        <div className="p-6 flex justify-center items-center">
          <Link to="/" className="bg-white/5 p-4 rounded-3xl border border-white/5 w-full flex justify-center backdrop-blur-md">
            <img src={logo} alt="Logo" className="h-8 object-contain" />
          </Link>
        </div>

        {/* Scrollable Nav Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pb-6 space-y-1">

          {/* Dashboard Section */}
          <SectionLabel label="Menu" />

          {(role === "buyer" || role === "seller") && (
            <NavLink
              to="/dashboard"
              end
              onClick={() => setIsDrawerOpen(false)}
              className={navClass}
            >
              <FaHome className={({ isActive }) => (isActive ? "text-orange-400" : "")} />
              <span>Dashboard</span>
            </NavLink>
          )}

          {/* Buyer Routes */}
          {role === "buyer" && (
            <>
              <NavLink
                to="/dashboard/favourites"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaHeart /> <span>Favourites</span>
              </NavLink>

              <NavLink
                to="/dashboard/buyer/appointments"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaCalendarCheck /> <span>My Appointments</span>
              </NavLink>
            </>
          )}

          {/* Seller Routes */}
          {role === "seller" && (
            <>
              <NavLink
                to="/dashboard/seller/add-property"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaPlusCircle /> <span>Add Property</span>
              </NavLink>

              <NavLink
                to="/dashboard/seller/manage-properties"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaBuilding /> <span>Manage Properties</span>
              </NavLink>

              <NavLink
                to="/dashboard/seller/manage-appointments"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaCalendarCheck /> <span>Requests</span>
              </NavLink>
            </>
          )}

          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/manage-users"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaUsers /> <span>Manage Users</span>
              </NavLink>

              <NavLink
                to="/dashboard/manage-properties"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaBuilding /> <span>Manage Properties</span>
              </NavLink>

              <NavLink
                to="/dashboard/property-requests"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaClipboardList /> <span>Property Requests</span>
              </NavLink>

              <NavLink
                to="/dashboard/manage-agencies"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaBuilding /> <span>Manage Agencies</span>
              </NavLink>

              <NavLink
                to="/dashboard/seller/add-property"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaPlusCircle /> <span>Add Property</span>
              </NavLink>
            </>
          )}

          {/* Website Section */}
          <div className="my-4 border-t border-white/5 mx-6"></div>
          <SectionLabel label="Website" />

          <NavLink to="/" onClick={() => setIsDrawerOpen(false)} className={navClass}>
            <FaGlobe /> <span>Home</span>
          </NavLink>

          <NavLink to="/all-property" onClick={() => setIsDrawerOpen(false)} className={navClass}>
            <FaBuilding /> <span>Properties</span>
          </NavLink>

          <NavLink to="/all-agency" onClick={() => setIsDrawerOpen(false)} className={navClass}>
            <FaUsers /> <span>Agencies</span>
          </NavLink>

          <NavLink to="/blog" onClick={() => setIsDrawerOpen(false)} className={navClass}>
            <FaBlog /> <span>Blog</span>
          </NavLink>

          <NavLink to="/contact" onClick={() => setIsDrawerOpen(false)} className={navClass}>
            <FaEnvelope /> <span>Contact</span>
          </NavLink>
        </div>

        {/* User Profile / Bottom Section */}
        <div className="p-4 bg-black/20 backdrop-blur-md border-t border-white/5">
          <SectionLabel label="Account" />

          <NavLink
            to="/profile"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaUserCircle /> <span>Profile</span>
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaCog /> <span>Settings</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 mx-0 mt-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 group"
          >
            <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
