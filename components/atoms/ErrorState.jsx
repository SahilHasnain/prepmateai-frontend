import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

/**
 * ErrorState Component (Atom) - Dark mode
 * Consistent error display with retry button
 */
const ErrorState = ({ error, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>⚠️ {error}</Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: "center",
    color: "#F8B4B4",
    lineHeight: 26,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "#2A2D33",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#3A3D43",
  },
  retryText: {
    fontWeight: "700",
    color: "#E5E7EB",
    fontSize: 16,
  },
});

export default ErrorState;
