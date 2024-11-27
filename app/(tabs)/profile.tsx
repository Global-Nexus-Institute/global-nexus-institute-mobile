import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { sampleFeaturedCourses } from "@/data/courses";
import UserCourses from "@/components/courses/UserCourses";
import UserProfile from "@/components/UserProfile";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { getAuthUser } from "@/service/auth.service";
import { UsersDataType } from "@/utils/data-types";

export default function ProfileScreen() {
  const [view, setView] = useState("ongoing");
  const toggleView = (selectedView: string) => {
    setView((prev) => (prev = selectedView));
  };

  const [authUser, setAuhtUser] = useState<UsersDataType>();

  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const getAuth = async () => {
      const res = await getAuthUser();
      setAuhtUser(res);
    };
    getAuth();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gndarkblue">
      <FlatList
        ListHeaderComponent={() => <UserProfile toggleView={toggleView} />}
        data={sampleFeaturedCourses}
        renderItem={({ item }) =>
          view == "completed" ? (
            <UserCourses course={item} percentage={100} />
          ) : (
            <UserCourses course={item} percentage={50} />
          )
        }
      />
      {user && (
        <View className="bg-gnLighBlue" style={{ height: 100 }}>
          <TouchableOpacity onPress={logout}>
            <Text className="text-4xl text-center font-bold text-white">
              Logout {authUser?.email}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
