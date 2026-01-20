import React, { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { usePropertyByEmail } from "../../../hooks/usePropertyByEmail";
import { Link } from "react-router-dom";
import PropertyDetailsModal from "../../../component/propert details modal/PropertyDetailsModal";
import Swal from "sweetalert2";
import { deleteProperty } from "../../../api/properties.api";
import Loading from "../../../component/loading/Loading";

const PropertyTable = ({ title, data, statusColor, onDelete }) => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-3">
        {title} ({data.length})
      </h3>

      {data.length === 0 ? (
        <p className="text-gray-500">No properties found</p>
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
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((property, index) => (
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
                    <span className="badge badge-info badge-outline">
                      {property.propertyType}
                    </span>
                  </td>
                  <td>
                    {property.location?.city}, {property.location?.area}
                  </td>
                  <td className="font-semibold">$ {property.price}</td>
                  <td>
                    <span className={`badge ${statusColor}`}>
                      {property.isAdminAproved}
                    </span>
                  </td>
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
                        onClick={() => onDelete(property._id)}
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
      <p className="text-center text-error mt-10">Failed to load properties</p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">
        My Properties ({properties.length})
      </h2>

      <PropertyTable
        title="Approved Properties"
        data={approvedProperties}
        statusColor="badge-success"
        onDelete={handleDelete}
      />

      <PropertyTable
        title="Pending Properties"
        data={pendingProperties}
        statusColor="badge-warning"
        onDelete={handleDelete}
      />

      <PropertyTable
        title="Rejected Properties"
        data={rejectedProperties}
        statusColor="badge-error"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SellerManageProperty;
