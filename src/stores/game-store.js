import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateDistance } from "../utils/calculate-distance";
import { createRoom } from "../api/roomApi.js";
import useUserStore from "./userStore.js";
import { submitGuess } from "../api/guessApi.js";
import { nextRound } from "../api/roundApi.js";

const useGameStore = create(
  persist(
    (set, get) => ({
      room: null,
      currentRoundIndex: 0,
      guesses: [],
      gameState: "idle",

      actionStartNewGame: async (roomData) => {
        let token = useUserStore.getState().token;
        const res = await createRoom(roomData, token);

        set({
          room: res.data.room,
          currentRoundIndex: 0,
          guesses: [],
          gameState: res.data.room.status,
        });

        return res.data.room;
      },
      actionSubmitGuess: async (playerGuess) => {
        let token = useUserStore.getState().token;
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

        try {
          const res = await submitGuess(
            {
              roundId: currentRound.id,
              guess: {
                lat: playerGuess.lat,
                lng: playerGuess.lng,
              },
              distance: distanceInKm,
              score,
            },
            token
          );

          return res;
        } catch (error) {
          console.error("Failed to submit guess", error);
          // You could set an error state here if needed
        }
      },

      actionNextRound: async (roundId) => {
        let token = useUserStore.getState().token;
        console.log(roundId)
        const index = get().currentRoundIndex;
        if (index < 4) {
          set({ currentRoundIndex: index + 1, gameState: "playing" });
          const res = await nextRound({roundId}, token)
          return res
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
    }
  )
);

export default useGameStore;
