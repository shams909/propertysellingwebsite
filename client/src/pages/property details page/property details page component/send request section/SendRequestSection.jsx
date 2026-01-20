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
      propertyName: property?.propertyName,
      propertyStatus: property?.propertyStatus,
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
      if (res.data.exists) {
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
    <section className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="space-y-8 relative z-10">
        {/* ---- Title ---- */}
        <div className="space-y-2 text-center pb-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            Contact <span className="text-orange-500">Agent</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Quickly book a viewing or ask a question.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* ---- Agent Info ---- */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-lg space-y-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full border-2 border-orange-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-3xl">👤</div>
              {/* Use real image if available */}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                {property?.agent?.name}
              </h3>
              <p className="text-orange-500 text-sm font-medium">Senior Agent</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-orange-500" />
                <span>{property?.agent?.email}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
                <FaPhone className="text-orange-500" />
                <span>{property?.agent?.phone}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center pt-2">
              <SocialIcon Icon={FaFacebookF} color="bg-[#1877F2]" />
              <SocialIcon Icon={FaTwitter} color="bg-[#1DA1F2]" />
              <SocialIcon Icon={FaLinkedinIn} color="bg-[#0A66C2]" />
              <SocialIcon Icon={FaWhatsapp} color="bg-[#25D366]" />
            </div>

            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold border border-white/10">
              <IoChatbubbleEllipsesOutline size={20} />
              Chat Now
            </button>
          </div>

          {/* ---- Appointment Form ---- */}
          <div className="md:rounded-xl">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <MdDateRange className="text-orange-500" /> Book Viewing
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <InputGroup label="Name" icon={<MdPerson />}>
                <input
                  value={user?.displayName}
                  readOnly
                  {...register("buyerName", { required: "Name is required" })}
                  className="w-full bg-transparent text-white border-none focus:ring-0 p-3"
                  placeholder="Your Name"
                />
              </InputGroup>

              {/* Email */}
              <InputGroup label="Email" icon={<MdEmail />}>
                <input
                  value={user?.email}
                  readOnly
                  type="email"
                  {...register("buyerEmail", { required: "Email is required" })}
                  className="w-full bg-transparent text-white border-none focus:ring-0 p-3"
                  placeholder="Your Email"
                />
              </InputGroup>

              {/* Phone */}
              <InputGroup label="Phone" icon={<MdPhone />}>
                <input
                  {...register("buyerPhone", { required: "Phone is required" })}
                  className="w-full bg-transparent text-white border-none focus:ring-0 p-3 placeholder-gray-600"
                  placeholder="Your Phone"
                />
              </InputGroup>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-2">
                  <label className="text-xs text-gray-500 block px-2">Date</label>
                  <input type="date" {...register("date")} className="w-full bg-transparent text-white text-sm p-1 focus:outline-none scheme-dark" />
                </div>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-2">
                  <label className="text-xs text-gray-500 block px-2">Time</label>
                  <input type="time" {...register("time")} className="w-full bg-transparent text-white text-sm p-1 focus:outline-none scheme-dark" />
                </div>
              </div>

              {/* Message */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl focus-within:border-orange-500/50 transition-colors">
                <textarea
                  {...register("buyerMessage")}
                  rows={3}
                  className="w-full bg-transparent text-white p-3 border-none focus:ring-0 resize-none placeholder-gray-600"
                  placeholder="Any specific requests?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95"
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

const SocialIcon = ({ Icon, color }) => (
  <div className={`${color} p-2 rounded-full cursor-pointer hover:scale-110 transition-transform`}>
    <Icon className="text-white text-sm" />
  </div>
);

const InputGroup = ({ label, icon, children }) => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden focus-within:border-orange-500/50 transition-colors">
    <div className="flex items-center gap-2 px-3 pt-2 text-gray-500 text-xs font-bold uppercase tracking-wider">
      {icon} {label}
    </div>
    {children}
  </div>
);

export default SendRequestSection;
