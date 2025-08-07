import axios from "axios";

export const actionRegister = async (value) => {
  return await axios.post("http://localhost:8890/api/auth/register", value)
}

export const actionLogin = async (value) => {
  return await axios.post("http://localhost:8890/api/auth/login", value)
}

const authApi = {};

authApi.forgotPassword = (value) => {
  return axiosInstance.post("/api/auth/forgot-password", value);
};

authApi.verifyOtp = (value) => {
  return axiosInstance.post("/api/auth/verify-otp", value);
};

authApi.resetPassword = (value) => {
  return axiosInstance.post("/api/auth/reset-password", value);
};

export default authApi;