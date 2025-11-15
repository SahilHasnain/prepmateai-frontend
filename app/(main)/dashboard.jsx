import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/atoms/Button";
import { logout } from "../../services/appwrite";

// Dashboard - dark mode navigation hub with calming aesthetics for NEET/JEE students
export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      refreshUser();
      router.replace("/login");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Dashboard</Text>
          <Text style={styles.welcome}>
            Welcome, {user?.name || "Learner"} 🌟
          </Text>
          <Text style={styles.subtitle}>
            Every small step counts. Let's make today meaningful.
          </Text>
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push("/(main)/planner")}
          >
            <Text style={styles.navEmoji}>📅</Text>
            <Text style={styles.navTitle}>Study Planner</Text>
            <Text style={styles.navDescription}>
              Create gentle habits that stick
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navCard}
            onPress={() => router.push("/(main)/flashcards")}
          >
            <Text style={styles.navEmoji}>🎴</Text>
            <Text style={styles.navTitle}>Flashcards</Text>
            <Text style={styles.navDescription}>
              Review at your own pace, no pressure
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Button title="Logout" onPress={handleLogout} variant="outline" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0F1115",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  header: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#E5E7EB",
    marginBottom: 8,
  },
  welcome: {
    fontSize: 18,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontStyle: "italic",
    lineHeight: 20,
  },
  navigation: {
    gap: 16,
    flex: 1,
  },
  navCard: {
    backgroundColor: "#1C1F24",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: "#2A2D33",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  navEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 6,
  },
  navDescription: {
    fontSize: 14,
    color: "#9CA3AF",
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 24,
  },
});
