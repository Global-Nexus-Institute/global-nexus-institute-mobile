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

// Create the AuthContext
const AuthContext = createContext({
  user: null as User | null,
  loading: false,
  login: (email: string, password: string) => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // Persist the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      setUser(currentUser);
      
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
      console.log(res.data);
      setUser(res.data.user);
      setToken(token);
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
      await apiClient.get(endpoints.auth.logout);
    } catch (error: any) {
      console.error("Logout Error:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
