import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getLeaderboard } from "../api/leaderboardApi.js";

const useLeaderboardStore = create(
  persist(
    (set) => ({
      leaderboard: [],
      isLoading: false,
      error: null,
      difficulty: "classic",

      actionFetchLeaderboard: async (
        mode = "single",
        difficulty = "classic"
      ) => {
        set({ isLoading: true, error: null });
        try {
          const res = await getLeaderboard(mode, difficulty);
          set({ leaderboard: res.data.leaderboard, isLoading: false });
        } catch (err) {
          set({
            error: err?.response?.data?.message || "Failed to load leaderboard",
            isLoading: false,
          });
        }
      },

      setDifficulty: (difficulty) => set({ difficulty }),

      clearLeaderboard: () => set({ leaderboard: [], error: null }),
    }),
    {
      name: "leaderboard-storage", // key name in storage
      partialize: (state) => ({ difficulty: state.difficulty }), // Only persist difficulty (optional)
    }
  )
);

export default useLeaderboardStore;
