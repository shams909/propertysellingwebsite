import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { usePropertyByEmail } from "../../../hooks/usePropertyByEmail";
import PropertyRow from "./PropertyRow";
import Loading from "../../../component/loading/Loading";

const AppointmentRequest = () => {
  const { user } = useContext(AuthContext);
  const {
    data: sellerProperties = [],
    refetch,
    isLoading,
  } = usePropertyByEmail(user?.email);

  const approvedProperties = sellerProperties.filter(
    (property) => property.isAdminAproved === "approved",
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return Loading();
  }

  return (
    <div className="min-h-screen bg-[#050505] px-4 py-8">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Appointment <span className="text-orange-500">Requests</span>
        </h2>

        {approvedProperties.length === 0 ? (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-8 text-center">
            <p className="text-gray-400">No approved properties found.</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium text-xs uppercase tracking-wide">Property Name</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium text-xs uppercase tracking-wide">Status</th>
                    <th className="text-center px-6 py-4 text-gray-400 font-medium text-xs uppercase tracking-wide">Appointments</th>
                    <th className="text-center px-6 py-4 text-gray-400 font-medium text-xs uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedProperties.map((property) => (
                    <PropertyRow
                      key={property._id}
                      property={property}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequest;
