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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">
        Appointment <span className="text-orange-600">Requests</span>
      </h2>

      {approvedProperties.length === 0 ? (
        <p className="text-gray-500">No approved properties found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-6 py-4">Property Name</th>
                <th className="text-left px-6 py-4">Property Status</th>
                <th className="text-center px-6 py-4">Total Appointments</th>
                <th className="text-center px-6 py-4">Action</th>
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
      )}
    </div>
  );
};

export default AppointmentRequest;
