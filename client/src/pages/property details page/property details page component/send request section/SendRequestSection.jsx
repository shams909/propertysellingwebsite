import React from "react";
import Swal from 'sweetalert2'
import { BsSend } from "react-icons/bs";
import {
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdDateRange,
  MdAccessTime,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import usePropertyById from "../../../../hooks/usePropertyById";
import { useContext } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";

import { addAppointment } from "../../../../api/appointment.api";

const SendRequestSection = () => {
  const { id } = useParams();
  const { data: property } = usePropertyById(id);
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const appointmentData = {
      propertyId: id,
      agentEmail: property?.agent?.email,
      status: "pending",
      agentMessage: "",
      propertyName : property?.propertyName,
      propertyStatus : property?.propertyStatus,
      propertyImage: property?.thumbnail,
      ...data,
    };

    
    const result = addAppointment(appointmentData);
    result.then((res) => {
      
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your appointment request has been sent!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if(res.data.exists){
        Swal.fire({
          position: "center",
          icon: "info",
          title: "You have already requested an appointment for this property.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });

    // 👉 send to backend here
    // axios.post("/appointments", appointmentData)

    reset();
  };

  return (
    <section className="md:bg-gray-50 py-8 rounded-xl">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* ---- Title ---- */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">
            Contact <span className="text-orange-600">Property Agent</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below or contact the agent directly for any
            inquiries about the property.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-10">
          {/* ---- Agent Info ---- */}
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              {property?.agent?.name}
            </h3>
            <p className="text-gray-500">Senior Real Estate Agent</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <FaEnvelope className="text-orange-600" />
                <span>{property?.agent?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaPhone className="text-orange-600" />
                <span>{property?.agent?.phone}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <FaFacebookF className="text-white bg-blue-600 p-2 rounded-full" />
              <FaTwitter className="text-white bg-blue-400 p-2 rounded-full" />
              <FaLinkedinIn className="text-white bg-blue-700 p-2 rounded-full" />
              <FaWhatsapp className="text-white bg-green-500 p-2 rounded-full" />
            </div>

            <button className="w-full bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center gap-2">
              <IoChatbubbleEllipsesOutline size={20} />
              Chat with Agent
            </button>
          </div>

          {/* ---- Appointment Form ---- */}
          <div className="bg-white md:p-8 md:rounded-xl md:shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Book an Appointment
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 font-medium">
                  <MdPerson className="text-orange-600" /> Name
                </label>
                <input
                  value={user?.displayName}
                  readOnly
                  {...register("buyerName", { required: "Name is required" })}
                  className="w-full mt-1 p-3 border rounded-lg"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 font-medium">
                  <MdEmail className="text-orange-600" /> Email
                </label>
                <input
                  value={user?.email}
                  readOnly
                  type="email"
                  {...register("buyerEmail", { required: "Email is required" })}
                  className="w-full mt-1 p-3 border rounded-lg"
                  placeholder="Your Email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 font-medium">
                  <MdPhone className="text-orange-600" /> Phone
                </label>
                <input
                  {...register("buyerPhone", { required: "Phone is required" })}
                  className="w-full mt-1 p-3 border rounded-lg"
                  placeholder="Your Phone"
                />
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-2 font-medium">
                  <MdDateRange className="text-orange-600" /> Appointment Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              {/* Time */}
              <div>
                <label className="flex items-center gap-2 font-medium">
                  <MdAccessTime className="text-orange-600" /> Appointment Time
                </label>
                <input
                  type="time"
                  {...register("time", { required: true })}
                  className="w-full mt-1 p-3 border rounded-lg"
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-medium">Additional Request</label>
                <textarea
                  {...register("buyerMessage")}
                  rows={4}
                  className="w-full mt-1 p-3 border rounded-lg resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <BsSend />
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendRequestSection;
