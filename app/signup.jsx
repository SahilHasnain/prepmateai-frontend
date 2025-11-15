import { useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import { signup } from "../services/appwrite";
import { getMessage } from "../utils/messages";
import { colors } from "../utils/colors";

// Signup screen - dark mode with supportive language for NEET/JEE students
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
    // Basic frontend validation before Appwrite signup
    if (form.password !== form.confirmPassword) {
      Alert.alert("Password mismatch", getMessage("errors.passwordMismatch"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Alert.alert("Invalid email", getMessage("errors.invalidEmail"));
      return;
    }

    if (form.password.length < 6) {
      Alert.alert("Weak password", getMessage("errors.passwordTooShort"));
      return;
    }

    setLoading(true);
    const { success, error } = await signup(
      form.email,
      form.password,
      form.name,
    );
    setLoading(false);

    if (success) {
      router.push("/dashboard");
    } else {
      Alert.alert("Couldn't create account", error || "Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Start your journey 🌱</Text>
          <Text style={styles.subtitle}>
            Create an account and begin building your future, one step at a
            time.
          </Text>

          <Input
            label="Full Name"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            placeholder={getMessage("auth.namePlaceholder")}
          />

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

          <Input
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
            placeholder={getMessage("auth.confirmPasswordPlaceholder")}
            secureTextEntry
          />

          <Button title="Sign Up" onPress={handleSignup} loading={loading} />

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.footerLink}>Login</Text>
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
    backgroundColor: colors.s1,
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
    color: colors.p4,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: colors.p5,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  footerText: {
    textAlign: "center",
    color: colors.p5,
    marginTop: 24,
    fontSize: 15,
  },
  footerLink: {
    color: colors.p1,
    fontWeight: "600",
  },
});
