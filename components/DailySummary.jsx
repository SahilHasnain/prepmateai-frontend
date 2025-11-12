import { View, Text } from "react-native";
import CircularProgress from "./CircularProgress";
import StreakDisplay from "./StreakDisplay";
import AchievementBadge from "./AchievementBadge";

// Daily Progress Summary Banner Component with dopamine triggers
const DailySummary = ({ cardsReviewed, cardsMastered, streak, accuracy }) => {
  const stats = { cardsReviewed, accuracy: accuracy || 0, streak: streak || 0 };

  return (
    <View className="p-4 mb-4 bg-white shadow-sm rounded-xl">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">
            Today's Progress
          </Text>
          <Text className="text-sm text-gray-600">
            📚 {cardsReviewed} cards reviewed
          </Text>
          {cardsMastered > 0 && (
            <Text className="text-sm text-green-600">
              ✨ {cardsMastered} mastered
            </Text>
          )}
        </View>
        {accuracy > 0 && (
          <CircularProgress percentage={accuracy} size={60} strokeWidth={6} />
        )}
      </View>

      <View className="flex-row items-center justify-between">
        <StreakDisplay streak={streak} />
        <AchievementBadge stats={stats} />
      </View>
    </View>
  );
};

export default DailySummary;
