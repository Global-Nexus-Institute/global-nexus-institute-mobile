import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import UserCourses from "@/components/courses/UserCourses";
import UserProfile from "@/components/UserProfile";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { UsersDataType } from "@/utils/data-types";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [view, setView] = useState("ongoing");
  const toggleView = (selectedView: string) => {
    setView((prev) => (prev = selectedView));
  };

  const router = useRouter();

  const [authUser, setAuhtUser] = useState<UsersDataType>();

  const { user, authUserData, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gndarkblue">
      {authUserData ? (
        <FlatList
          ListHeaderComponent={() => <UserProfile toggleView={toggleView} />}
          data={authUserData?.courses ?? []}
          renderItem={({ item }) =>
            view == "completed" ? (
              <UserCourses course={item} percentage={100} />
            ) : (
              <UserCourses course={item} percentage={50} />
            )
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            onPress={() => {
              router.push("/sign-in");
            }}
          >
            <Text className="text-4xl text-center font-bold text-white">
              Please Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {user && (
        <View className="bg-gnLighBlue" style={{ height: 100 }}>
          <TouchableOpacity onPress={logout}>
            <Text className="text-4xl text-center font-bold text-white">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
