"use client";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../provider/AuthProvider";
import { CiHeart } from "react-icons/ci";
import { MdNotificationsActive } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { FiSettings, FiLogOut, FiUser, FiLayout } from "react-icons/fi";
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

  // Filter out false values if user doesn't exist
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Property", href: "/all-property" },
    { name: "Agency", href: "/all-agency" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
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
      <nav className="max-w-7xl mx-auto bg-black/80 backdrop-blur-md border border-white/10 shadow-xl rounded-full pointer-events-auto transition-all duration-300">
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
                <div className="flex gap-1 items-center">
                  <div
                    role="button"
                    className="btn btn-ghost btn-circle btn-sm tooltip tooltip-bottom text-white hover:bg-white/10"
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
                      className="hidden md:flex btn btn-sm bg-orange-600 hover:bg-orange-700 text-white rounded-full items-center gap-2 px-4 shadow-md border-none"
                    >
                      <FiLayout /> Dashboard
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
                      <li  >
                        <Link
                          to={"/dashboard"}
                          className="md:hidden flex items-center gap-2 py-3 font-medium hover:bg-white/10 hover:text-white"
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
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-200 hover:bg-white/10 transition-colors"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
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

        {/* Mobile Navigation Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-4 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-4 py-3 text-base font-medium text-gray-200 hover:bg-white/10 hover:text-white rounded-xl transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            {!user?.email && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login"
                  className="flex justify-center items-center px-4 py-3 text-center font-semibold text-white border border-white/20 hover:bg-white/10 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="flex justify-center items-center px-4 py-3 text-center bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
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
