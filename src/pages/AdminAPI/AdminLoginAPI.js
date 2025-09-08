import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8089", // keep this as base
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    // Skip token for register/login/verify-otp
    if (
      !config.url.includes("/api/admin/register") &&
      !config.url.includes("/api/admin/login") &&
      !config.url.includes("/api/admin/verify-otp")
    ) {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const login = async (email, password) => {
  const res = await axiosInstance.post("/api/admin/login", { email, password });
  return res.data;
};


export const verifyOtp = async (email, otp) => {
  const res = await axiosInstance.post("/api/admin/verify-otp", { email, otp });
  return res.data;
};

export default axiosInstance;
