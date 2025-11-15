import { TouchableOpacity, Text, StyleSheet } from "react-native";

/**
 * IconButton Component (Atom) - Dark mode
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
    primary: "#93C5FD",
    danger: "#F8B4B4",
    transparent: "transparent",
    default: "#2A2D33",
  };

  const sizeStyles = {
    small: 4,
    medium: 8,
    large: 12,
  };

  const iconSizes = {
    small: 14,
    medium: 16,
    large: 24,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: variantStyles[variant],
          padding: sizeStyles[size],
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <Text style={{ fontSize: iconSizes[size] }}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 9999,
  },
});

export default IconButton;
