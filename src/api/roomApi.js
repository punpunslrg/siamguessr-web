import axios from "axios";

export const roomApi = axios.create({
  baseURL: "http://localhost:8890/api/rooms",
});

export const createRoom = (roomData) => roomApi.post("/", roomData);