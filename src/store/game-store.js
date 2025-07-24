import { create } from "zustand";
import { getRandomLocation } from "../api/gameApi.js";

const useGameStore = create((set, get) => ({
  randomLocation: null,
  actionGetRandomLocation: async () => {
    const resp = await getRandomLocation();
    // console.log(resp)
    set({ randomLocation: resp.data });
    return resp;
  }
}));

export default useGameStore;
