import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import authApi from "../api/authApi.js";

const authStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null, 
      isLoggedIn: false,
      isLoading: true, 

     
      setAuth: (data) => {
        const { user, accessToken } = data;
        set({ user, token: accessToken, isLoggedIn: true, isLoading: false });
      },
      
     
      logout: () => {
        set({ user: null, token: null, isLoggedIn: false, isLoading: false });
      },

     
      checkAuth: async () => {
        const token = get().token;
        if (token) {
          try {
           
            const resp = await authApi.getMe();
            set({ user: resp.data.user, isLoggedIn: true, isLoading: false });
          } catch (error) {
           
            console.error("checkAuth failed, logging out.", error);
            set({ user: null, token: null, isLoggedIn: false, isLoading: false });
          }
        } else {
          
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({ token: state.token }),
    }
  )
);



export default authStore;

