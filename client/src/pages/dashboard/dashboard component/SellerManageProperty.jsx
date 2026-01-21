import React, { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { usePropertyByEmail } from "../../../hooks/usePropertyByEmail";
import { Link } from "react-router-dom";
import PropertyDetailsModal from "../../../component/propert details modal/PropertyDetailsModal";
import Swal from "sweetalert2";
import { deleteProperty } from "../../../api/properties.api";
import Loading from "../../../component/loading/Loading";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const PropertyTable = ({ title, data, statusColor, titleColor, onDelete }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-white mb-3">
        {title} <span className={titleColor}>({data.length})</span>
      </h3>

      {data.length === 0 ? (
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 text-center">
          <p className="text-gray-500">No properties found</p>
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
                <th className="text-gray-400 text-xs uppercase tracking-wide font-medium">Status</th>
                <th className="text-gray-400 text-xs uppercase tracking-wide font-medium text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((property, index) => (
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
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-md">
                      {property.propertyType}
                    </span>
                  </td>
                  <td className="text-gray-400">
                    {property.location?.city}, {property.location?.area}
                  </td>
                  <td className="font-semibold text-orange-400">$ {property.price}</td>
                  <td>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${statusColor}`}>
                      {property.isAdminAproved}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      {/* Details Button */}
                      <button
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:scale-110 transition-all backdrop-blur-md"
                        onClick={() =>
                          document
                            .getElementById(`modal_${property._id}`)
                            .showModal()
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

                      {/* Update Button */}
                      <Link
                        to={`/dashboard/updateProperty/${property._id}`}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 hover:scale-110 transition-all backdrop-blur-md"
                        title="Edit Property"
                      >
                        <FiEdit2 size={16} />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDelete(property._id)}
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
      )}
    </div>
  );
};

const SellerManageProperty = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const {
    data: properties = [],
    isLoading,
    refetch,
    isError,
  } = usePropertyByEmail(email, { enabled: !!email });

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

  const approvedProperties = properties.filter(
    (p) => p.isAdminAproved === "approved",
  );
  const pendingProperties = properties.filter(
    (p) => p.isAdminAproved === "pending",
  );
  const rejectedProperties = properties.filter(
    (p) => p.isAdminAproved === "rejected",
  );

  if (isLoading) {
    return Loading();
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#050505] p-6 flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500/30 backdrop-blur-xl rounded-2xl p-8 text-center">
          <p className="text-red-400">Failed to load properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            My <span className="text-orange-500">Properties</span>
          </h2>
          <p className="text-gray-500 text-sm">
            Total <span className="text-orange-500 font-bold">{properties.length}</span> properties
          </p>
        </div>

        <PropertyTable
          title="Approved Properties"
          titleColor="text-green-400"
          data={approvedProperties}
          statusColor="bg-green-500/20 text-green-400 border border-green-500/30"
          onDelete={handleDelete}
        />

        <PropertyTable
          title="Pending Properties"
          titleColor="text-yellow-400"
          data={pendingProperties}
          statusColor="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
          onDelete={handleDelete}
        />

        <PropertyTable
          title="Rejected Properties"
          titleColor="text-red-400"
          data={rejectedProperties}
          statusColor="bg-red-500/20 text-red-400 border border-red-500/30"
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default SellerManageProperty;
