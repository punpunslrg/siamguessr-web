import { create } from "zustand";
import { createRoom } from "../api/roomApi";

const useRoomStore = create((set) => ({
  room: null,
  setRoom: (room) => set({ room }),
  clearRoom: () => set({ room: null }),

  createRoom: async (body, token) => {
    const res = await createRoom(body, token);
    set({ room: res.data.room });
    return res.data.room;
  },
}));

export default useRoomStore;
