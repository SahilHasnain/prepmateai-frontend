import { View, Text, StyleSheet } from "react-native";
import Badge from "../atoms/Badge";

/**
 * PlanItem Component (Molecule) - Dark mode
 * Individual study plan item card with topic, duration, and difficulty
 */
const PlanItem = ({ topic, duration, difficulty }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{topic}</Text>
      <Text style={styles.duration}>{duration} minutes</Text>
      <Badge text={difficulty} variant={difficulty} size="small" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "#2A2D33",
    borderRadius: 12,
    backgroundColor: "#1C1F24",
  },
  topic: {
    marginBottom: 4,
    fontSize: 18,
    fontWeight: "600",
    color: "#E5E7EB",
  },
  duration: {
    marginBottom: 8,
    color: "#9CA3AF",
  },
});

export default PlanItem;
