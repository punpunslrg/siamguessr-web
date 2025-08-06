import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getLeaderboard } from "../api/leaderboardApi.js";

const useLeaderboardStore = create(
  persist(
    (set) => ({
      leaderboards: { classic: [], challenge: [] },
      isLoading: false,
      error: null,
      difficulty: "classic",

      actionFetchLeaderboards: async (mode = "single") => {
        set({ isLoading: true, error: null });
        try {
          // Fetch both difficulties in parallel or sequentially
          const [classicRes, challengeRes] = await Promise.all([
            getLeaderboard(mode, "classic"),
            getLeaderboard(mode, "challenge"),
          ]);

          set({
            leaderboards: {
              classic: classicRes.data.leaderboard,
              challenge: challengeRes.data.leaderboard,
            },
            isLoading: false,
          });
        } catch (err) {
          set({
            error: err?.response?.data?.message || "Failed to load leaderboard",
            isLoading: false,
          });
        }
      },

      setDifficulty: (difficulty) => set({ difficulty }),

      clearLeaderboard: () =>
        set({ leaderboards: { classic: [], challenge: [] }, error: null }),
    }),
    {
      name: "leaderboard-storage",
      partialize: (state) => ({ difficulty: state.difficulty }), // Persist difficulty only
    }
  )
);

export default useLeaderboardStore;
