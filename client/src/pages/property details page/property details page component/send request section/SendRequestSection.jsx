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
                    title: "Request Sent!",
                    text: "The agent will review your request soon.",
                    showConfirmButton: false,
                    timer: 2500,
                    background: "rgba(20, 20, 20, 0.95)",
                    color: "#fff",
                    iconColor: "#22c55e",
                    backdrop: "rgba(0, 0, 0, 0.8)",
                    customClass: {
                        popup: 'swal-glass-popup',
                        title: 'swal-glass-title',
                        htmlContainer: 'swal-glass-text',
                    }
                });
            }
            if (res.data.exists) {
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "Already Requested",
                    text: "You have already requested an appointment for this property.",
                    showConfirmButton: true,
                    confirmButtonText: "Got it",
                    confirmButtonColor: "#ea580c",
                    background: "rgba(20, 20, 20, 0.95)",
                    color: "#fff",
                    iconColor: "#f97316",
                    backdrop: "rgba(0, 0, 0, 0.8)",
                    customClass: {
                        popup: 'swal-glass-popup',
                        title: 'swal-glass-title',
                        htmlContainer: 'swal-glass-text',
                        confirmButton: 'swal-glass-button',
                    }
                });
            }
        });

        // 👉 send to backend here
        // axios.post("/appointments", appointmentData)

        reset();
    };

    return (
        <section className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />

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
                    <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-lg space-y-5 text-center backdrop-blur-md">
                        <div className="w-20 h-20 mx-auto rounded-full border-2 border-orange-500/50 p-1 bg-white/5">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-2xl">👤</div>
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

                        <div className="flex gap-3 justify-center pt-2">
                            <SocialIcon Icon={FaFacebookF} color="bg-[#1877F2]/80" />
                            <SocialIcon Icon={FaTwitter} color="bg-[#1DA1F2]/80" />
                            <SocialIcon Icon={FaLinkedinIn} color="bg-[#0A66C2]/80" />
                            <SocialIcon Icon={FaWhatsapp} color="bg-[#25D366]/80" />
                        </div>

                        <button className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-full flex items-center justify-center gap-2 transition-all font-semibold border border-white/10 backdrop-blur-md">
                            <IoChatbubbleEllipsesOutline size={18} />
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
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 backdrop-blur-md">
                                    <label className="text-[10px] text-gray-500 block px-1 uppercase tracking-wide font-medium">Date</label>
                                    <input type="date" {...register("date")} className="w-full bg-transparent text-white text-sm p-1 focus:outline-none scheme-dark" />
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 backdrop-blur-md">
                                    <label className="text-[10px] text-gray-500 block px-1 uppercase tracking-wide font-medium">Time</label>
                                    <input type="time" {...register("time")} className="w-full bg-transparent text-white text-sm p-1 focus:outline-none scheme-dark" />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-orange-500/50 transition-colors backdrop-blur-md">
                                <textarea
                                    {...register("buyerMessage")}
                                    rows={3}
                                    className="w-full bg-transparent text-white p-4 border-none focus:ring-0 resize-none placeholder-gray-600 text-sm"
                                    placeholder="Any specific requests or questions?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all active:scale-[0.98] border border-orange-400/20"
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
    <div className={`${color} p-2.5 rounded-full cursor-pointer hover:scale-110 transition-transform backdrop-blur-md border border-white/10`}>
        <Icon className="text-white text-xs" />
    </div>
);

const InputGroup = ({ label, icon, children }) => (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden focus-within:border-orange-500/50 transition-colors backdrop-blur-md">
        <div className="flex items-center gap-2 px-4 pt-3 text-gray-500 text-[10px] font-semibold uppercase tracking-wider">
            {icon} {label}
        </div>
        {children}
    </div>
);

export default SendRequestSection;
