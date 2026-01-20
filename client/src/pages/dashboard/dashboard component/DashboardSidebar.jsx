import { NavLink, useNavigate } from "react-router-dom";
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
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300";

  const activeLink = "bg-white text-orange-600 font-semibold shadow-md";

  const normalLink = "text-white hover:bg-orange-400";

  const navClass = ({ isActive }) =>
    `${linkBase} ${isActive ? activeLink : normalLink}`;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-orange-600 text-white p-3 rounded-lg shadow-lg hover:bg-orange-700 transition"
        title="Toggle Menu"
      >
        {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
        ></div>
      )}

      {/* Sidebar - Desktop and Mobile Drawer */}
      <aside
        className={` sticky top-0 bg-linear-to-b from-orange-500 to-orange-700 text-white flex flex-col transition-all duration-300 z-40 ${
          isDrawerOpen
            ? "fixed left-0 top-0 w-64 overflow-y-auto"
            : "hidden md:flex md:w-64"
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 text-2xl bg-white flex justify-center items-center font-bold border-b border-orange-400">
          <img src={logo} alt="Logo" />
        </div>

        {/* ================= Dashboard ================= */}
        <nav className="px-4 py-6 space-y-2 border-b border-orange-400">
          <p className="px-4 text-xs uppercase tracking-wide opacity-80">
            Dashboard
          </p>
          {/* Common */}
          {(role === "buyer" || role === "seller") && (
            <>
              <NavLink
                to="/dashboard"
                end
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaHome /> Dashboard
              </NavLink>
            </>
          )}
          {/* Buyer */}
          {role === "buyer" && (
            <>
              <NavLink
                to="/dashboard/favourites"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaHeart /> Favourites
              </NavLink>

              <NavLink
                to="/dashboard/buyer/appointments"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaCalendarCheck />
                My Appointments
              </NavLink>
            </>
          )}
          {/* Seller */}
          {role === "seller" && (
            <>
              <NavLink
                to="/dashboard/seller/add-property"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaPlusCircle /> Add Property
              </NavLink>

              <NavLink
                to="/dashboard/seller/manage-properties"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaBuilding /> Manage Properties
              </NavLink>

              <NavLink
                to="/dashboard/seller/manage-appointments"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaCalendarCheck /> Appointments Request
              </NavLink>
            </>
          )}
          {/* Admin */}
          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/manage-users"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaUsers /> Manage Users
              </NavLink>

              <NavLink
                to="/dashboard/manage-properties"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaBuilding /> Manage Properties
              </NavLink>

              <NavLink
                to="/dashboard/property-requests"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaClipboardList /> Property Requests
              </NavLink>
              <NavLink
                to="/dashboard/manage-agencies"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaBuilding /> Manage Agencies
              </NavLink>
              <NavLink
                to="/dashboard/seller/add-property"
                onClick={() => setIsDrawerOpen(false)}
                className={navClass}
              >
                <FaPlusCircle /> Add Property
              </NavLink>
            </>
          )}
        </nav>

        {/* ================= Website ================= */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="px-4 text-xs uppercase tracking-wide opacity-80">
            Website
          </p>

          <NavLink
            to="/"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaGlobe /> Home
          </NavLink>

          <NavLink
            to="/all-property"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaBuilding /> Property
          </NavLink>

          <NavLink
            to="/all-agency"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaUsers /> Agency
          </NavLink>

          <NavLink
            to="/blog"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaBlog /> Blog
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaEnvelope /> Contact
          </NavLink>
        </nav>

        {/* ================= Bottom ================= */}
        <div className="border-t border-orange-400 px-4 py-4 space-y-2">
          <NavLink
            to="/profile"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaUserCircle /> Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            onClick={() => setIsDrawerOpen(false)}
            className={navClass}
          >
            <FaCog /> Settings
          </NavLink>

          <button
            onClick={handleLogout}
            className={`${linkBase} hover:bg-red-500 w-full`}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
