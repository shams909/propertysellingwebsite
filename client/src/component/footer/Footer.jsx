import React from "react";
import logo from "../../assets/logo.png";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-[#050505] text-gray-400 border-t border-white/5 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Section */}
      <footer className="container mx-auto flex flex-col md:flex-row justify-between py-16 px-6 md:px-10 gap-10 relative z-10">
        {/* Services */}
        <div>
          <h6 className="text-xl font-bold mb-6 text-white tracking-wide">Services</h6>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Branding
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Marketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Advertisement
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="text-xl font-bold mb-6 text-white tracking-wide">Company</h6>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Press kit
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="text-xl font-bold mb-6 text-white tracking-wide">Legal</h6>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Terms of use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors duration-300 block hover:translate-x-1 transform">
                Cookie policy
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* Bottom Section */}
      <footer className="bg-[#020202] border-t border-white/5 relative z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-8 px-6 md:px-10 gap-4">
          {/* Logo / Company Info */}
          <div className="flex items-center gap-4">
            <img src={logo} className="w-32 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" alt="Logo" />
            <p className="text-gray-600 text-sm border-l border-white/10 pl-4">
              Providing reliable tech since 1992
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <div className="bg-white/5 text-gray-400 rounded-full p-3 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer border border-white/5 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20">
              <FaFacebook size={18} />
            </div>
            <div className="bg-white/5 text-gray-400 rounded-full p-3 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer border border-white/5 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20">
              <FaInstagram size={18} />
            </div>
            <div className="bg-white/5 text-gray-400 rounded-full p-3 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300 cursor-pointer border border-white/5 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20">
              <FaLinkedin size={18} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
