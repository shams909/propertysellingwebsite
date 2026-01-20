import React, { useContext, useEffect } from "react";
 import Swal from "sweetalert2";

import { AuthContext } from "../../../provider/AuthProvider";
import useAppointmentsByBuyerEmail from "../../../hooks/useAppointmentsByBuyerEmail";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaTrash,
  FaPhoneAlt,
} from "react-icons/fa";
import { deleteAppointmentById } from "../../../api/appointment.api";
import Loading from "../../../component/loading/Loading";

const BuyerAppointment = () => {
  const { user } = useContext(AuthContext);
  const { data: buyerAppointments = [], refetch, isLoading } = useAppointmentsByBuyerEmail(
    user?.email,
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This appointment will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c", // orange
      cancelButtonColor: "#6b7280", // gray
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAppointmentById(id).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your appointment has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">
        My <span className="text-orange-600">Appointments</span>
      </h2>

      {buyerAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {buyerAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Property Image */}
              <img
                src={appointment.propertyImage}
                alt={appointment.propertyName}
                className="h-48 w-full object-cover"
              />

              <div className="p-5 space-y-3">
                {/* Title + Status */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    {appointment.propertyName}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      appointment.status,
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {appointment.propertyStatus}
                </p>

                {/* Date & Time */}
                <div className="flex items-center gap-6 text-gray-600 text-sm">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-orange-600" />
                    {appointment.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock className="text-orange-600" />
                    {appointment.time}
                  </span>
                </div>

                {/* Agent Info */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaEnvelope className="text-orange-600" />
                  {appointment.agentEmail}
                </div>

                {/* Buyer Message */}
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-gray-700">Your Message</p>
                  <p className="text-gray-600">
                    {appointment.buyerMessage || "No message provided"}
                  </p>
                </div>

                {/* Agent Reply */}
                <div className="bg-orange-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-orange-700">Agent Response</p>
                  <p className="text-gray-700">
                    {appointment.agentMessage || "No response yet"}
                  </p>
                </div>

                {/* ---- ACTION BUTTONS ---- */}
                <div className="flex gap-3 pt-3">
                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(appointment._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 py-2 rounded-lg text-sm font-medium"
                  >
                    <FaTrash />
                    Delete
                  </button>

                  {/* Contact Agent (only if approved) */}
                  {appointment.status === "approved" && (
                    <a
                      href={`mailto:${appointment.agentEmail}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 py-2 rounded-lg text-sm font-medium"
                    >
                      <FaPhoneAlt />
                      Contact Agent
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerAppointment;
