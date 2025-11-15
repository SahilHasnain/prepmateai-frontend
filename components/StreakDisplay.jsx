import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

// Streak visibility badge - Dark mode with soft yellow accent
const StreakDisplay = ({ streak }) => {
  if (!streak || streak === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.fireIcon}>🔥</Text>
      <View>
        <Text style={styles.streakNumber}>{streak}-day</Text>
        <Text style={styles.streakLabel}>streak</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(253, 230, 138, 0.1)",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(253, 230, 138, 0.2)",
  },
  fireIcon: {
    marginRight: 8,
    fontSize: 24,
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.p3,
  },
  streakLabel: {
    fontSize: 12,
    color: colors.p3,
    opacity: 0.8,
  },
});

export default StreakDisplay;
