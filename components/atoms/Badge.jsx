import { View, Text, StyleSheet } from "react-native";

/**
 * Badge Component (Atom) - Dark mode
 * Reusable badge with variant support for difficulty, streak, achievements
 */
const Badge = ({ text, variant = "default", size = "medium" }) => {
  // Variant color mappings (pastel on dark backgrounds)
  const variantStyles = {
    easy: { bg: "rgba(69, 246, 195, 0.1)", border: "rgba(69, 246, 195, 0.2)" },
    medium: {
      bg: "rgba(253, 230, 138, 0.1)",
      border: "rgba(253, 230, 138, 0.2)",
    },
    hard: {
      bg: "rgba(248, 180, 180, 0.1)",
      border: "rgba(248, 180, 180, 0.2)",
    },
    streak: {
      bg: "rgba(253, 230, 138, 0.1)",
      border: "rgba(253, 230, 138, 0.2)",
    },
    achievement: {
      bg: "rgba(253, 230, 138, 0.1)",
      border: "rgba(253, 230, 138, 0.2)",
    },
    success: {
      bg: "rgba(147, 197, 253, 0.1)",
      border: "rgba(147, 197, 253, 0.2)",
    },
    default: { bg: "#2A2D33", border: "#3A3D43" },
  };

  const textStyles = {
    easy: "#45F6C3",
    medium: "#FDE68A",
    hard: "#F8B4B4",
    streak: "#FDE68A",
    achievement: "#FDE68A",
    success: "#93C5FD",
    default: "#9CA3AF",
  };

  const sizeStyles = {
    small: { px: 8, py: 2 },
    medium: { px: 12, py: 4 },
    large: { px: 16, py: 8 },
  };

  const textSizeStyles = {
    small: 12,
    medium: 14,
    large: 16,
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;
  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: currentVariant.bg,
          borderColor: currentVariant.border,
          paddingHorizontal: currentSize.px,
          paddingVertical: currentSize.py,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textStyles[variant] || textStyles.default,
            fontSize: textSizeStyles[size],
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    borderWidth: 1,
  },
  text: {
    fontWeight: "600",
  },
});

export default Badge;
