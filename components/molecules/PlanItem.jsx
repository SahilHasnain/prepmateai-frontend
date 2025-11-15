import { View, Text, StyleSheet } from "react-native";
import Badge from "../atoms/Badge";
import { colors, gradients, shadows } from "../../utils/colors";

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
    borderColor: colors.s3,
    borderRadius: 12,
    backgroundColor: colors.s2,
  },
  topic: {
    marginBottom: 4,
    fontSize: 18,
    fontWeight: "600",
    color: colors.p4,
  },
  duration: {
    marginBottom: 8,
    color: colors.p5,
  },
});

export default PlanItem;
