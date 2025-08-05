import { create } from "zustand";
import { postLeaderboard } from "../api/leaderboardApi";

const useLeaderboardStore = create((set) => ({
  leaderboard: [],
  isLoading: false,
  error: null,

  // Action: Fetch & generate leaderboard (call POST API)
  actionFetchLeaderboard: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await postLeaderboard();
      set({ leaderboard: res.data.leaderboard, isLoading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || "Failed to load leaderboard",
        isLoading: false,
      });
    }
  },

  // Optional: clear leaderboard
  clearLeaderboard: () => set({ leaderboard: [], error: null }),
}));

export default useLeaderboardStore;
