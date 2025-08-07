import { create } from "zustand";
import { toast } from "react-toastify";
import {
  cancelSubscriptionApi,
  getSubscriptionStatusApi,
} from "../api/subscriptionApi";

const subscriptionStore = (set, get) => ({
  subscription: null, // { isActive: boolean, tierName: string, willCancel: boolean, periodEndDate: Date }
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

  cancelSubscription: async () => {
    set({ isCanceling: true });
    try {
      // 1. เรียก API และรับข้อมูลที่อัปเดตแล้วกลับมา
      const { message, subscription: updatedStripeSubscription } = await cancelSubscriptionApi();
      toast.success(message || "Subscription cancellation scheduled.");

      // 2. แปลงข้อมูลที่ได้จาก Stripe ให้เป็นรูปแบบเดียวกับ state ของเรา
      const currentSubscription = get().subscription;
      const newSubscriptionState = {
        ...currentSubscription, // เก็บข้อมูลเก่าไว้
        isActive: updatedStripeSubscription.status === 'active', // ยัง Active อยู่
        willCancel: !!updatedStripeSubscription.canceled_at, // <-- เช็คจาก canceled_at จริง
        periodEndDate: new Date(updatedStripeSubscription.current_period_end * 1000).toISOString(), 
      };
      
      // 3. อัปเดต State ด้วยข้อมูลล่าสุดโดยตรง
      set({ subscription: newSubscriptionState });

    } catch (err) {
      toast.error(err.message);
    } finally {
      set({ isCanceling: false });
    }
  },
});

const useSubscriptionStore = create(subscriptionStore);

export default useSubscriptionStore;
