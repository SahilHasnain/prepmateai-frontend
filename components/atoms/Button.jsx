import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

// Atom: Button - dark mode action button with calming aesthetics
export default function Button({
  title,
  onPress,
  loading = false,
  variant = "default",
}) {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        isOutline ? styles.buttonOutline : styles.buttonDefault,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? "#93C5FD" : "#E5E7EB"} />
      ) : (
        <Text style={isOutline ? styles.textOutline : styles.textDefault}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDefault: {
    backgroundColor: "#2A2D33", // Soft dark button
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#3A3D43",
  },
  textDefault: {
    color: "#E5E7EB",
    fontWeight: "600",
    fontSize: 16,
  },
  textOutline: {
    color: "#93C5FD", // Pastel sky blue
    fontWeight: "600",
    fontSize: 16,
  },
});
