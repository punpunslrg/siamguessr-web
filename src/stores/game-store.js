import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateDistance } from "../utils/calculate-distance";

const useGameStore = create(
  persist(
    (set, get) => ({
      room: null,
      currentRoundIndex: 0,
      guesses: [],
      gameState: "idle",

      actionStartNewGame: async () => {
        const mockRoom = {
          id: "room_cuid_123",
          mode: "single",
          mode: "multi",
          difficulty: "classic",
          status: "waiting",
          maxPlayers: 2,
          hostId: "user_cuid_abc",
          // players: [{ userId: "user_cuid_abc", isHost: true }],
          players: [
            { userId: "user_cuid_abc", isHost: true },
            { userId: "user_cuid_def", isHost: false },
          ],
          rounds: [
            {
              id: "r1",
              roundNumber: 1,
              location: { lat: 13.7569, lng: 100.5025 },
            },
            {
              id: "r2",
              roundNumber: 2,
              location: { lat: 20.352, lng: 100.0805 },
            },
            {
              id: "r3",
              roundNumber: 3,
              location: { lat: 14.0428, lng: 99.5037 },
            },
            {
              id: "r4",
              roundNumber: 4,
              location: { lat: 18.7909, lng: 98.9873 },
            },
            {
              id: "r5",
              roundNumber: 5,
              location: { lat: 7.8286, lng: 98.3121 },
            },
          ],
        };

        set({
          room: mockRoom,
          currentRoundIndex: 0,
          guesses: [],
          gameState: "playing",
        });

        return mockRoom;
      },
      actionSubmitGuess: (playerGuess) => {
        const { room, currentRoundIndex, guesses } = get();
        if (!room || room.rounds.length <= currentRoundIndex) return;

        const currentRound = room.rounds[currentRoundIndex];
        const actualLocation = currentRound.location;

        // No guess made
        if (!playerGuess) {
          set({
            guesses: [...guesses, { guess: null, distance: null, score: 0 }],
            gameState: "round-results",
          });
          return;
        }

        const distanceInKm = calculateDistance(
          actualLocation.lat,
          actualLocation.lng,
          playerGuess.lat,
          playerGuess.lng
        );

        let score = 0;
        if (distanceInKm <= 10) {
          score = 5000;
        } else if (distanceInKm >= 1000) {
          score = 0;
        } else {
          const normalized = (distanceInKm - 10) / (1000 - 10); // smoother drop-off
          score = Math.round(5000 * (1 - normalized));
          score = Math.max(0, score); // just to be extra safe
        }

        set({
          guesses: [
            ...guesses,
            { guess: playerGuess, distance: distanceInKm, score },
          ],
          gameState: "round-results",
        });
      },

      actionNextRound: () => {
        const index = get().currentRoundIndex;
        if (index < 4) {
          set({ currentRoundIndex: index + 1, gameState: "playing" });
        } else {
          set({ gameState: "game-over" });
        }
      },

      actionResetGame: () => {
        set({
          room: null,
          currentRoundIndex: 0,
          guesses: [],
          gameState: "idle",
        });
      },

      actionGetTotalScore: () => {
        return get().guesses.reduce((total, g) => total + (g.score || 0), 0);
      },
    }),
    {
      name: "siamguessr-game",
      onRehydrateStorage: () => console.log("rehydrating store"),
    }
  )
);

export default useGameStore;
