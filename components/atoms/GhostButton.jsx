import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

/**
 * GhostButton - Transparent text-only button
 *
 * Props:
 * - onPress: Handler function
 * - children: Button text
 * - accessibilityLabel: A11y label
 */

const GhostButton = ({ onPress, children, accessibilityLabel }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default GhostButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.p5,
  },
});
