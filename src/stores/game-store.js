import { create } from "zustand";
import { getRandomLocation } from "../api/gameApi.js";
import { calculateDistance } from "../utils/calculate-distance.js";

const useGameStore = create((set, get) => ({
  randomLocation: null,
  distance: null,
  roundScore: 0,
  totalScore: 0,
  currentRound: 1,
  lastPlayerGuess: null,
  actionGetRandomLocation: async () => {
    const resp = await getRandomLocation();
    // console.log(resp)
    set({
      randomLocation: resp.data,
      distance: null,
      roundScore: 0,
      lastPlayerGuess: null,
    });
    return resp;
  },
  actionCalculateScore: (playerGuess) => {
    const { randomLocation } = get();
    if (!randomLocation || !playerGuess) return;

    const distanceInKm = calculateDistance(
      randomLocation.lat,
      randomLocation.lng,
      playerGuess.lat,
      playerGuess.lng
    );

    let score = 0;

    // Rule 1: More than 500km away is still 0 points.
    if (distanceInKm > 500) {
      score = 0;
    }
    // Rule 2: Less than or equal to 20km is still a perfect 5000 points.
    else if (distanceInKm <= 10) {
      score = 5000;
    }
    // Rule 3: For distances between 20km and 500km, use a steeper, cubic scale.
    else {
      const normalizedDistance = (distanceInKm - 10) / (500 - 20);

      // THIS IS THE CHANGE:
      // Using a cubic falloff (** 3) makes the score drop much faster.
      score = Math.round(5000 * (1 - normalizedDistance));
    }

    set((state) => ({
      distance: distanceInKm,
      roundScore: score,
      totalScore: state.totalScore + score,
      currentRound: state.currentRound + 1,
      lastPlayerGuess: playerGuess,
    }));
  },
}));

export default useGameStore;
