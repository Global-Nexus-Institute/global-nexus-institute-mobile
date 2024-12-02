import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getCourse } from "@/service/course.service";
import { Course } from "@/utils/data-types";
import { useAuth } from "@/providers/AuthProvider";


export default function CourseScreen() {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  const { user, authUserData } = useAuth();

  const params = useLocalSearchParams();
  const { name: courseSlug } = params;

  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const result = await getCourse(courseSlug as string);
        setCourse(result);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseSlug) fetchCourse();
  }, [courseSlug]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#04F3D8" />
      </View>
    );
  }

  if (!course) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Course not found.</Text>
      </View>
    );
  }

  const {
    name,
    short_intro: description,
    main_image: image_url,
    cost,
    uuid,
  } = course;

  const userHasCourse = () => {
    if(user && authUserData?.courses){
      //check if user has course
      const userCourses = authUserData.courses;
      const courses = userCourses.find((c) => c.slug === courseSlug);
      return courses !== undefined;
    }
  }

  return (
    <View className="flex bg-gndarkblue text-white">
      <ScrollView>
        <View style={{ width: "100%" }}>
          <ImageBackground
            className="flex justify-center items-start h-40 bg-gray-300"
            source={{ uri: image_url }}
          >
            <Text
              className="flex py-[50] text-3xl text-white shadow-lg"
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#00000070",
              }}
            >
              {name}
            </Text>
          </ImageBackground>

          <Text className="text-white text-lg">{description}</Text>

          {userHasCourse() ? (
            <View
              className="flex items-end justify-center rounded-md p-5"
              style={{ height: 50 }}
            >
              <TouchableOpacity
                className="flex bg-gndarkblue border border-gntextblue justify-center p-2 rounded-md items-end"
                style={{ height: 50 }}
                onPress={() => router.push("/learn")}
              >
                <Text className="text-gntextblue text-lg font-bold text-end">
                  Resume
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              className="flex items-end justify-center rounded-md p-5"
              style={{ height: 50 }}
            >
              <TouchableOpacity
                className="flex bg-gndarkblue border border-gntextblue justify-center p-2 rounded-md items-end"
                style={{ height: 50 }}
              >
                <Text className="text-gntextblue text-lg font-bold text-end">
                  Buy Now ${cost}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View>
            <Text>Image</Text>
            <View>
              <ScrollView>
                <Text className="text-white">Lesson List</Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
