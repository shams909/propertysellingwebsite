import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAppointmentCandidatesByPropertyId from "../../../hooks/useAppointmentCandidatesByPropertyId";
import Swal from "sweetalert2";
import { updateAppointmentStatus } from "../../../api/appointment.api";
import Loading from "../../../component/loading/Loading";

const AppointmentCandidates = () => {
  const { id: propertyId } = useParams();
  const {
    data: candidates = [],
    isLoading,
    refetch,
  } = useAppointmentCandidatesByPropertyId(propertyId);

  const [messages, setMessages] = useState({});
  const [statuses, setStatuses] = useState({});

  const handleUpdate = (appointmentId) => {
    const updatedStatus = statuses[appointmentId];
    const agentMessage = messages[appointmentId];

    if (!updatedStatus) {
      return Swal.fire({
        title: "Status required",
        text: "Please select a status",
        icon: "warning",
        background: "#1a1a1a",
        color: "#fff",
      });
    }

    Swal.fire({
      title: "Confirm Update",
      text: "This will update the appointment status and notify the buyer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update",
      background: "#1a1a1a",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          status: updatedStatus,
          agentMessage,
        };

        updateAppointmentStatus(appointmentId, payload).then(() => {
          refetch();
        });

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Appointment updated successfully.",
          timer: 1500,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#fff",
        });
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return Loading();
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] px-4 py-8">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Appointment <span className="text-orange-500">Candidates</span>
        </h2>

        {candidates.length === 0 ? (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-8 text-center">
            <p className="text-gray-400">No appointment requests found.</p>
          </div>
        ) : (
          candidates.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-5 space-y-4"
            >
              {/* Buyer & Appointment Info */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{item.buyerName}</p>
                  <p className="text-sm text-gray-400">{item.buyerEmail}</p>
                  <p className="text-sm text-gray-400">{item.buyerPhone}</p>
                </div>

                <div className="text-sm text-gray-400 space-y-1">
                  <p>
                    <span className="text-gray-500">Date:</span> <span className="text-white">{item.date}</span>
                  </p>
                  <p>
                    <span className="text-gray-500">Time:</span> <span className="text-white">{item.time}</span>
                  </p>
                  <p>
                    <span className="text-gray-500">Status:</span>{" "}
                    <span className={`px-2 py-0.5 rounded-full text-xs border capitalize ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* Buyer Message */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide mb-1">Buyer Message</p>
                <p className="text-sm text-gray-300">
                  {item.buyerMessage || "No message provided"}
                </p>
              </div>

              <div className="border-t border-white/10" />

              {/* Actions */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Status */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Update Status
                  </label>
                  <select
                    defaultValue={item.status}
                    onChange={(e) =>
                      setStatuses({
                        ...statuses,
                        [item._id]: e.target.value,
                      })
                    }
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-orange-500/50 focus:outline-none cursor-pointer"
                  >
                    <option value="pending" className="bg-[#1a1a1a] text-white">Pending</option>
                    <option value="approved" className="bg-[#1a1a1a] text-white">Approved</option>
                    <option value="rejected" className="bg-[#1a1a1a] text-white">Rejected</option>
                  </select>
                </div>

                {/* Agent Message */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    Message to Buyer
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write a message for the buyer..."
                    defaultValue={item.agentMessage}
                    onChange={(e) =>
                      setMessages({
                        ...messages,
                        [item._id]: e.target.value,
                      })
                    }
                    className="w-full bg-white/10 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 resize-none focus:border-orange-500/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 px-5 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Update Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentCandidates;
