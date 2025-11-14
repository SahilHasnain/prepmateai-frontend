import { View, Text, Animated } from "react-native";
import { getMessage } from "../../utils/messages";

/**
 * DailySummaryCard Component (Molecule)
 * Displays daily progress summary with dopamine-boosting design
 * Extracted from flashcards.jsx
 */
const DailySummaryCard = ({ stats, fadeAnim }) => {
  if (!stats || stats.cardsReviewedToday === 0) return null;

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="p-4 mx-4 mt-4 bg-white border border-blue-100 shadow-lg rounded-2xl"
    >
      <Text className="text-lg font-bold text-gray-800">
        {getMessage("summary.title")}
      </Text>

      <View className="flex-row items-center mt-2">
        <Text className="mr-2 text-base text-blue-600">
          {getMessage("summary.cardsReviewed", {
            count: stats.cardsReviewedToday,
          })}
        </Text>
        <Text className="text-base text-green-600">
          {getMessage("summary.cardsMastered", {
            count: stats.cardsMasteredToday || 0,
          })}
        </Text>
      </View>

      <View className="flex-row items-center justify-between mt-3">
        <View className="px-3 py-1 bg-yellow-100 rounded-full">
          <Text className="font-semibold text-yellow-700">
            {getMessage("summary.badge")}
          </Text>
        </View>
        <Text className="text-xs text-gray-400">
          {new Date().toLocaleDateString()}
        </Text>
      </View>
    </Animated.View>
  );
};

export default DailySummaryCard;
