import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Atom: ProgressBar - animated horizontal progress indicator
const ProgressBar = ({ progress }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progress * 100}%`, { duration: 500 }),
  }));

  return (
    <View className="h-1.5 overflow-hidden bg-gray-200 rounded-xl">
      <Animated.View style={animatedStyle} className="h-full bg-blue-500" />
    </View>
  );
};

export default ProgressBar;
