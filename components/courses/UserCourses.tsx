import { View, Text, Image } from "react-native";
import React from "react";
import { Course } from "@/utils/data-types";
import CircularProgress from "../CircularProgress";

interface CourseProps {
  course: Course;
  percentage: number;
}

export default function UserCourses({ course, percentage }: CourseProps) {
  return (
    <View className="flex w-[100%] p-2 flex-row my-3 gap-3 items-center border rounded-md border-gnLightBlue shadow-md ">
      <Image
        source={{
          uri: `${course.main_image ?? "https://picsum.photos/200/300"}`,
        }}
        width={60}
        height={60}
        className="rounded-md"
      />
      <View className="flex flex-col mx-2" style={{ flex: 1, width: "60%" }}>
        <Text className="text-md font-bold text-white">{course.name}</Text>
      </View>
      <CircularProgress percentage={50} />
    </View>
  );
}
