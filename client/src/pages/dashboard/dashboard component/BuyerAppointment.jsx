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
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This appointment will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1a1a1a",
      color: "#fff",
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
              background: "#1a1a1a",
              color: "#fff",
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
    <div className="min-h-screen bg-[#050505] px-4 py-8">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          My <span className="text-orange-500">Appointments</span>
        </h2>

        {buyerAppointments.length === 0 ? (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-8 text-center">
            <p className="text-gray-400">No appointments booked yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {buyerAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden hover:bg-white/[0.07] transition-all duration-300"
              >
                {/* Property Image */}
                <div className="relative h-40">
                  <img
                    src={appointment.propertyImage}
                    alt={appointment.propertyName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(appointment.status)}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {appointment.propertyName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {appointment.propertyStatus}
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-orange-500 text-xs" />
                      {appointment.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-orange-500 text-xs" />
                      {appointment.time}
                    </span>
                  </div>

                  {/* Agent Info */}
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <FaEnvelope className="text-orange-500 text-xs" />
                    <span className="truncate">{appointment.agentEmail}</span>
                  </div>

                  {/* Messages Container */}
                  <div className="space-y-2">
                    {/* Buyer Message */}
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
                      <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1">Your Message</p>
                      <p className="text-xs text-gray-300 line-clamp-2">
                        {appointment.buyerMessage || "No message provided"}
                      </p>
                    </div>

                    {/* Agent Reply */}
                    <div className="bg-orange-500/10 border border-orange-500/20 p-2.5 rounded-lg">
                      <p className="text-[10px] font-medium text-orange-400 uppercase tracking-wide mb-1">Agent Response</p>
                      <p className="text-xs text-gray-300 line-clamp-2">
                        {appointment.agentMessage || "No response yet"}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 py-2 rounded-lg text-xs font-medium transition-all"
                    >
                      <FaTrash className="text-[10px]" />
                      Delete
                    </button>

                    {appointment.status === "approved" && (
                      <a
                        href={`mailto:${appointment.agentEmail}`}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 py-2 rounded-lg text-xs font-medium transition-all"
                      >
                        <FaPhoneAlt className="text-[10px]" />
                        Contact
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerAppointment;
