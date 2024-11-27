import {
  View,
  Text,
  Button,
  GestureResponderEvent,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { login } from "@/service/auth.service";

export default function SignInScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fieldNames, setFliedNames] = useState({ email: "", password: "" });
  const handleChange = (name: string, value: string) => {
    setFliedNames({ ...fieldNames, [name]: value });
  };

  const handleSignIn = async (event: GestureResponderEvent) => {
    setLoading(true);
    try {
      const res = await login(fieldNames.email, fieldNames.password);
      if (res.names) {
        Alert.alert("Success", "Login successful! Welcome back. " + res.names);
        router.replace("/(tabs)/profile");
      }
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", `Sign-up failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={"#04F3D8"} />
      </View>
    );
  }

  return (
    <View className="flex flex-1 h-[100%] items-center justify-center ">
      <View className="bg-gndarkblue text-white flex justify-center items-center my-5">
        <Image
          height={20}
          width={20}
          source={require("../../assets/images/logo.png")}
          style={{ backgroundColor: "lightgray" }}
        />
      </View>
      <Text className="text-3xl font-bold mb-6 text-white">Login</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
        placeholderTextColor={"#7b7b8b"}
        className="w-full h-12 px-3 mb-4 border border-gnLightBlue rounded-md text-white"
        style={{ width: "80%", height: 50, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry
        placeholderTextColor={"#7b7b8b"}
        className="w-full h-12 px-3 mb-4 border border-gnLightBlue rounded"
        style={{ width: "80%", height: 50, marginBottom: 10, color: "white" }}
      />
      <View className="w-[80%] bg-gntextblue p-2 rounded text-center text-xl">
        <Button title="Login" onPress={handleSignIn} />
      </View>
      <View className="flex flex-row justify-center items-center mt-4">
        <Text className="text-white">Don't have an account?</Text>
        <Button
          title="Sign Up"
          onPress={() => router.push("/(auth)/sign-up")}
        />
      </View>
    </View>
  );
}
