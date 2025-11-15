import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors, gradients, shadows } from "../../utils/colors";

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
    backgroundColor: colors.s3,
    borderRadius: 14,
  },
  fill: {
    height: "100%",
    backgroundColor: colors.p1,
    borderRadius: 14,
  },
});

export default ProgressBar;
