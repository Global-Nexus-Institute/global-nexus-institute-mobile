import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Course } from "@/utils/data-types";
import { useNavigation } from "expo-router";

export default function LearnCourse({ course }: { course: Course }) {
    const navigate = useNavigation();
  return (
    <View className="flex-1 mx-10 bg-gray-200 border border-gnLightBlue rounded-md p-5 gap-3 my-5 ">
      <View className="flex-row ">
        <Image
          source={{
            uri: `${course.main_image ?? "https://picsum.photos/200/300"}`,
          }}
          width={30}
          height={30}
        />
        <Text className="text-white font-bold text-lg pl-3 ml-3">
          {course.name}
        </Text>
      </View>
      <View className="flex">
        <Text className="text-white pt-2">{course.short_intro}</Text>
        <View className="flex-row mt-2 rounded-md my-3">
          <TouchableOpacity className="border bg-gnLightBlue p-2 " onPress={() => {}}>
            <Text className="text-white text-sm font-bold" style={{ fontSize: 12, color: "#2EB9C2" }}>
              Continue Learning
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
