import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/providers/AuthProvider";
import { FlatList } from "react-native-gesture-handler";
import { sampleFeaturedCourses } from "@/data/courses";
import { useRouter} from "expo-router";

export default function SearchScreen() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-gndarkblue">
      {user ? (
        <FlatList
          ListHeaderComponent={() => <ThemedText>Search</ThemedText>}
          data={sampleFeaturedCourses}
          renderItem={({ item }) =>
            user && (
              <ThemedView>
                <ThemedText>{item.name}</ThemedText>
              </ThemedView>
            )
          }
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-2xl">
            Login to continue Learning.
          </Text>
          <TouchableOpacity className="mt-10 border border-gnLightBlue rounded-md p-2" onPress={() => {router.push("/sign-in")}}>
            <Text className="text-white text-2xl">Login</Text>
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
