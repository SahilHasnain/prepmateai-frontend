import { View, Text } from "react-native";

// Dopamine trigger: achievement badges
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
    <View className="flex-row flex-wrap gap-2 mb-4">
      {earnedBadges.map((badge, idx) => (
        <View
          key={idx}
          className="flex-row items-center px-3 py-1 bg-yellow-100 rounded-full"
        >
          <Text className="mr-1 text-base">{badge.emoji}</Text>
          <Text className="text-xs font-semibold text-yellow-800">
            {badge.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default AchievementBadge;
