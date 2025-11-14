import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { login } from "../services/appwrite";
import { getMessage } from "../utils/messages";

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
      Alert.alert(getMessage("errors.loginFailed"), error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center px-6 py-12">
          <Text className="text-3xl font-bold text-center mb-8">
            Welcome Back
          </Text>

          <Input
            label="Email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            placeholder={getMessage("auth.emailPlaceholder")}
            keyboardType="email-address"
          />

          <Input
            label="Password"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            placeholder={getMessage("auth.passwordPlaceholder")}
            secureTextEntry
          />

          <Button title="Login" onPress={handleLogin} loading={loading} />

          <Text
            className="text-center text-gray-600 mt-6"
            onPress={() => router.push("/signup")}
          >
            New here?{" "}
            <Text className="text-blue-500 font-semibold">Sign Up</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
