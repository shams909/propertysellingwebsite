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
      background: "#1a1a1a",
      color: "#fff",
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
              background: "#1a1a1a",
              color: "#fff",
            });
            refetch && refetch();
          }
        });
      }
    });
  };

  return (
    <tr className="border-t border-white/5 hover:bg-white/5 transition-all">
      {/* Property Name */}
      <td className="px-6 py-4 font-medium text-white">{property.propertyName}</td>

      {/* Property Status (Select) */}
      <td className="px-6 py-4">
        <select
          value={property.propertyStatus}
          onChange={handleStatusChange}
          className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:border-orange-500/50 focus:outline-none cursor-pointer"
        >
          <option value="For Sale" className="bg-[#1a1a1a] text-white">For Sale</option>
          <option value="For Rent" className="bg-[#1a1a1a] text-white">For Rent</option>
          <option value="Sold" className="bg-[#1a1a1a] text-white">Sold</option>
        </select>
      </td>

      {/* Appointment Count */}
      <td className="px-6 py-4 text-center">
        {isLoading ? (
          <span className="text-gray-500">Loading...</span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold text-xs">
            {count}
          </span>
        )}
      </td>

      {/* Action */}
      <td className="px-6 py-4 text-center">
        <Link
          to={`/dashboard/property-appointments/${property._id}`}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${count > 0
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30"
              : "bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed"
            }`}
        >
          See Appointments
        </Link>
      </td>
    </tr>
  );
};

export default PropertyRow;
