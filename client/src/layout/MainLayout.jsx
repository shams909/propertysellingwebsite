import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/Navber";
import Footer from "../component/footer/Footer";
import { AuthContext } from "../provider/AuthProvider";

const MainLayout = () => {

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
