import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { sampleFeaturedCourses } from "@/data/courses";
import { getCourses } from "@/service/course.service";

export default function CourseSreen() {
  const [allCourses, setAllCourses] = useState(sampleFeaturedCourses);

  const params = useLocalSearchParams();
  useEffect(() => {
    const getCourse = async () => {
      const res = await getCourses();
      setAllCourses(res);
    };
    getCourse();
  }, [params]);

  const { name: courseSlug } = params;
  const {
    name,
    slug,
    short_intro: description,
    main_image: image_url,
    cost,
  } = allCourses.find((course) => course.slug === courseSlug)!;

  return (
    <View className="flex bg-gndarkblue text-white">
      <ScrollView>
        <View style={{width: "100%"}}>
          <ImageBackground
            className="flex justify-center items-start  h-40  bg-gray-300"
            source={{ uri: `${image_url}` }}
          >
            <Text
              className="flex  py-[50] text-3xl text-white shadow-lg"
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
          <View
            className="flex items-end justify-center rounded-md p-5"
            style={{ height: 50, }}
          >
            <TouchableOpacity className="flex bg-gndarkblue border border-gntextblue justify-center p-2 rounded-md items-end" style={{height: 50}}>
              <Text className="text-gntextblue text-lg font-bold text-end">Buy Now ${cost}</Text>
            </TouchableOpacity>
          </View>
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
