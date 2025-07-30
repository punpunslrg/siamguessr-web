import axios from "axios";

export const guessApi = axios.create({
  baseURL:"http://localhost:8890/api/guess"
})

const addToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const submitGuess = (body, token) => guessApi.post("/", body, addToken(token));
