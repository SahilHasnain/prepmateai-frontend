import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Atom: ProgressBar - animated horizontal progress indicator (dark mode)
const ProgressBar = ({ progress }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(`${progress * 100}%`, { duration: 500 }),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle, styles.fill]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    overflow: "hidden",
    backgroundColor: "#2A2D33",
    borderRadius: 14,
  },
  fill: {
    height: "100%",
    backgroundColor: "#45F6C3",
    borderRadius: 14,
  },
});

export default ProgressBar;
