import { create } from "zustand";
import { persist } from "zustand/middleware";
import { submitGuess } from "../api/guessApi.js";
import { createRoom, getLobby, getRoomResult } from "../api/roomApi.js";
import { nextRound } from "../api/roundApi.js";
import { calculateDistance } from "../utils/calculate-distance";
import { useSocketStore } from "./socketStore";
import useUserStore from "./userStore.js";

const useGameStore = create(
  persist(
    (set, get) => ({
      //
      room: null,
      currentRoundIndex: 0,
      guesses: [],
      gameState: "idle",
      roomResult: null,
      //
      //---------------------------- multi-------------------------------------
      playersData: null,
      statusError: null,
      isJoined: false,
      isJoining: false,
      isListening: false,
      roundScore: null,
      allGuessed: null,
      //---------------------------- multi-------------------------------------
      //
      actionStartNewGame: async (room) => {
        let token = useUserStore.getState().token;
        const res = await createRoom(room, token);

        set({
          room: res.data.room,
          currentRoundIndex: 0,
          guesses: [],
          allGuessed: [],
          gameState: res.data.room.status,
        });

        return res.data.room;
      },
      actionSubmitGuess: async (playerGuess) => {
        let token = useUserStore.getState().token;
        const user = useUserStore.getState().user;
        const { socket } = useSocketStore.getState();

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

          if (room?.mode !== "multi") {
            set((state) => ({
              allGuessed: [
                ...(state.allGuessed || []),
                {
                  userId: user.id,
                  roundId: currentRound.id,
                  guessedLat: null,
                  guessedLng: null,
                  distance: null,
                  score: 0,
                },
              ],
            }));
          }

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

            if (socket && room.mode === "multi") {
              socket.emit("playerGuessed", {
                roomCode: room.code,
                playerId: user.id,
                roundId: currentRound.id,
                guess: { lat: null, lng: null },
                distance: null,
                score: 0,
              });
            }

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
        } else if (distanceInKm >= 2000) {
          score = 0;
        } else {
          const maxDistance = 2000;
          const dropoff = Math.pow(
            (maxDistance - distanceInKm) / maxDistance,
            2
          ); // smoother curve
          score = Math.round(5000 * dropoff);
        }

        const newGuessData = {
          guessedLat: playerGuess.lat,
          guessedLng: playerGuess.lng,
          distance: distanceInKm,
          score,
        };

        // console.log("newGuessData", newGuessData);

        // Set guesses + allGuessed for singleplayer
        set((state) => ({
          guesses: [...state.guesses, newGuessData],
          gameState: "round-results",
          allGuessed:
            room?.mode !== "multi"
              ? [
                  ...(state.allGuessed || []),
                  {
                    userId: user.id,
                    roundId: currentRound.id,
                    ...newGuessData,
                  },
                ]
              : state.allGuessed,
        }));

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

          if (socket && room.mode === "multi") {
            socket.emit("playerGuessed", {
              roomCode: room.code,
              playerId: useUserStore.getState().user.id,
              roundId: currentRound.id,
              guess: {
                lat: playerGuess.lat,
                lng: playerGuess.lng,
              },
              distance: distanceInKm,
              score,
            });
          }

          return res;
        } catch (error) {
          console.error("Failed to submit guess", error);
        }
      },

      actionNextRound: async (roundId, navigate) => {
        const token = useUserStore.getState().token;
        const { room, currentRoundIndex } = get();
        const { socket } = useSocketStore.getState();

        const res = await nextRound({ roundId }, token);
        const updatedRound = res.data.round;

        if (room && updatedRound) {
          const updatedRounds = [...room.rounds];
          updatedRounds[currentRoundIndex + 1] = updatedRound;

          set({
            room: { ...room, rounds: updatedRounds },
            currentRoundIndex: currentRoundIndex + 1,
            gameState: "playing",
            allGuessed: [],
          });
          if (socket && room?.mode === "multi") {
            socket.emit("nextRoundStarted", {
              roomCode: room.code,
              round: updatedRound,
              currentRoundIndex: currentRoundIndex + 1,
            });
          }
        } else {
          set({ gameState: "game-over" });
        }
      },

      actionResetGame: () =>
        set(() => ({
          guesses: [],
          allGuessed: [],
          currentRoundIndex: 0,
          gameState: "waiting",
          roomResult: null,
          roundScore: null,
        })),

      actionGetRoomResult: async (roomId) => {
        let token = useUserStore.getState().token;
        const room = useGameStore.getState().room;
        const { socket } = useSocketStore.getState();

        console.log("roomId from actionGetRoomResult", roomId);
        const res = await getRoomResult(roomId, token);
        set({ roomResult: res.data.results });
        if (room?.mode === "multi") {
          socket?.emit("gamebreakdown", { room, roomResult: res.data.results });
        }
      },

      actionForfeitGame: async () => {
        const token = useUserStore.getState().token;
        const { currentRoundIndex } = get();
        const room = useGameStore.getState().room;
        set({ gameState: "idle" });

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

        if (room?.mode === "multi") {
          console.log("leave from single mode");
          useGameStore.getState().actionLeave(room);
        }

        return room;
      },

      actionGetLobby: async (id, token) => {
        const tkn = useUserStore.getState().token;
        const resp = await getLobby(id, tkn);
        set({ room: resp.data.room });
        return resp.data.room;
      },
      //
      //---------------------------- multi-------------------------------------
      actionListenEvents: (navigate) => {
        const { socket, isConnected } = useSocketStore.getState();
        if (!isConnected || !socket) {
          return;
        }
        socket.on("playersData", (data) => {
          set({ playersData: data });
        });
        socket.on("leaveRoom", () => {
          const room = useGameStore.getState().room;
          if (room) {
            console.log("leave room from actionListenEvents");
            useGameStore.getState().actionLeave(room);
          }
          navigate("/gamemode");
        });
        socket.on("gameStarted", (updatedRoom) => {
          set({ room: updatedRoom });
          navigate("/gameplay");
        });
        socket.on("roundResults", (results) => {
          set({ roundScore: results });
        });
        socket.on("allGuessed", (data) => {
          const currentRoundIndex = get().currentRoundIndex;
          const currentRound = get().room?.rounds?.[currentRoundIndex];

          if (!currentRound) return;

          const filtered = data.filter(
            (guess) => guess.roundId === currentRound.id
          );

          set({ allGuessed: filtered });
        });
        // socket.on("playerDisconnected", ({ userId }) => {
        //   console.log(`⚡ Player with userId ${userId} disconnected`);
        // });
        socket.on("nextRoundStarted", ({ round, currentRoundIndex }) => {
          const { room } = get();
          const updatedRounds = [...room.rounds];
          updatedRounds[currentRoundIndex] = round;

          set({
            room: { ...room, rounds: updatedRounds },
            currentRoundIndex,
            gameState: "playing",
            allGuessed: [],
          });
          navigate("/gameplay");
        });
        socket.on("playerDisconnected", () => {
          const room = useGameStore.getState().room;
          console.log("Leave room from disconnect");
          useGameStore.getState().actionLeave(room);
        });
        socket.on("game-finished", ({ data }) => {
          set({ roomResult: data });
          navigate("/gamebreakdown");
        });
      },

      actionRemoveEvents: () => {
        const { socket } = useSocketStore.getState();
        if (!socket) return;
        console.log("🔊 Stopping event listeners...");
      },

      actionJoin: (roomName) => {
        const { socket } = useSocketStore.getState();
        const { room } = get();
        if (!socket) return;
        socket.emit("joinRoom", { roomName, room });
      },

      actionLeave: (roomOverride) => {
        const { socket } = useSocketStore.getState();
        const roomToLeave = roomOverride || useGameStore.getState().room;

        // console.log("roomToLeave", roomToLeave);

        if (!roomToLeave?.code) {
          console.warn("🚨 Tried to leave room, but no room was set.");
          return;
        }

        socket?.emit("leaveRoom", roomToLeave);
        set({
          room: null,
          currentRoundIndex: 0,
          guesses: [],
          gameState: "idle",
          roomResult: null,
          playersData: null,
          statusError: null,
          isJoined: false,
          isJoining: false,
          isListening: false,
          roundScore: null,
          allGuessed: null,
        });
      },

      actionSendMessage: (data) => {
        const { socket } = useSocketStore.getState();
        if (!socket) return;
        // socket.emit(CHAT_ACTIONS.SEND_MESSAGE, data);
      },
      actionChangeStatus: (isReady) => {
        // console.log('isReady', isReady)
        const { socket } = useSocketStore.getState();
        const { room } = get();
        socket.emit("changeStatus", {
          status: isReady == "waiting" ? "ready" : "waiting",
          roomName: room.code,
        });
      },
      actionPlay: (room) => {
        const { socket } = useSocketStore.getState();
        if (!socket || !room) return;
        socket.emit("startgame", room);
      },
      //---------------------------- multi-------------------------------------
    }),
    {
      name: "siamguessr-game",
    }
  )
);

export default useGameStore;
