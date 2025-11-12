import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const DeckSkeleton = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle} className="p-4 mb-3 bg-white border-2 border-gray-200 rounded-xl">
      <View className="w-3/4 h-6 mb-3 bg-gray-200 rounded" />
      <View className="h-2 mb-2 bg-gray-200 rounded-full" />
      <View className="w-1/2 h-4 bg-gray-200 rounded" />
    </Animated.View>
  );
};

export default DeckSkeleton;
