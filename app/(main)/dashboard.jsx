import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/atoms/Button";
import { logout } from "../../services/appwrite";
import { colors, gradients } from "../../utils/colors";

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
          <TouchableOpacity onPress={() => router.push("/(main)/planner")}>
            <LinearGradient
              colors={gradients.g5}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.navCard}
            >
              <Text style={styles.navEmoji}>📅</Text>
              <Text style={styles.navTitle}>Study Planner</Text>
              <Text style={styles.navDescription}>
                Create gentle habits that stick
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(main)/flashcards")}>
            <LinearGradient
              colors={gradients.g6}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.navCard}
            >
              <Text style={styles.navEmoji}>🎴</Text>
              <Text style={styles.navTitle}>Flashcards</Text>
              <Text style={styles.navDescription}>
                Review at your own pace, no pressure
              </Text>
            </LinearGradient>
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
    backgroundColor: colors.s1,
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
    color: colors.p4,
    marginBottom: 8,
  },
  welcome: {
    fontSize: 18,
    color: colors.p5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.p5,
    fontStyle: "italic",
    lineHeight: 20,
  },
  navigation: {
    gap: 16,
    flex: 1,
  },
  navCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: colors.s4,
    shadowColor: colors.p2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  navEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.p4,
    marginBottom: 6,
  },
  navDescription: {
    fontSize: 14,
    color: colors.p5,
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 24,
  },
});
