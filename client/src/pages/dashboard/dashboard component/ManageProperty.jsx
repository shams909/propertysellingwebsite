import React, { useEffect, useState } from "react";
import useProperties from "../../../hooks/useProperties";
import { Link } from "react-router-dom";
import { deleteProperty } from "../../../api/properties.api";
import Swal from "sweetalert2";
import PropertyDetailsModal from "../../../component/propert details modal/PropertyDetailsModal";
import Loading from "../../../component/loading/Loading";

const ITEMS_PER_PAGE = 5;

const ManageProperty = () => {
  const { data: allProperties = [], isLoading, refetch } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allProperties.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = allProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

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

  if (isLoading) {
    return Loading();
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        All Properties ({allProperties.length})
      </h2>

      {/* Table */}
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
                <td>{property.location.city}</td>
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
            onClick={() => setCurrentPage(currentPage - 1)}
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
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageProperty;
