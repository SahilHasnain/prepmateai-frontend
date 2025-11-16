import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { colors } from "../../utils/colors";

const DeckSkeleton = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <View style={styles.titleBar} />
      <View style={styles.progressBar} />
      <View style={styles.footerBar} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: colors.s2,
    borderWidth: 2,
    borderColor: colors.s3,
    borderRadius: 14,
  },
  titleBar: {
    width: "75%",
    height: 24,
    marginBottom: 12,
    backgroundColor: colors.s3,
    borderRadius: 6,
  },
  progressBar: {
    height: 8,
    marginBottom: 8,
    backgroundColor: colors.s3,
    borderRadius: 9999,
  },
  footerBar: {
    width: "50%",
    height: 16,
    backgroundColor: colors.s3,
    borderRadius: 6,
  },
});

export default DeckSkeleton;
