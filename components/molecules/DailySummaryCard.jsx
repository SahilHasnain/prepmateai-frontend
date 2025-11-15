import { View, Text, Animated, StyleSheet } from "react-native";
import { getMessage } from "../../utils/messages";

/**
 * DailySummaryCard Component (Molecule) - Dark mode
 * Displays daily progress summary with calming design
 */
const DailySummaryCard = ({ stats, fadeAnim }) => {
  if (!stats || stats.cardsReviewedToday === 0) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>{getMessage("summary.title")}</Text>

      <View style={styles.statsRow}>
        <Text style={styles.reviewedText}>
          {getMessage("summary.cardsReviewed", {
            count: stats.cardsReviewedToday,
          })}
        </Text>
        <Text style={styles.masteredText}>
          {getMessage("summary.cardsMastered", {
            count: stats.cardsMasteredToday || 0,
          })}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getMessage("summary.badge")}</Text>
        </View>
        <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#1C1F24",
    borderWidth: 1.5,
    borderColor: "rgba(147, 197, 253, 0.2)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E5E7EB",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  reviewedText: {
    marginRight: 8,
    fontSize: 15,
    color: "#93C5FD",
  },
  masteredText: {
    fontSize: 15,
    color: "#45F6C3",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(253, 230, 138, 0.1)",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(253, 230, 138, 0.2)",
  },
  badgeText: {
    fontWeight: "600",
    color: "#FDE68A",
  },
  dateText: {
    fontSize: 12,
    color: "#6B7280",
  },
});

export default DailySummaryCard;
