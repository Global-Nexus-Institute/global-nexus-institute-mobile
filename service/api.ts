import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://global-nexus-inbstitute-api-v1.onrender.com/api-v1", //
  // baseURL: "http://localhost:5000/api-v1",
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// routes

export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    logout: "/auth/logout",
    authUser: "/auth/user",
  },
  users: {
    root: "/users",
  },
  courses: {
    root: "/courses",
  },
  payments: {
    root: "/payments",
    createOrder: "/payments/create-payment",
    captureOrder: "/payments/capture-payment",
    getPaymentStatus: "/payments/get-payment-status",
  },
};

export default apiClient;
