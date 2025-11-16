import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

/**
 * Badge Component (Atom) - Dark mode
 * Reusable badge with variant support for difficulty, streak, achievements
 */
const Badge = ({ text, variant = "default", size = "medium" }) => {
  // Variant color mappings (pastel on dark backgrounds)
  const variantStyles = {
    easy: { bg: `${colors.p1}1A`, border: `${colors.p1}33` },
    medium: {
      bg: `${colors.p3}1A`,
      border: `${colors.p3}33`,
    },
    hard: {
      bg: "rgba(248, 180, 180, 0.1)",
      border: "rgba(248, 180, 180, 0.2)",
    },
    streak: {
      bg: `${colors.p3}1A`,
      border: `${colors.p3}33`,
    },
    achievement: {
      bg: `${colors.p3}1A`,
      border: `${colors.p3}33`,
    },
    success: {
      bg: `${colors.p2}1A`,
      border: `${colors.p2}33`,
    },
    default: { bg: colors.s3, border: colors.s3 },
  };

  const textStyles = {
    easy: colors.p1,
    medium: colors.p3,
    hard: "#F8B4B4",
    streak: colors.p3,
    achievement: colors.p3,
    success: colors.p2,
    default: colors.p5,
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
