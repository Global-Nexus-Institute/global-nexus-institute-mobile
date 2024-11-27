import {
  View,
  Text,
  Button,
  TextInput,
  GestureResponderEvent,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { router } from "expo-router";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import PhoneInput from "react-native-phone-input";
import { signUp } from "@/service/auth.service";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(null);

  const [address, setAddress] = useState({
    city: "",
    country: "",
    streetAddress: "",
    zipCode: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    firstName: "",
    lastName: "",
    role: "student",
    address: { city: "", country: "", streetAddress: "", zipCode: "" },
    phoneNumber: "",
  });

  const [phoneCountryCode, setPhoneCountryCode] = useState<CountryCode>("RW");
  const [showPhoneCountryPicker, setShowPhoneCountryPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = useRef<PhoneInput>(null);

  const onSelectCountry = (country: any) => {
    setPhoneCountryCode(country.cca2);
    setSelectedCountry(country);
    setAddress({ ...address, country: country.name });
  };

  function setConfirmPassword(text: string): void {
    // if (text === formData.password) return;
    // Alert.alert("Error", "Passwords do not match.");
  }

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event: GestureResponderEvent) => {
    setFormData({ ...formData, address: { ...address } });
    setLoading(true);
    try {
      console.log(formData);
      const res = await signUp(formData);
      if (res.message) {
        setLoading(false);
        Alert.alert("Success", res.message);
        router.replace("/(auth)/sign-in");
      }
    } catch (error) {
      Alert.alert("Error", `${error}`);
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
    <View
      className="flex-1 justify-center items-center  px-4"
      style={{ width: " 100%" }}
    >
      <View className="bg-gndarkblue text-white flex justify-center items-center my-5">
        <Image
          height={20}
          width={20}
          source={require("../../assets/images/logo.png")}
          style={{ backgroundColor: "lightgray" }}
        />
      </View>
      <Text className="text-3xl font-bold mb-6 text-white">Sign Up</Text>
      <TextInput
        placeholder="First Name"
        onChangeText={(value) => handleChange("firstName", value)}
        placeholderTextColor={"#7b7b8b"}
        keyboardType="default"
        className="text-white h-12 px-3 mb-4 border border-gnLightBlue rounded"
        style={{ width: "80%", height: 50, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Last Name"
        onChangeText={(value) => handleChange("lastName", value)}
        placeholderTextColor={"#7b7b8b"}
        keyboardType="default"
        className="text-white h-12 px-3 mb-4 border border-gnLightBlue rounded"
        style={{ width: "80%", height: 50, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(value) => handleChange("email", value)}
        placeholderTextColor={"#7b7b8b"}
        keyboardType="email-address"
        className="text-white h-12 px-3 mb-4 border border-gnLightBlue rounded"
        style={{ width: "80%", height: 50, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(value) => handleChange("password", value)}
        placeholderTextColor={"#7b7b8b"}
        secureTextEntry
        className="text-white h-12 px-3 mb-4 border border-gnLightBlue rounded"
        style={{ width: "80%", height: 50, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        placeholderTextColor={"#7b7b8b"}
        secureTextEntry
        style={{ width: "80%", height: 50, marginBottom: 10 }}
        className="text-white h-12 px-3 mb-4 border border-gnLightBlue rounded"
      />

      <View className="flex flex-row justify-between" style={{ width: "80%" }}>
        <View
          className="h-12 px-3 mb-4 border border-gnLightBlue rounded"
          style={{ height: 50, marginBottom: 10 }}
        >
          <CountryPicker
            withFlag={true}
            withFilter={true}
            withEmoji={true}
            onSelect={(country) => onSelectCountry(country)}
            containerButtonStyle={{ paddingTop: 5 }}
            countryCode={phoneCountryCode}
            withCountryNameButton={true}
          />
        </View>
        <TextInput
          placeholder="City"
          onChangeText={(value) => setAddress({ ...address, city: value })}
          placeholderTextColor={"#7b7b8b"}
          keyboardType="default"
          className="text-white h-12 px-3 mb-4 border border-gnLightBlue rounded"
          style={{ height: 50, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Zip / Postal Code"
          onChangeText={(value) => setAddress({ ...address, zipCode: value })}
          placeholderTextColor={"#7b7b8b"}
          keyboardType="default"
          className="text-white h-12 px-3 mb-4 border border-gnLightBlue rounded"
          style={{ height: 50, marginBottom: 10 }}
        />
      </View>
      <TextInput
        placeholder="Street Address"
        onChangeText={(value) =>
          setAddress({ ...address, streetAddress: value })
        }
        placeholderTextColor={"#7b7b8b"}
        keyboardType="default"
        className="text-white h-12 px-3 mb-4 border border-gnLightBlue rounded"
        style={{ width: "80%", height: 50, marginBottom: 10 }}
      />
      <View
        className="flex flex-row h-12 px-3 mb-4 border border-gnLightBlue rounded"
        style={{ width: "80%", height: 50, marginBottom: 10 }}
      >
        <TextInput
          placeholder="Phone Number"
          onChangeText={(value) => handleChange("phoneNumber", value)}
          placeholderTextColor={"#7b7b8b"}
          keyboardType="number-pad"
          className="text-white "
          style={{ height: 50, marginBottom: 10 }}
        />
      </View>

      <View className="w-[80%] bg-gntextblue p-2 rounded text-center text-xl">
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>

      <View className="flex flex-row justify-center items-center mt-4">
        <Text className="text-white">Already have an account?</Text>
        <Button title="Login" onPress={() => router.push("/(auth)/sign-in")} />
      </View>
    </View>
  );
}
