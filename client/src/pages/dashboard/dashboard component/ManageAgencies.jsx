import React, { useEffect } from "react";
import useAgencies from "../../../hooks/useAgencies";
import usePropertyCountByAgency from "../../../hooks/usePropertyCountByAgency";
import axiosSecure from "../../../axios/axiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../../component/loading/Loading";

// Separate component for each agency row
const AgencyRow = ({ agency, index, onDelete }) => {
  const { data: count = 0 } = usePropertyCountByAgency(agency._id);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img
              src={
                agency.logoUrl ||
                agency.logo ||
                "https://via.placeholder.com/48?text=No+Image"
              }
              alt={agency.agencyName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </td>
      <td className="font-semibold">{agency.agencyName}</td>
      <td>{agency.email}</td>
      <td>{agency.location}</td>
      <td className="font-bold text-blue-600 text-center">{count}</td>
      <td>
        <div className="flex gap-2 justify-center">
          <Link
            to={`/all-agency/${agency._id}`}
            className="btn btn-xs btn-info"
          >
            View
          </Link>
          <button
            onClick={() => onDelete(agency._id, agency.agencyName)}
            className="btn btn-xs btn-error"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const ManageAgencies = () => {
  const { data: agencies = [], refetch, isLoading } = useAgencies();
useEffect(() => {
  window.scrollTo(0, 0);
},[])

  const handleDeleteAgency = (agencyId, agencyName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete agency "${agencyName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/agencies/${agencyId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Agency deleted successfully.", "success");
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              error.response?.data?.message || "Failed to delete agency",
              "error",
            );
          });
      }
    });
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">
        Manage Agencies ({agencies.length})
      </h2>

      {agencies.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No agencies found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>SL</th>
                <th>Photo</th>
                <th>Agency Name</th>
                <th>Email</th>
                <th>Location</th>
                <th className="text-center">Properties</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency, index) => (
                <AgencyRow
                  key={agency._id}
                  agency={agency}
                  index={index}
                  onDelete={handleDeleteAgency}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAgencies;
