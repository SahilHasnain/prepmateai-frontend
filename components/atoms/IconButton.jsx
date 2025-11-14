import { TouchableOpacity, Text } from "react-native";

/**
 * IconButton Component (Atom)
 * Reusable icon button for actions like delete, shuffle, back
 */
const IconButton = ({
  icon,
  onPress,
  variant = "default",
  size = "medium",
  accessibilityLabel,
  disabled = false,
}) => {
  const variantStyles = {
    primary: "bg-blue-500",
    danger: "bg-red-500",
    transparent: "bg-transparent",
    default: "bg-gray-200",
  };

  const sizeStyles = {
    small: "p-1",
    medium: "p-2",
    large: "p-3",
  };

  const iconSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-2xl",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`rounded-full ${variantStyles[variant]} ${sizeStyles[size]}`}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Text className={iconSizes[size]}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;
