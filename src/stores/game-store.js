import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateDistance } from "../utils/calculate-distance";
import { createRoom, getRoomResult } from "../api/roomApi.js";
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
      roomResult: null,

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

          try {
            const res = await submitGuess(
              {
                roundId: currentRound.id,
                guess: { lat: null, lng: null },
                distance: null,
                score: 0,
              },
              token
            );

            return res;
          } catch (error) {
            console.error("Failed to submit null guess", error);
          }

          return;
        }

        const distanceInKm = calculateDistance(
          actualLocation.lat,
          actualLocation.lng,
          playerGuess.lat,
          playerGuess.lng
        );

        let score = 0;
        if (distanceInKm <= 5) {
          score = 5000;
        } else if (distanceInKm >= 1200) {
          score = 0;
        } else {
          // Stricter scoring with logarithmic curve
          const factor = Math.log(distanceInKm - 4) / Math.log(991);
          score = Math.round(5000 * (1 - factor));
          score = Math.max(0, score);
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
        }
      },

      actionNextRound: async (roundId) => {
        const token = useUserStore.getState().token;
        const { room, currentRoundIndex } = get();

        // Call backend to update and get the latest round info
        const res = await nextRound({ roundId }, token);
        const updatedRound = res.data.round; // ← ensure backend returns this!

        if (room && updatedRound) {
          // Replace the specific round in the room's rounds array
          const updatedRounds = [...room.rounds];
          updatedRounds[currentRoundIndex + 1] = updatedRound;

          set({
            room: { ...room, rounds: updatedRounds },
            currentRoundIndex: currentRoundIndex + 1,
            gameState: "playing",
          });
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

      actionGetRoomResult: async (roomId) => {
        let token = useUserStore.getState().token;
        const res = await getRoomResult(roomId, token);
        set({ roomResult: res.data.results });
      },

      actionForfeitGame: async () => {
        const token = useUserStore.getState().token;
        const { room, currentRoundIndex } = get();

        if (!room) return;

        // Loop through remaining rounds
        for (let i = currentRoundIndex; i < room.rounds.length; i++) {
          const round = room.rounds[i];

          try {
            await submitGuess(
              {
                roundId: round.id,
                guess: { lat: null, lng: null },
                distance: null,
                score: 0,
              },
              token
            );
          } catch (error) {
            console.error(
              `Failed to submit null guess for round ${round.id}`,
              error
            );
          }
        }

        return room;
      },
    }),
    {
      name: "siamguessr-game",
    }
  )
);

export default useGameStore;
