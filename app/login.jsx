import { useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { login } from "../services/appwrite";
import { getMessage } from "../utils/messages";

// Login screen - dark mode with calming aesthetics for NEET/JEE students
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
      Alert.alert(
        "Couldn't log you in",
        error || "Please check your credentials and try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Welcome back 💛</Text>
          <Text style={styles.subtitle}>
            Let's continue your learning journey, one gentle step at a time.
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

          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.footerText}>
              New here? <Text style={styles.footerLink}>Create an account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F1115",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#E5E7EB",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  footerText: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 24,
    fontSize: 15,
  },
  footerLink: {
    color: "#93C5FD", // Pastel sky blue
    fontWeight: "600",
  },
});
