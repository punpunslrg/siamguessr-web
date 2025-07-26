import axios from "axios";

export const createRoomApi = axios.create({
  baseURL:"http://localhost:8890/api/rooms"
})

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createRoom = (body, token) => createRoomApi.post("/", body, addToken(token));