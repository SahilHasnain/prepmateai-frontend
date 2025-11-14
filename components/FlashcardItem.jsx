import { View, Text, TouchableOpacity } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";
import Badge from "./atoms/Badge";

// Flashcard Item Component with Flip Animation
const FlashcardItem = ({ question, answer, onFlip, difficulty = "medium" }) => {
  const rotation = useSharedValue(0);

  // Handle card flip
  const flipCard = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 500,
    });
    onFlip?.();
  };

  // Front side animation style
  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` },
    ],
    backfaceVisibility: "hidden",
  }));

  // Back side animation style
  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` },
    ],
    backfaceVisibility: "hidden",
  }));

  return (
    <TouchableOpacity
      onPress={flipCard}
      className="w-full h-96"
      accessibilityLabel="Tap to flip flashcard"
      accessibilityRole="button"
    >
      <View className="relative w-full h-full">
        {/* Front Side - Question */}
        <Animated.View
          style={frontStyle}
          className="absolute items-center justify-center w-full h-full p-6 bg-white shadow-lg rounded-2xl"
        >
          {/* Difficulty Badge - Top Right Corner */}
          <View className="absolute top-4 right-4">
            <Badge
              text={difficulty.toUpperCase()}
              variant={difficulty}
              size="small"
            />
          </View>

          <Text className="text-xl font-bold text-center text-gray-800">
            {question}
          </Text>
          <Text className="mt-4 text-sm text-gray-400">Tap to flip</Text>
        </Animated.View>

        {/* Back Side - Answer */}
        <Animated.View
          style={backStyle}
          className="absolute items-center justify-center w-full h-full p-6 bg-white shadow-lg rounded-2xl"
        >
          <Text className="text-lg text-center text-gray-700">{answer}</Text>
          <Text className="mt-4 text-sm text-gray-400">Tap to flip</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default FlashcardItem;
