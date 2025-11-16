import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

/**
 * StatBadge - Individual stat display (label + value)
 *
 * Props:
 * - label: Stat label (e.g., "Reviewed")
 * - value: Stat value (e.g., 15)
 */

const StatBadge = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default StatBadge;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.p5,
    opacity: 0.7,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.p4,
  },
});
