import apiClient, { endpoints } from "./api";

export const createOrder = async (data: {
  amount: number;
  slug: string;
  name: string;
  courseId: string;
  userId: string | null;
}) => {
  const res = await apiClient.post(endpoints.payments.createOrder, {
    amount: data.amount,
    slug: data.slug,
    name: data.name,
    courseId: data.courseId,
    userId: data.userId,
  });

  return res.data;
};

export const executePaymentOrder = async (data: {
  paymentID: string;
  payerID: string | null;
  orderID: string;
}) => {
  const res = await apiClient.post(endpoints.payments.captureOrder, {
    paymentID: data.paymentID,
    payerID: data.payerID,
    orderID: data.orderID,
  });
  return res.data;
};

export const getPaymentStatus = async (userId: string, courseId: string) => {
  const res = await apiClient.post(endpoints.payments.getPaymentStatus, {
    userId,
    courseId,
  });
  return res.data;
};
