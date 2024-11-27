import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, Stack } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <SafeAreaView className="flex-1 bg-gndarkblue">
      <ScrollView
        className="flex-1 bg-gndarkblue"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Slot />
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
