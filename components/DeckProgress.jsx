import { View, Text, StyleSheet } from "react-native";

const DeckProgress = ({ reviewedCount, remainingCount, offlineCount }) => {
  const totalCards = reviewedCount + remainingCount;
  const currentStep = reviewedCount + 1;

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        Step {currentStep} of {totalCards} — you're doing great 🌱
      </Text>
      {offlineCount > 0 && (
        <Text style={styles.offlineText}>📡 {offlineCount} pending sync</Text>
      )}
      <Text style={styles.footerText}>Tiny steps compound into mastery.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 24,
    paddingTop: 8,
  },
  progressText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "400",
  },
  offlineText: {
    marginTop: 6,
    fontSize: 13,
    color: "#FB923C",
  },
  footerText: {
    marginTop: 12,
    fontSize: 12,
    textAlign: "center",
    color: "#6B7280",
    fontStyle: "italic",
  },
});

export default DeckProgress;
