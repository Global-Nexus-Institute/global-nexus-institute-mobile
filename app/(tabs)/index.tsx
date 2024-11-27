import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  FlatList,
  View,
  TextInput,
  Text,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { sampleFeaturedCourses } from "@/data/courses";
import SimpleCourseCard from "@/components/courses/SampleCourseCard";
import React, { useEffect, useState } from "react";
import { getCourses } from "@/service/course.service";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const [allCourses, setAllCourses] = useState(sampleFeaturedCourses);
  useEffect(() => {
    const getCourse = async () => {
      const res = await getCourses();
      setAllCourses(res);
    };
    getCourse();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-gndarkblue ">
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <View className="mt-5 bg-gndarkblue text-white flex justify-center items-center">
              <Image
                height={20}
                width={20}
                source={require("../../assets/images/logo.png")}
                style={{ backgroundColor: "lightgray" }}
              />
            </View>
            <View className="bg-gndarkblue text-white  flex justify-center items-center">
              <Text className="text-white text-center my-5 text-3xl font-bold">
                Welcome to Global Nexus Institute !! Learn & Earn
              </Text>
              <Text className="text-white text-center my-5 text-lg font-bold">
                Gain insights from industry leaders at Global Nexus Institute.
                Our expert-led sessions offer valuable knowledge in Data
                Science, Computer Basics, AI, and Cyber-Security. Enhance your
                skills and stay ahead in your field with us.
              </Text>
            </View>

            <View
              style={{
                marginLeft: 3,
                marginRight: 3,
                width: "100%",
                height: 50,
              }}
              className="flex flex-row bg-gndarkblue px-2 items-center border rounded-lg gap-4 bg-white"
            >
              <Ionicons name="search" size={18} color="gray" />
              <TextInput
                placeholder="Search..."
                className="flex"
                style={{ color: "gray", width: "85%" }}
                placeholderTextColor="gray"
                onChangeText={() => {
                  return;
                }}
              />
              <Ionicons name="mic" size={18} color="gray" />
            </View>
            <View className="bg-gndarkblue text-white  flex justify-center items-start pl-3">
              <Text className="text-white my-5 text-2xl pl-3 font-bold ">
                Course Overview
              </Text>
            </View>
          </View>
        )}
        data={allCourses}
        renderItem={({ item }) => <SimpleCourseCard course={item} />}
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
