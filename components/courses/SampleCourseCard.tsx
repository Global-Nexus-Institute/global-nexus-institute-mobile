import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Course } from "@/utils/data-types";
import { useRouter } from "expo-router";
interface CourseCardProps {
  course: Course;
}
export default function SimpleCourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  return (
    <View
      style={{ padding: 3, width: "100%", borderWidth: 0, borderBottomWidth: 1}}
      className="flex flex-row my-2 gap-3 border border-gnLightBlue"
    >
      <TouchableOpacity
        onPress={() => {
          router.push(`/courses/${course.slug}`);
        }}
        className="flex flex-col justify-center items-center"
      >
        <Image
          source={{
            uri: `${course.main_image ?? "https://picsum.photos/200/300"}`,
          }}
          width={60}
          height={60}
          style={{ marginRight: 5 }}
          className="rounded-md m-2"
        />
      </TouchableOpacity>
      <View className="flex flex-1 flex-col h-[100%]">
        <Text className="text-lg font-bold text-white">{course.name}</Text>
        <Text className="text-white text-sm ">
          {course.short_intro}
        </Text>
      </View>
    </View>
  );
}
