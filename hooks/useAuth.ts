import { getAuthUser, login, logout } from "@/service/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = () => {
  const token = AsyncStorage.getItem("token");
  return {
    getUser: async () => {
      const user = await getAuthUser();
      return user
    },
    login: async (email: string, password: string) => {
      await login(email, password);
    },
    logout: async () => {
      await logout();
    },
  };
};
