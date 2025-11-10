import { View, Text } from "react-native";

// Daily Progress Summary Banner Component
const DailySummary = ({ cardsReviewed, cardsMastered }) => {
  return (
    <View className="p-3 mb-4 rounded-xl bg-blue-100">
      <Text className="text-center text-gray-800">
        🔥 You reviewed {cardsReviewed} cards today – keep going!
      </Text>
      {cardsMastered > 0 && (
        <Text className="mt-1 text-sm text-center text-gray-600">
          ✨ {cardsMastered} mastered
        </Text>
      )}
    </View>
  );
};

export default DailySummary;
