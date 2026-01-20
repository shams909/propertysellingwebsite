import React from "react";
import logo from "../../assets/logo.png";
import { RiFacebookBoxFill } from "react-icons/ri";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-gray-100 text-gray-700">
      {/* Top Section */}
      <footer className="container mx-auto flex flex-col md:flex-row justify-between py-12 px-6 md:px-10 gap-10">
        {/* Services */}
        <div>
          <h6 className="text-lg font-bold mb-4">Services</h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Branding
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Marketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Advertisement
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="text-lg font-bold mb-4">Company</h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Press kit
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="text-lg font-bold mb-4">Legal</h6>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Terms of use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition">
                Cookie policy
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* Bottom Section */}
      <footer className="bg-gray-200 border-t border-gray-300">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-6 md:px-10 gap-4">
          {/* Logo / Company Info */}
          <div className="flex items-center gap-3">
            <img src={logo} className="w-36" alt="" />
            <p className="text-gray-700 text-sm">
              Providing reliable tech since 1992
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-3">
            <div className="bg-[#FEF0F1] text-red-500 rounded-full p-2 flex items-center justify-center hover:bg-red-50 transition">
              <FaFacebook size={18} />
            </div>
            <div className="bg-[#FEF0F1] text-red-500 rounded-full p-2 flex items-center justify-center hover:bg-red-50 transition">
              <FaInstagram size={18} />
            </div>
            <div className="bg-[#FEF0F1] text-red-500 rounded-full p-2 flex items-center justify-center hover:bg-red-50 transition">
              <FaLinkedin size={18} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
