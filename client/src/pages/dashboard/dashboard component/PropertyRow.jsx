import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { usePropertyCountByPropertyId } from "../../../hooks/usePropertyCountByPropertyId";
import { changePropertyStatus } from "../../../api/properties.api";

const PropertyRow = ({ property, refetch }) => {
  const { data: count = 0, isLoading } = usePropertyCountByPropertyId(property._id);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;

    Swal.fire({
      title: "Confirm Status Change",
      text: `Are you sure you want to mark this property as "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        changePropertyStatus(property._id, { status: newStatus }).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Updated!",
              text: "Property status updated successfully.",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch && refetch();
          }
        });
      }
    });
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      {/* Property Name */}
      <td className="px-6 py-4 font-medium">{property.propertyName}</td>

      {/* Property Status (Select) */}
      <td className="px-6 py-4">
        <select
          value={property.propertyStatus}
          onChange={handleStatusChange}
          className="border rounded-lg px-3 py-1 text-sm"
        >
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
          <option value="Sold">Sold</option>
        </select>
      </td>

      {/* Appointment Count */}
      <td className="px-6 py-4 text-center">
        {isLoading ? (
          <span className="text-gray-400">Loading...</span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
            {count}
          </span>
        )}
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-center">
        <Link
          to={`/dashboard/property-appointments/${property._id}`}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            count > 0
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          See Appointments
        </Link>
      </td>
    </tr>
  );
};

export default PropertyRow;
