import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

/**
 * LoadingState Component (Atom) - Dark mode
 * Consistent loading indicator with optional message
 */
const LoadingState = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#45F6C3" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: "#9CA3AF",
  },
});

export default LoadingState;
