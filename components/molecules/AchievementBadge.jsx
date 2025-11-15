import { View, Text, StyleSheet } from "react-native";

// Molecule: AchievementBadge - collection of earned badges based on stats (dark mode)
const badges = {
  focusHero: {
    emoji: "🎯",
    label: "Focus Hero",
    condition: (stats) => stats.cardsReviewed >= 20,
  },
  memoryPro: {
    emoji: "🧠",
    label: "Memory Pro",
    condition: (stats) => stats.accuracy >= 80,
  },
  consistencyKing: {
    emoji: "👑",
    label: "Consistency King",
    condition: (stats) => stats.streak >= 7,
  },
};

const AchievementBadge = ({ stats }) => {
  const earnedBadges = Object.values(badges).filter((badge) =>
    badge.condition(stats)
  );

  if (earnedBadges.length === 0) return null;

  return (
    <View style={styles.container}>
      {earnedBadges.map((badge, idx) => (
        <View key={idx} style={styles.badge}>
          <Text style={styles.emoji}>{badge.emoji}</Text>
          <Text style={styles.label}>{badge.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(253, 230, 138, 0.1)",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(253, 230, 138, 0.2)",
  },
  emoji: {
    marginRight: 4,
    fontSize: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FDE68A",
  },
});

export default AchievementBadge;
