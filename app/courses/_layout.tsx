import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/providers/AuthProvider";

export default function CoursePage() {
  const router = useRouter();
  const { user, authUserData } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gndarkblue">
      <View className="bg-gndarkblue">
        <View
          className="flex justify-between w-[100%] my-3 flex-row border border-gnLightBlue"
          style={{ width: "100%", borderWidth: 0, borderBottomWidth: 2 }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            {authUserData ? (
              <Text className="text-white">{`${authUserData.names}`}</Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  router.push("/sign-in");
                }}
              >
                <Text className="text-white">Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Slot />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
