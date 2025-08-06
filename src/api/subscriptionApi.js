import apiClient from "../configs/axiousConfig";

export const createCheckoutSessionApi = async (checkoutData) => {
  const res = await apiClient.post("/payment/create-checkout-session", checkoutData);
  return res.data;
};

export const getSubscriptionStatusApi = async () => {
  const res = await apiClient.get("/payment/my-subscription");
  return res.data;
};

export const cancelSubscriptionApi = async () => {
  const res = await apiClient.post("/payment/subscriptions/cancel", {});
  return res.data;
};
