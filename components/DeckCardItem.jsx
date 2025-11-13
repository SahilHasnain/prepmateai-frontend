import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { getProgressFeedback } from "../utils/messages";

/**
 * DeckCard Component
 * Individual deck card with animated progress bar and left accent border
 * White background with calm color-coded progress indicators
 */
const DeckCard = ({ deck, onPress, onDelete }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animate progress bar width on mount or progress change
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: deck.progress,
      duration: 600,
      useNativeDriver: false, // width animation requires layout
    }).start();
  }, [deck.progress]);

  // Color mapping based on progress (calm, desaturated colors)
  const leftBorderColor =
    deck.progress >= 1
      ? "#9ff0bf" // green-300 (-10% saturation)
      : deck.progress >= 0.6
        ? "#fde66d" // yellow-300 (-10% saturation)
        : "#fcb8b8"; // red-300 (-10% saturation)

  const progressBarColor =
    deck.progress >= 1
      ? "#9ff0bf" // green-300 (reduced saturation)
      : deck.progress >= 0.6
        ? "#fde66d" // yellow-300 (reduced saturation)
        : "#fcb8b8"; // red-300 (reduced saturation)

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="p-4 mb-6 bg-white shadow-sm rounded-2xl"
      style={{
        borderLeftWidth: 4,
        borderLeftColor: leftBorderColor,
      }}
    >
      <View className="flex-row items-start justify-between mb-3">
        <Text className="flex-1 pr-2 text-lg font-bold text-gray-800">
          {deck.topic}
        </Text>
        <TouchableOpacity onPress={onDelete} style={{ opacity: 0.5 }}>
          <Text className="text-lg text-gray-400">🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* Animated Progress Bar */}
      <View className="h-2 overflow-hidden bg-gray-200 rounded-full">
        <Animated.View
          className="h-full rounded-full"
          style={{
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
            backgroundColor: progressBarColor,
          }}
        />
      </View>

      {/* Progress Feedback Text */}
      <Text className="mt-2 text-xs italic text-gray-500">
        {getProgressFeedback(deck.progress)}
      </Text>
    </TouchableOpacity>
  );
};

export default DeckCard;
