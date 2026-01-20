import React from "react";
import DashboardSidebar from "../pages/dashboard/dashboard component/DashboardSidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const DashboardLayout = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      

      {/* Main Layout */}
      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-2 bg-amber-200">
          <DashboardSidebar />
        </div>

        {/* Page Content */}
        <div className="np col-span-12 lg:col-span-10  min-h-[calc(100vh-64px)] bg-orange-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
