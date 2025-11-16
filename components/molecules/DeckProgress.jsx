import { View, Text, StyleSheet } from "react-native";
import { colors, gradients } from "../../utils/colors";
import { LinearGradient } from "expo-linear-gradient";

/**
 * DeckProgress Component
 * Renders a compact progress indicator immediately below the DeckHeader.
 * Shows: reviewed count, total, percentage, remaining, and feedback distribution.
 */
export default function DeckProgress({
  reviewedCount = 0,
  totalCards = 0,
  greens = 0,
  yellows = 0,
  reds = 0,
  remaining = 0,
}) {
  if (totalCards === 0) return null;

  const percent = Math.min(
    100,
    Math.round((reviewedCount / (totalCards || 1)) * 100)
  );

  return (
    <View style={styles.wrapper} accessibilityRole="summary">
      <View style={styles.topRow}>
        <Text style={styles.progressText}>
          Progress: {reviewedCount}/{totalCards} • {percent}%
        </Text>
      </View>
      <View style={styles.barTrack}>
        <LinearGradient
          colors={gradients.g3}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barFill, { width: `${percent}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.s2,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.s3,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.p4,
  },
  remainingText: {
    fontSize: 12,
    color: colors.p5,
  },
  barTrack: {
    height: 10,
    backgroundColor: colors.s3,
    borderRadius: 9999,
    overflow: "hidden",
    marginBottom: 10,
  },
  barFill: {
    height: "100%",
    borderRadius: 9999,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  breakdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  breakdownText: {
    fontSize: 11,
    color: colors.p5,
  },
});
