import axios from "../config/axios"; // axiosInstance พร้อม interceptor

export const actionRegister = async (value) => {
  return await axios.post("/api/auth/register", value);
};

export const actionLogin = async (value) => {
  return await axios.post("/api/auth/login", value);
};

const authApi = {};

authApi.forgotPassword = (value) => {
  return axios.post("/api/auth/forgot-password", value);
};

authApi.verifyOtp = (value) => {
  return axios.post("/api/auth/verify-otp", value);
};

authApi.resetPassword = (value) => {
  return axios.post("/api/auth/reset-password", value);
};

export default authApi;
