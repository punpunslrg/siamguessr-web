import { io } from "socket.io-client";

const URL = `http://localhost:8890`;

export const socket = io(URL, {
  autoConnect: false,
});
