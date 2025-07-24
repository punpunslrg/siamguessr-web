import axios from "axios";

export const actionRegister = async (value) => {
  return await axios.post("http://localhost:8890/api/auth/register", value)
}

export const actionLogin = async (value) => {
  return await axios.post("http://localhost:8890/api/auth/login", value)
}