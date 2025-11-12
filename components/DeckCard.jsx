import { View, Text, TouchableOpacity } from "react-native";
import { useCallback, useMemo } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const DeckCard = ({ topic, progress, totalCards, masteredCards, lastReviewed, onPress, onDelete }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1);
  }, [scale]);

  const getBorderColor = () => {
    if (progress >= 0.7) return "border-green-400";
    if (progress >= 0.4) return "border-yellow-400";
    return "border-red-400";
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className={`p-4 mb-3 bg-white border-2 rounded-xl ${getBorderColor()}`}
      >
        <View className="flex-row items-center justify-between mb-3">
          <Text className="flex-1 text-lg font-semibold text-gray-800">{topic}</Text>
          {onDelete && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2"
            >
              <Text className="text-red-500">🗑️</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="h-2 mb-2 overflow-hidden bg-gray-200 rounded-full">
          <View
            className="h-full bg-blue-500"
            style={{ width: `${progress * 100}%` }}
          />
        </View>

        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-600">
            {masteredCards}/{totalCards} Mastered
          </Text>
          {lastReviewed && (
            <Text className="text-xs text-gray-400">
              {new Date(lastReviewed).toLocaleDateString()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DeckCard;
