import axios from "axios";

export const getMe = async (token) => {
  return await axios.get("http://localhost:8890/api/users/getme", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
