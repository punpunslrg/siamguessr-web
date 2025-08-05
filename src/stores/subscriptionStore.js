import { create } from "zustand";
import { toast } from "react-toastify";
import { cancelSubscriptionApi, getSubscriptionStatusApi } from "../api/subscriptionApi";

const subscriptionStore = (set, get) => ({
  subscription: null,   // { isActive: boolean, tierName: string, willCancel: boolean, periodEndDate: Date }
  isLoading: true,
  isCanceling: false,
  error: null,

  // ดึงสถานะ Subscription ล่าสุดจาก API แล้วอัปเดต State
  fetchSubscriptionStatus: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await getSubscriptionStatusApi();
      set({ subscription: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // ยกเลิก Subscription และดึงข้อมูลสถานะล่าสุดมาอัปเดต
  cancelSubscription: async () => {
    set({ isCanceling: true });
    try {
      const response = await cancelSubscriptionApi();
      toast.success(response.message || "Subscription cancellation scheduled.");

      // หลังจากยกเลิกสำเร็จ, ให้เรียก fetch ใหม่เพื่อดึงข้อมูลล่าสุด
      await get().fetchSubscriptionStatus();
    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ isCanceling: false });
    }
  },
});

const useSubscriptionStore = create(subscriptionStore);

export default useSubscriptionStore;
