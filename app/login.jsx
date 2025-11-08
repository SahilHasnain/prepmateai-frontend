import { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/appwrite";

// Login screen with authentication
export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle login submission
  const handleLogin = async () => {
    setLoading(true);
    const { success, error } = await login(form.email, form.password);
    setLoading(false);

    if (success) {
      router.push("/dashboard");
    } else {
      Alert.alert("Login Failed", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6 py-12">
        <Text className="text-3xl font-bold text-center mb-8">
          Welcome Back
        </Text>

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

        <Button
          title="Login"
          onPress={handleLogin}
          loading={loading}
        />

        <Text
          className="text-center text-gray-600 mt-6"
          onPress={() => router.push("/signup")}
        >
          New here?{" "}
          <Text className="text-blue-500 font-semibold">Sign Up</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
