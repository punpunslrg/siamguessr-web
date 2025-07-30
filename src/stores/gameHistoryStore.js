import { create } from "zustand";
import { persist } from "zustand/middleware";
import useUserStore from "./userStore";
import {
  actionGetMultiHistory,
  actionGetSingleHistory,
} from "../api/gameHistoryApi";

const gameHistoryStore = (set, get) => ({
  singleplayerHistory: [],
  multiplayerHistory: [],

  fetchSingleplayerHistory: async () => {
    try {
      const token = useUserStore.getState().token; // ดึง token จาก user store
      if (!token) {
        return { success: false, message: "Not authenticated" };
      }
      const res = await actionGetSingleHistory(token);
      set({ singleplayerHistory: res.data.history });
    } catch (error) {
      console.error("Failed to fetch history:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },

  fetchMultiplayerHistory: async () => {
    try {
      const token = useUserStore.getState().token; // ดึง token จาก user store
      if (!token) {
        return { success: false, message: "Not authenticated" };
      }
      const res = await actionGetMultiHistory(token);
      set({ multiplayerHistory: res.data.history });
    } catch (error) {
      console.error("Failed to fetch history:", error);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  },
});

const useGameHistoryStore = create(gameHistoryStore);

export default useGameHistoryStore;
