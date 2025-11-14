import { View, Text } from "react-native";

/**
 * Badge Component (Atom)
 * Reusable badge with variant support for difficulty, streak, achievements
 */
const Badge = ({ text, variant = "default", size = "medium" }) => {
  // Variant color mappings (calm, desaturated palette)
  const variantStyles = {
    easy: "bg-green-100 border-green-200",
    medium: "bg-yellow-100 border-yellow-200",
    hard: "bg-red-100 border-red-200",
    streak: "bg-amber-100 border-amber-200",
    achievement: "bg-yellow-100 border-yellow-200",
    success: "bg-blue-100 border-blue-200",
    default: "bg-gray-100 border-gray-200",
  };

  const textStyles = {
    easy: "text-green-700",
    medium: "text-yellow-700",
    hard: "text-red-700",
    streak: "text-amber-700",
    achievement: "text-yellow-700",
    success: "text-blue-700",
    default: "text-gray-700",
  };

  const sizeStyles = {
    small: "px-2 py-0.5",
    medium: "px-3 py-1",
    large: "px-4 py-2",
  };

  const textSizeStyles = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
  };

  return (
    <View
      className={`rounded-full border ${variantStyles[variant] || variantStyles.default} ${sizeStyles[size]}`}
    >
      <Text
        className={`font-semibold ${textStyles[variant] || textStyles.default} ${textSizeStyles[size]}`}
      >
        {text}
      </Text>
    </View>
  );
};

export default Badge;
