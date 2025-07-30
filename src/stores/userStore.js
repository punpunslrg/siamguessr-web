import { create } from "zustand";
import { persist } from "zustand/middleware";
import { actionLogin } from "../api/authApi";
import {
  actionDeleteUserByAdmin,
  actionListUser,
  actionUpdateUser,
  actionUpdateUserByAdmin,
  getMe,
} from "../api/userApi";

const userStore = (set, get) => ({
  token: null,
  user: null,
  allUsers: [],
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

  getAllUsers: async () => {
    try {
      // ดึง token จาก state ปัจจุบันด้วย get()
      const { token } = get();
      if (!token) {
        console.error("No token available for fetching users.");
        return; // ออกจากฟังก์ชันถ้าไม่มี token
      }

      const res = await actionListUser(token);

      if (res.data.users) {
        set({ allUsers: res.data.users });
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // เคลียร์ user list
      set({ allUsers: [] });
    }
  },

  updateUserByAdmin: async (id, updatedData) => {
    try {
      const { token } = get();
      const res = await actionUpdateUserByAdmin(id, updatedData, token);

      // ดึงข้อมูล user ที่ถูกต้องจาก response ของ API
      const updatedUserFromApi = res.data.user;

      // อัปเดต state ด้วยข้อมูลที่ได้จาก API
      set((state) => ({
        allUsers: state.allUsers.map((u) =>
          u.id === id ? updatedUserFromApi : u
        ),
      }));

      return { success: true };
    } catch (error) {
      console.error("Failed to update user:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Update failed.",
      };
    }
  },

  deleteUserByAdmin: async (id) => {
    const { token, allUsers } = get();
    const newUsers = allUsers.filter((user) => user.id !== id);
    set({ allUsers: newUsers });

    try {
      await actionDeleteUserByAdmin(id, token);
      return { success: true };
    } catch (error) {
      console.error("Failed to delete user:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Delete failed.",
      };
    }
  },
});

const useUserStore = create(persist(userStore, { name: "auth_store" }));

export default useUserStore;
