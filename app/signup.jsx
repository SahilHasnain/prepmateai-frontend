import { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";
import { signup } from "../services/appwrite";

// Signup screen with form validation
export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    const { success, error } = await signup(form.email, form.password, form.name);
    setLoading(false);

    if (success) {
      router.push("/dashboard");
    } else {
      Alert.alert("Signup Failed", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6 py-12">
        <Text className="text-3xl font-bold text-center mb-8">
          Create Account
        </Text>

        <Input
          label="Full Name"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          placeholder="Enter your name"
        />

        <Input
          label="Email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Input
          label="Password"
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Input
          label="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          placeholder="Confirm your password"
          secureTextEntry
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          loading={loading}
        />

        <Text
          className="text-center text-gray-600 mt-6"
          onPress={() => router.push("/login")}
        >
          Already have an account?{" "}
          <Text className="text-blue-500 font-semibold">Login</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
