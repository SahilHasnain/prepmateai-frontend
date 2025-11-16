import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * GradientButton - Reusable gradient CTA button
 *
 * Props:
 * - gradient: Array of colors for LinearGradient
 * - onPress: Handler function
 * - children: Button text/content
 * - disabled: Boolean
 * - shadowColor: Shadow color (default: first gradient color)
 * - accessibilityLabel: A11y label
 */

const GradientButton = ({
  gradient,
  onPress,
  children,
  disabled = false,
  shadowColor,
  accessibilityLabel,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.button,
          shadowColor && { shadowColor },
          disabled && styles.disabled,
          style,
        ]}
      >
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  disabled: {
    opacity: 0.5,
  },
});
