import axios from "axios";

export const getMe = async (token) => {
  return await axios.get("http://localhost:8890/api/users/getme", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const actionUpdateUser = async (formData, token) => {
  return await axios.patch(`http://localhost:8890/api/users/update`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
