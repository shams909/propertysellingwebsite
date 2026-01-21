"use client";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../provider/AuthProvider";
import { FaHeart } from "react-icons/fa";
import { FiSettings, FiLogOut, FiUser, FiLayout, FiHome, FiGrid, FiBriefcase, FiFileText, FiMail, FiChevronRight } from "react-icons/fi";
import { confirmationToast, successToast } from "../../utils/toastUtils";
import useFavourites from "../../hooks/useFavourites";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { data: favourites = [] } = useFavourites(user?.email);
  const { data: isAdmin } = useAdmin(user?.email);
  const rule = isAdmin?.admin ? "admin" : "user";
  if (isAdmin?.admin) {
    localStorage.setItem("role", "admin");
  }
  else {
    localStorage.setItem("role", "buyer");
  }

  // Navigation links with icons
  const navLinks = [
    { name: "Home", href: "/", icon: FiHome },
    { name: "Property", href: "/all-property", icon: FiGrid },
    { name: "Agency", href: "/all-agency", icon: FiBriefcase },
    { name: "Blog", href: "/blog", icon: FiFileText },
    { name: "Contact", href: "/contact", icon: FiMail },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    confirmationToast({
      message: "Are you sure you want to logout?",
      confirmText: "Logout",
      onConfirm: () => {
        logout().then(() => {
          successToast("Logout successful!");
        });
      }
    });
  };

  return (
    <div className="fixed w-full z-50 top-5 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <nav className={`max-w-7xl mx-auto bg-black/80 backdrop-blur-md border border-white/10 shadow-xl pointer-events-auto transition-all duration-300 ${isOpen ? "rounded-2xl" : "rounded-full"}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons / Icons - Desktop */}
            {user?.email ? (
              <div className="flex gap-4 items-center">
                {/* Favourite, Notifications, Chat */}
                <div className="flex gap-2 items-center">
                  <div
                    role="button"
                    className="btn btn-ghost btn-circle btn-sm mr-2 tooltip tooltip-bottom text-white hover:bg-white/10"
                    data-tip="Favourites"
                  >
                    <Link to="/dashboard/favourites" className="indicator group">
                      <FaHeart
                        size={24}
                        className="text-red-500 transition-transform duration-300 ease-spring hover:scale-125 active:scale-90 drop-shadow-sm group-hover:animate-pulse"
                      />
                      {favourites.length > 0 && (
                        <span className="badge badge-sm badge-error indicator-item text-white border-none shadow-sm">
                          {favourites.length}
                        </span>
                      )}
                    </Link>
                  </div>
                  {rule == "admin" && (
                    <Link
                      to={"/dashboard"}
                      className="hidden md:flex btn btn-sm bg-white/10 hover:bg-white/15 text-white rounded-full items-center gap-2 px-5 border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-300 hover:border-orange-500/50 group"
                    >
                      <FiLayout className="group-hover:rotate-12 transition-transform duration-300" />
                      <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent font-semibold">Dashboard</span>
                    </Link>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar border border-white/20"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="User"
                        src={user?.photoURL || "/placeholder.svg"}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-black/90 backdrop-blur-md rounded-2xl z-50 mt-3 w-56 p-2 shadow-xl border border-white/20 text-gray-200"
                  >
                    <li>
                      <Link to={'/profile'} className="flex items-center gap-2 py-3 font-medium hover:bg-white/10 hover:text-white">
                        <FiUser className="text-lg" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="flex items-center gap-2 py-3 font-medium hover:bg-white/10 hover:text-white">
                        <FiSettings className="text-lg" /> Settings
                      </Link>
                    </li>
                    {rule == "admin" && (
                      <li>
                        <Link
                          to={"/dashboard"}
                          className="md:hidden flex items-center gap-2 py-3 font-medium hover:bg-orange-500/10 text-orange-400 hover:text-orange-300"
                        >
                          <FiLayout className="text-lg" /> Dashboard
                        </Link>
                      </li>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left py-3 font-medium text-red-500 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <FiLogOut className="text-lg" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-semibold text-gray-200 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-200 hover:bg-white/15 transition-all"
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown - iOS Style */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-3 pb-4 pt-2">
            {/* Navigation Links - Glass Card */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden mb-3">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`flex items-center justify-between px-4 py-3.5 text-gray-200 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98] ${index !== navLinks.length - 1 ? "border-b border-white/5" : ""
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Icon size={16} className="text-orange-400" />
                      </div>
                      <span className="font-medium">{link.name}</span>
                    </div>
                    <FiChevronRight size={16} className="text-gray-500" />
                  </Link>
                );
              })}
            </div>

            {/* User Section or Auth Buttons */}
            {user?.email ? (
              <>
                {/* User Info Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/50">
                      <img
                        src={user?.photoURL || "/placeholder.svg"}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{user?.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    {rule === "admin" && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden mb-3">
                  <Link
                    to="/profile"
                    className="flex items-center justify-between px-4 py-3.5 text-gray-200 hover:bg-white/10 border-b border-white/5"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <FiUser size={16} className="text-blue-400" />
                      </div>
                      <span className="font-medium">Profile</span>
                    </div>
                    <FiChevronRight size={16} className="text-gray-500" />
                  </Link>

                  <Link
                    to="/dashboard/favourites"
                    className="flex items-center justify-between px-4 py-3.5 text-gray-200 hover:bg-white/10 border-b border-white/5"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <FaHeart size={14} className="text-red-400" />
                      </div>
                      <span className="font-medium">Favourites</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {favourites.length > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-red-500/20 text-red-400 rounded-full">
                          {favourites.length}
                        </span>
                      )}
                      <FiChevronRight size={16} className="text-gray-500" />
                    </div>
                  </Link>

                  {rule === "admin" && (
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-between px-4 py-3.5 text-gray-200 hover:bg-white/10 border-b border-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                          <FiLayout size={16} className="text-orange-400" />
                        </div>
                        <span className="font-medium text-orange-400">Dashboard</span>
                      </div>
                      <FiChevronRight size={16} className="text-gray-500" />
                    </Link>
                  )}

                  <Link
                    to="/settings"
                    className="flex items-center justify-between px-4 py-3.5 text-gray-200 hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                        <FiSettings size={16} className="text-gray-400" />
                      </div>
                      <span className="font-medium">Settings</span>
                    </div>
                    <FiChevronRight size={16} className="text-gray-500" />
                  </Link>
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold rounded-2xl hover:bg-red-500/20 transition-all active:scale-[0.98]"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              /* Auth Buttons for Non-logged in users */
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="flex justify-center items-center py-3.5 w-full text-center font-semibold text-white bg-white/10 border border-white/10 hover:bg-white/15 rounded-2xl transition-all active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="flex justify-center items-center py-3.5 w-full text-center bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
