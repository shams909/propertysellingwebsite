import React, { useEffect, useState } from "react";
import useAllProperties from "../../../hooks/useAllProperties";
import {
  approveProperty,
  deleteProperty,
  pendingProperty,
  rejectProperty,
} from "../../../api/properties.api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import PropertyDetailsModal from "../../../component/propert details modal/PropertyDetailsModal";
import Loading from "../../../component/loading/Loading";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const ITEMS_PER_PAGE = 5;

const PropertyRequest = () => {
  const { data: allProperties = [], isLoading, refetch } = useAllProperties();

  const approvedProperties = allProperties.filter(
    (property) => property.isAdminAproved === "approved",
  );

  const pendingProperties = allProperties.filter(
    (property) => property.isAdminAproved === "pending",
  );
  const rejectedProperties = allProperties.filter(
    (property) => property.isAdminAproved === "rejected",
  );

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(approvedProperties.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = approvedProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1);
  }, [approvedProperties.length]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Property?",
      text: "This property will be permanently deleted!",
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
        deleteProperty(id).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Property deleted successfully.",
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
        });
      }
    });
  };

  const handleStatusChange = (id, status) => {
    if (status === "approved") {
      approveProperty(id).then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Property approved successfully");
          refetch();
        }
      });
    } else if (status === "rejected") {
      rejectProperty(id).then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Property rejected successfully");
          refetch();
        }
      });
    } else if (status === "pending") {
      pendingProperty(id).then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Property marked as pending");
          refetch();
        }
      });
    }
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* ================= APPROVED TABLE ================= */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Approved Properties</h2>
            <p className="text-gray-500 text-sm">Showing <span className="text-green-400 font-bold">{approvedProperties.length}</span> approved</p>
          </div>

          {approvedProperties.length === 0 ? (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
              <p className="text-gray-500">No approved properties found.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl">
                <table className="table">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">SL</th>
                      <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Photo</th>
                      <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Property Name</th>
                      <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Type</th>
                      <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Location</th>
                      <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Price</th>
                      <th className="text-gray-400 text-xs uppercase tracking-wide font-medium text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.map((property, index) => (
                      <tr key={property._id} className="border-t border-white/5 hover:bg-white/5 transition-all">
                        <td className="text-gray-400">{startIndex + index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                              <img
                                src={
                                  property.thumbnail ||
                                  property.propertyImage ||
                                  "https://via.placeholder.com/48?text=No+Image"
                                }
                                alt={property.propertyName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="font-medium text-white">{property.propertyName}</td>
                        <td>
                          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md">
                            {property.propertyType}
                          </span>
                        </td>
                        <td className="text-gray-400">{property.location?.city}</td>
                        <td className="font-semibold text-orange-400">$ {property.price}</td>
                        <td>
                          <div className="flex gap-2 justify-center">
                            <button
                              className="w-9 h-9 rounded-full flex items-center justify-center bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:scale-110 transition-all backdrop-blur-md"
                              onClick={() =>
                                document.getElementById(`modal_${property._id}`).showModal()
                              }
                              title="View Details"
                            >
                              <FiEye size={16} />
                            </button>

                            <dialog
                              id={`modal_${property._id}`}
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="modal-box">
                                <PropertyDetailsModal id={property._id} />
                                <div className="modal-action">
                                  <form method="dialog">
                                    <button className="btn rounded-full">Close</button>
                                  </form>
                                </div>
                              </div>
                            </dialog>

                            <Link
                              to={`/dashboard/updateProperty/${property._id}`}
                              className="w-9 h-9 rounded-full flex items-center justify-center bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 hover:scale-110 transition-all backdrop-blur-md"
                              title="Edit Property"
                            >
                              <FiEdit2 size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(property._id)}
                              className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:scale-110 transition-all backdrop-blur-md"
                              title="Delete Property"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white border border-white/10 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-md"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    ← Prev
                  </button>

                  <div className="flex gap-1">
                    {[...Array(totalPages).keys()].map((page) => (
                      <button
                        key={page}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-all backdrop-blur-md ${currentPage === page + 1
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "bg-white/10 text-gray-400 border border-white/10 hover:bg-white/15 hover:text-white"
                          }`}
                        onClick={() => setCurrentPage(page + 1)}
                      >
                        {page + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white border border-white/10 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all backdrop-blur-md"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ================= PENDING TABLE ================= */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Properties Request</h2>
            <p className="text-gray-500 text-sm">Showing <span className="text-yellow-400 font-bold">{pendingProperties.length}</span> pending</p>
          </div>

          {pendingProperties.length === 0 ? (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
              <p className="text-gray-500">No pending properties.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl">
              <table className="table">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">SL</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Photo</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Property Name</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Type</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Location</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Price</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Action</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {pendingProperties.map((property, index) => (
                    <tr key={property._id} className="border-t border-white/5 hover:bg-white/5 transition-all">
                      <td className="text-gray-400">{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                            <img
                              src={
                                property.thumbnail ||
                                property.propertyImage ||
                                "https://via.placeholder.com/48?text=No+Image"
                              }
                              alt={property.propertyName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-white">{property.propertyName}</td>
                      <td>
                        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 backdrop-blur-md">
                          {property.propertyType}
                        </span>
                      </td>
                      <td className="text-gray-400">{property.location?.city}</td>
                      <td className="font-semibold text-orange-400">$ {property.price}</td>
                      <td>
                        <button
                          className="w-9 h-9 rounded-full flex items-center justify-center bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:scale-110 transition-all backdrop-blur-md"
                          onClick={() =>
                            document.getElementById(`modal_pending_${property._id}`).showModal()
                          }
                          title="View Details"
                        >
                          <FiEye size={16} />
                        </button>

                        <dialog
                          id={`modal_pending_${property._id}`}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <PropertyDetailsModal id={property._id} />
                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn rounded-full">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </td>
                      <td className="text-center">
                        <select
                          className="select select-sm bg-white/10 border-white/10 text-white rounded-xl focus:border-orange-500/50"
                          defaultValue="select status"
                          onChange={(e) =>
                            handleStatusChange(property._id, e.target.value)
                          }
                        >
                          <option disabled>select status</option>
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= REJECTED TABLE ================= */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Rejected Properties</h2>
            <p className="text-gray-500 text-sm">Showing <span className="text-red-400 font-bold">{rejectedProperties.length}</span> rejected</p>
          </div>

          {rejectedProperties.length === 0 ? (
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
              <p className="text-gray-500">No rejected properties.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl">
              <table className="table">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">SL</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Photo</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Property Name</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Type</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Location</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Price</th>
                    <th className="text-gray-400 text-xs uppercase tracking-wide font-medium text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {rejectedProperties.map((property, index) => (
                    <tr key={property._id} className="border-t border-white/5 hover:bg-white/5 transition-all">
                      <td className="text-gray-400">{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                            <img
                              src={
                                property.thumbnail ||
                                property.propertyImage ||
                                "https://via.placeholder.com/48?text=No+Image"
                              }
                              alt={property.propertyName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-white">{property.propertyName}</td>
                      <td>
                        <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-md">
                          {property.propertyType}
                        </span>
                      </td>
                      <td className="text-gray-400">{property.location?.city}</td>
                      <td className="font-semibold text-orange-400">$ {property.price}</td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:scale-110 transition-all backdrop-blur-md"
                          title="Delete Property"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyRequest;
