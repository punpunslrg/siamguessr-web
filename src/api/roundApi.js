import axios from "axios";

export const roundApi = axios.create({
  baseURL:"http://localhost:8890/api/rounds"
})

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const nextRound = (body, token) => roundApi.post("/start", body, addToken(token));