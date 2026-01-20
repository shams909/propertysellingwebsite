import axiosSecure from "../axios/axiosSecure";

export const fetchAllUser = async () => {
  return axiosSecure.get("/users");
};

export const checkAdmin = async (email) => {
  return axiosSecure.get(`/users/admin/${email}`);
};
export const makeAdmin = async (id) => {
  return axiosSecure.patch(`/users/admin/${id}`);
};

export const removeAdmin = async (id) => {
  return axiosSecure.patch(`/users/remove-admin/${id}`);
};
export const deleteUser = async (id) => {
  return axiosSecure.delete(`/users/deleteuser/${id}`);
}
