import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { data: isAdmin = {}, isLoading: adminLoading } = useAdmin(user?.email);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading state - check both auth and admin status
  if (loading || adminLoading) {
    return (
      <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-xl text-orange-500"></span>
        <p className="mt-4 text-sm text-gray-500">Checking admin access...</p>
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Logged in but not admin - redirect to home
  if (!isAdmin?.admin) {
    return <Navigate to="/" replace />;
  }

  // Admin user - allow access
  return children;
};

export default AdminRoute;
