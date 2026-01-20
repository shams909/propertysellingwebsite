import axiosSecure from "../axios/axiosSecure";

export const addAppointment = (appointmentData) => {
  return axiosSecure.post("/appointments", appointmentData);
};

export const fetchAppointmentsByUserEmail = (email) => {
  return axiosSecure.get(`/appointments/buyer/${email}`);
}

export const deleteAppointmentById = (id) => {
  return axiosSecure.delete(`/appointments/${id}`);
}
export const fetchAppointmentCandidatesByPropertyId = (propertyId) => {
  return axiosSecure.get(`/appointments/property/${propertyId}`);
}

export const updateAppointmentStatus = (id, statusData) => {
  return axiosSecure.patch(`/appointments/status/${id}`, statusData);
}