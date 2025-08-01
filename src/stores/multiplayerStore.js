import { create } from "zustand";
import { useSocketStore } from "./socketStore";
import useGameStore from "./game-store";

export const useMultiplayerStore = create((set) => ({
  playersData: null,
  statusError: null,
  isJoined: false,
  isJoining: false,
  isListening: false,

  listenEvents: () => {
    const { socket, isConnected } = useSocketStore.getState();
    if (!isConnected || !socket) {
      return;
    }
    socket.on("playersData", (data) => {
      set({ playersData: data });
      console.log("data", data);
    });
  },

  removeEvents: () => {
    const { socket } = useSocketStore.getState();
    if (!socket) return;
    console.log("🔊 Stopping event listeners...");
  },

  join: (roomName) => {
    const { socket } = useSocketStore.getState();
    const room = useGameStore.getState().room
    if (!socket) return;
    socket.emit("joinRoom", { roomName, room });
    // console.log("join")
  },

  leave: (roomName) => {
    const { socket } = useSocketStore.getState();
    // socket.emit(CHAT_ACTIONS.LEAVE_CHAT, {roomName})
    // set({messages:[]})
  },

  sendMessage: (data) => {
    const { socket } = useSocketStore.getState();
    if (!socket) return;
    // socket.emit(CHAT_ACTIONS.SEND_MESSAGE, data);
  },
  changeStatus: (isReady) => {
    const { socket } = useSocketStore.getState();
    const room = useGameStore.getState().room
    socket.emit("changeStatus", {
      status: isReady == "waiting" ? "ready" : "waiting",
      roomName: room.code
    });
    console.log('room', room)
  },
  // clearMessages: () => set({ messages: [] }),
  // clearStatus: () => set({ status : null, statusError: null }),
}));
