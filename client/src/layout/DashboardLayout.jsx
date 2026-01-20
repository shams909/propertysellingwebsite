import React from "react";
import DashboardSidebar from "../pages/dashboard/dashboard component/DashboardSidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const DashboardLayout = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Page Content */}
      <div className="flex-1 w-full min-w-0">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
