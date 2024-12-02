import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import auth from "@/service/firebase.service"; // Import your Firebase configuration
import apiClient, { endpoints } from "@/service/api";
import { UsersDataType } from "@/utils/data-types";
import { getAuthUser } from "@/service/auth.service";

// Create the AuthContext
const AuthContext = createContext({
  user: null as User | null,
  authUserData: null as UsersDataType | null,
  loading: false,
  login: (email: string, password: string) => null as Promise<UsersDataType> | null,
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authUserData, setAuthUserData] = useState<UsersDataType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // Persist the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // console.log("Current User: ", (await currentUser?.getIdToken())?.toString());
      setUser(currentUser);
      if(currentUser){
        const getUser = await getAuthUser(
          currentUser.uid,
          (await currentUser.getIdToken()).toString(),
        );
        setAuthUserData(getUser);
      }
      
      setLoading(false); // Set loading to false once the state is determined
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  // Sign in function
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const token = await userCredential.user.getIdToken();
      const res = await apiClient.post(endpoints.auth.login, { token });

      setUser(res.data.user);
      setAuthUserData(res.data.user);
      setToken(token);
      // console.log("This token: ", res.data.user);
      return res.data.user;
      
    } catch (error: any) {
      console.error("Login Error:", error.message);
      throw error;
    }
  };

  // Sign out function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAuthUserData(null);
      await apiClient.get(endpoints.auth.logout);
    } catch (error: any) {
      console.error("Logout Error:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authUserData, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
