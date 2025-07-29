import { create } from "zustand";
import { persist } from "zustand/middleware";
import { actionLogin } from "../api/authApi";
import { actionUpdateUser, getMe } from "../api/userApi";

const userStore = (set, get) => ({
  token: null,
  user: null,
  login: async (value) => {
    try {
      const res = await actionLogin(value);
      const { user, token } = res.data;
      set({ token: token, user: user });
      return { success: true, role: user.role };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  logout: async () => {
    set({ token: null, user: null });
  },

  getProfile: async () => {
    const { token } = get(); // ดึง token จาก state ปัจจุบัน
    if (!token) return; // ถ้าไม่มี token ก็ไม่ต้องทำอะไร

    try {
      const res = await getMe(token);
      set({ user: res.data.user }); // อัปเดตข้อมูล user ด้วยข้อมูลล่าสุด
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      // หาก token หมดอายุ (ได้รับ 401 Unauthorized) ควรจะ logout
      if (error.response?.status === 401) {
        set({ token: null, user: null });
      }
    }
  },

  updateProfile: async (formData) => {
    const { token } = get();
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }
    try {
      const res = await actionUpdateUser(formData, token);
      const { user } = res.data;
      set({ user: user });
      return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Update failed",
      };
    }
  },
});

const useUserStore = create(persist(userStore, { name: "auth_store" }));

export default useUserStore;
