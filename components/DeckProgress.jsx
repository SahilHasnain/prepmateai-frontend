import { View, Text } from "react-native";

const DeckProgress = ({ reviewedCount, remainingCount, offlineCount }) => {
  return (
    <View className="items-center pb-6">
      <Text className="text-lg font-medium text-gray-600">
        {reviewedCount} reviewed • {remainingCount} remaining
      </Text>
      {offlineCount > 0 && (
        <Text className="mt-1 text-sm text-orange-600">
          📡 {offlineCount} pending sync
        </Text>
      )}
    </View>
  );
};

export default DeckProgress;
