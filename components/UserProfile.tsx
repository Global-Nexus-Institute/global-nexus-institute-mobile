import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function UserProfile({
  toggleView,
}: {
  toggleView: (view: string) => void;
}) {
  const { user, loading, logout } = useAuth();

  const [view, setView] = useState("ongoing");

  return (
    <View>
      <View
        className="relative text-white flex-1 justify-center items-center"
        style={{ width: "100%", height: 150 }}
      >
        <ImageBackground
          className="flex justify-center items-start  h-40  bg-gray-300"
          source={require("../assets/images/logo.png")}
          style={{
            backgroundColor: "lightgray",
            height: 120,
            width: "100%",
            borderRadius: 10,
          }}
        >
          <Text
            className="flex text-center py-[50] text-3xl text-white shadow-lg"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#00000070",
            }}
          >
           {user?.email}
          </Text>
        </ImageBackground>
        <View
          className="shadow-lg shadow-gndarkblue text-white text-center rounded-full border border-gndarkblue text-3xl font-bold"
          style={{
            backgroundColor: "lightgray",
            height: 90,
            width: 90,
            borderRadius: 50,
            borderColor: "#19173C",
            borderWidth: 5,
            position: "absolute",
            zIndex: 10,
            bottom: -30,
          }}
        ></View>
      </View>

      <View className="bg-gndarkblue text-white flex flex-row justify-between items-start ">
        <TouchableOpacity
          onPress={() => {
            toggleView("ongoing");
            setView("ongoing");
          }}
        >
          <Text
            className={` ${view == "ongoing" ? "text-gnLightBlue" : "text-white"} my-5 text-md pl-3 font-bold `}
          >
            Ongoing Courses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            toggleView("completed");
            setView("completed");
          }}
        >
          <Text
            className={` ${view == "completed" ? "text-gnLightBlue" : "text-white"} my-5 text-md pl-3 font-bold `}
          >
            Completed Courses
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
