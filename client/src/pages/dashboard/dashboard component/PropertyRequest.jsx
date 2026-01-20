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
      title: "Are you sure?",
      text: "This property will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProperty(id).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Property deleted successfully.", "success");
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
    <div className="p-4 space-y-12">
      {/* ================= APPROVED TABLE ================= */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Approved Properties ({approvedProperties.length})
        </h2>

        {approvedProperties.length === 0 ? (
          <p className="text-center text-gray-500">
            No approved properties found.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="table table-zebra">
                <thead className="bg-base-200">
                  <tr>
                    <th>SL</th>
                    <th>Photo</th>
                    <th>Property Name</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.map((property, index) => (
                    <tr key={property._id}>
                      <td>{startIndex + index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
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
                      <td className="font-medium">{property.propertyName}</td>
                      <td>
                        <span className="badge badge-info badge-soft">
                          {property.propertyType}
                        </span>
                      </td>
                      <td>{property.location?.city}</td>
                      <td className="font-semibold">$ {property.price}</td>
                      <td>
                        <div className="flex gap-2 justify-center">
                          {/* Open the modal using document.getElementById('ID').showModal() method */}
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() =>
                              document
                                .getElementById(`modal_${property._id}`)
                                .showModal()
                            }
                          >
                            Details
                          </button>

                          <dialog
                            id={`modal_${property._id}`}
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <PropertyDetailsModal id={property._id} />
                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="btn">Close</button>
                                </form>
                              </div>
                            </div>
                          </dialog>

                          <Link
                            to={`/dashboard/updateProperty/${property._id}`}
                            className="btn btn-xs btn-warning"
                          >
                            Update
                          </Link>
                          <button
                            onClick={() => handleDelete(property._id)}
                            className="btn btn-xs btn-error"
                          >
                            Delete
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
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  «
                </button>

                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page}
                    className={`join-item btn btn-sm ${
                      currentPage === page + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => setCurrentPage(page + 1)}
                  >
                    {page + 1}
                  </button>
                ))}

                <button
                  className="join-item btn btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  »
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ================= PENDING TABLE ================= */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Properties Request ({pendingProperties.length})
        </h2>

        {pendingProperties.length === 0 ? (
          <p className="text-center text-gray-500">No pending properties.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th>SL</th>
                  <th>Photo</th>
                  <th>Property Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Action</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {pendingProperties.map((property, index) => (
                  <tr key={property._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
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
                    <td className="font-medium">{property.propertyName}</td>
                    <td>
                      <span className="badge badge-warning badge-soft">
                        {property.propertyType}
                      </span>
                    </td>
                    <td>{property.location?.city}</td>
                    <td className="font-semibold">$ {property.price}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() =>
                          document
                            .getElementById(`modal_${property._id}`)
                            .showModal()
                        }
                      >
                        Details
                      </button>

                      <dialog
                        id={`modal_${property._id}`}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <PropertyDetailsModal id={property._id} />
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                    <td className="text-center">
                      <select
                        className="select select-bordered select-sm"
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
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Rejected Properties ({rejectedProperties.length})
        </h2>

        {rejectedProperties.length === 0 ? (
          <p className="text-center text-gray-500">No pending properties.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th>SL</th>
                  <th>Photo</th>
                  <th>Property Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th className="text-center">action</th>
                </tr>
              </thead>

              <tbody>
                {rejectedProperties.map((property, index) => (
                  <tr key={property._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
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
                    <td className="font-medium">{property.propertyName}</td>
                    <td>
                      <span className="badge badge-warning badge-soft">
                        {property.propertyType}
                      </span>
                    </td>
                    <td>{property.location?.city}</td>
                    <td className="font-semibold">$ {property.price}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
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
  );
};

export default PropertyRequest;
