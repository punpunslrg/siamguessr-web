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
import { getSubscriptionStatusApi } from "../api/subscriptionApi";

const userStore = (set, get) => ({
  token: null,
  user: null,
  allUsers: [],
  
  setToken: async (token) => {
    set({ token });
  },
  
  fetchUser: async () => {
    const { token } = get();
    if (!token) return;
    
    try {
      const res = await getMe(token);
      set({ user: res.data.user });
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  },
  login: async (value) => {
    try {
      const res = await actionLogin(value);
      const { user, accessToken } = res.data;
      set({ token: accessToken, user: user });

      // เรียก API เพื่อเช็คสถานะ Subscription
      let subscriptionIsActive = false;
      try {
        const subStatus = await getSubscriptionStatusApi();
        subscriptionIsActive = subStatus.isActive;
      } catch (subError) {
          // ถ้าเกิด error (เช่น user ไม่เคยมี subscription มาก่อน)
          // ให้ถือว่าไม่มี subscription ที่ active อยู่
          console.log("Could not retrieve subscription status after login:", subError.message);
          subscriptionIsActive = false;
      }
      console.log('res.data', res.data)
      return { success: true, role: user.role, isSubscribed: subscriptionIsActive };


    } catch (error) {
      return { success: false, message: error.response?.data?.message, isSubscribed: false };
    }
  },


  logout: async () => {
    set({ token: null, user: null });
  },

  getProfile: async () => {
    const { token } = get(); // ดึง token จาก state ปัจจุบัน
    if (!token) {
      return { success: false, message: "Not authenticated" };
    }

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
