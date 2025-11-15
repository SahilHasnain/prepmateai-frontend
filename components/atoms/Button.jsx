import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { colors, gradients, shadows } from "../../utils/colors";

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
        <ActivityIndicator color={isOutline ? colors.p2 : colors.p4} />
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
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDefault: {
    backgroundColor: colors.s3, // Soft dark button
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.s3,
  },
  textDefault: {
    color: colors.p4,
    fontWeight: "600",
    fontSize: 16,
  },
  textOutline: {
    color: colors.p2, // Pastel sky blue
    fontWeight: "600",
    fontSize: 16,
  },
});
