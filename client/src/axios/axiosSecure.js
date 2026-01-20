import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Store logout function
let logoutFunction = null;

// Function to set the logout callback from AuthProvider
export const setLogoutFunction = (logout) => {
  logoutFunction = logout;
};

/* ---------- REQUEST INTERCEPTOR ---------- */
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------- RESPONSE INTERCEPTOR ---------- */
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("access-token");

      // Call logout function if available
      if (logoutFunction) {
        await logoutFunction();
      }

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
