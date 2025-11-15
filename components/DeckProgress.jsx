import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors";

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
    color: colors.p5,
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
    color: colors.p5,
    fontStyle: "italic",
  },
});

export default DeckProgress;
