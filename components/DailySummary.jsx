import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "./CircularProgress";
import StreakDisplay from "./StreakDisplay";
import AchievementBadge from "./molecules/AchievementBadge";

// Daily Progress Summary Banner - Dark mode with calming aesthetics
const DailySummary = ({ cardsReviewed, cardsMastered, streak, accuracy }) => {
  const stats = { cardsReviewed, accuracy: accuracy || 0, streak: streak || 0 };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Today's Progress</Text>
          <Text style={styles.reviewedText}>
            📚 {cardsReviewed} cards reviewed
          </Text>
          {cardsMastered > 0 && (
            <Text style={styles.masteredText}>✨ {cardsMastered} mastered</Text>
          )}
        </View>
        {accuracy > 0 && (
          <CircularProgress percentage={accuracy} size={60} strokeWidth={6} />
        )}
      </View>

      <View style={styles.footer}>
        <StreakDisplay streak={streak} />
        <AchievementBadge stats={stats} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#1C1F24",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#2A2D33",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#E5E7EB",
  },
  reviewedText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  masteredText: {
    fontSize: 14,
    color: "#45F6C3",
    marginTop: 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default DailySummary;
