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

export const actionListUser = async (token) => {
  return await axios.get("http://localhost:8890/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const actionUpdateUserByAdmin = async (id, updatedData, token) => {
  return await axios.patch(
    `http://localhost:8890/api/users/${id}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const actionDeleteUserByAdmin = async (id, token) => {
  return await axios.delete(`http://localhost:8890/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
