import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../service/firebase.service";
import apiClient, { endpoints } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const token = await userCredential.user.getIdToken();
  const res = await apiClient.post(endpoints.auth.login, { token });
  AsyncStorage.setItem("userToken", token);
  const user = await res.data.user
  AsyncStorage.setItem("userUID", userCredential.user.uid);
  return res.data;
};

export const signUp = async (formData: any) => {
  const res = await apiClient.post(endpoints.auth.signup, { user: formData });
  return res.data;
};

export const logout = async () => {
  try {
    await apiClient.get(endpoints.auth.logout);
    await auth.signOut();
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
  
};

export const getAuthUser = async (uid: string, token: string) => {
  
  const res = await apiClient.get(`${endpoints.auth.authUser}/${uid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const isLoggedIn = async () => {
  return auth.currentUser !== null;
};
