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
      return Swal.fire("Status required", "Please select a status", "warning");
    }

    Swal.fire({
      title: "Confirm Update",
      text: "This will update the appointment status and notify the buyer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update",
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h2 className="text-3xl font-bold">
        Appointment <span className="text-orange-600">Candidates</span>
      </h2>

      {candidates.length === 0 ? (
        <p className="text-gray-500">No appointment requests found.</p>
      ) : (
        candidates.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md p-6 space-y-4"
          >
            {/* Buyer & Appointment Info */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <p className="text-lg font-semibold">{item.buyerName}</p>
                <p className="text-sm text-gray-500">{item.buyerEmail}</p>
                <p className="text-sm text-gray-500">{item.buyerPhone}</p>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Date:</span> {item.date}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {item.time}
                </p>
                <p>
                  <span className="font-medium">Current Status:</span>{" "}
                  <span className="capitalize">{item.status}</span>
                </p>
              </div>
            </div>

            <hr />

            {/* Buyer Message */}
            <div>
              <p className="font-medium text-gray-700 mb-1">Buyer Message</p>
              <p className="text-gray-600 whitespace-pre-wrap">
                {item.buyerMessage || "No message provided"}
              </p>
            </div>

            <hr />

            {/* Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-1">
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
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Agent Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message to Buyer
                </label>
                <textarea
                  rows={4}
                  placeholder="Write a clear message for the buyer..."
                  defaultValue={item.agentMessage}
                  onChange={(e) =>
                    setMessages({
                      ...messages,
                      [item._id]: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3 resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleUpdate(item._id)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Update Appointment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AppointmentCandidates;
