import axios from "axios";
import toast from "react-hot-toast";
console.log("API BASE URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});
api.interceptors.request.use((config) => {
  const publicEndpoints = ["/login", "/register"];
  const url = config?.url || "";
  const requiresAuth = !publicEndpoints.some((endpoint) => url.includes(endpoint));

  if (requiresAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const path = error.config?.url || "";

    const skipGlobalToast = ["/login", "/register"].some((endpoint) =>
      path.includes(endpoint)
    );
    if (!skipGlobalToast) {
      if (status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.");
      } else {
        const errorMsg =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        toast.error(errorMsg);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
