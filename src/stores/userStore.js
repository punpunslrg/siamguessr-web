import {create} from "zustand"
import { persist } from "zustand/middleware";
import { actionLogin } from "../api/authApi";

const userStore = (set) => ({
  token: null,
  user: [],
  login: async (value) => {
    try {
      const res = await actionLogin(value);
      const { payload, token } = res.data;
      set({ token: token, user: payload });
      return { success: true, role: payload.role };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  logout: async () => {
    set({ token: null, user: ""})
  }
});

const useUserStore = create(persist(userStore, { name: "auth_store" }));

export default useUserStore;
