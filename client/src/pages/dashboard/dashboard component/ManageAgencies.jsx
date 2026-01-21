import React, { useEffect } from "react";
import useAgencies from "../../../hooks/useAgencies";
import usePropertyCountByAgency from "../../../hooks/usePropertyCountByAgency";
import axiosSecure from "../../../axios/axiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../../component/loading/Loading";
import { FiEye, FiTrash2 } from "react-icons/fi";

// Separate component for each agency row
const AgencyRow = ({ agency, index, onDelete }) => {
  const { data: count = 0 } = usePropertyCountByAgency(agency._id);

  return (
    <tr className="border-t border-white/5 hover:bg-white/5 transition-all">
      <td className="text-gray-400">{index + 1}</td>
      <td>
        <div className="avatar">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
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
      <td className="font-semibold text-white">{agency.agencyName}</td>
      <td className="text-gray-400">{agency.email}</td>
      <td className="text-gray-400">{agency.location}</td>
      <td>
        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-md">
          {count}
        </span>
      </td>
      <td>
        <div className="flex gap-2 justify-center">
          <Link
            to={`/all-agency/${agency._id}`}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 hover:scale-110 transition-all backdrop-blur-md"
            title="View Agency"
          >
            <FiEye size={16} />
          </Link>
          <button
            onClick={() => onDelete(agency._id, agency.agencyName)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:scale-110 transition-all backdrop-blur-md"
            title="Delete Agency"
          >
            <FiTrash2 size={16} />
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
  }, [])

  const handleDeleteAgency = (agencyId, agencyName) => {
    Swal.fire({
      title: "Delete Agency?",
      text: `Delete agency "${agencyName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "rgba(20, 20, 20, 0.95)",
      color: "#fff",
      backdrop: "rgba(0, 0, 0, 0.8)",
      customClass: {
        popup: 'swal-glass-popup',
        title: 'swal-glass-title',
        htmlContainer: 'swal-glass-text',
        confirmButton: 'swal-glass-button',
        cancelButton: 'swal-glass-button',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/agencies/${agencyId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Agency deleted successfully.",
                icon: "success",
                background: "rgba(20, 20, 20, 0.95)",
                color: "#fff",
                iconColor: "#22c55e",
                timer: 1500,
                showConfirmButton: false,
                customClass: { popup: 'swal-glass-popup' }
              });
              refetch();
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.response?.data?.message || "Failed to delete agency",
              icon: "error",
              background: "rgba(20, 20, 20, 0.95)",
              color: "#fff",
              customClass: { popup: 'swal-glass-popup' }
            });
          });
      }
    });
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage Agencies</h2>
          <p className="text-gray-500 text-sm">Showing <span className="text-orange-500 font-bold">{agencies.length}</span> agencies</p>
        </div>

        {agencies.length === 0 ? (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
            <p className="text-gray-500">No agencies found</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl">
            <table className="table">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">SL</th>
                  <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Photo</th>
                  <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Agency Name</th>
                  <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Email</th>
                  <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Location</th>
                  <th className="text-gray-400 text-xs uppercase tracking-wide font-medium text-center">Properties</th>
                  <th className="text-gray-400 text-xs uppercase tracking-wide font-medium text-center">Action</th>
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
    </div>
  );
};

export default ManageAgencies;
