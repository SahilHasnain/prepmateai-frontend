import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { colors } from "../../utils/colors";

/**
 * CompletionHeader - Calm header for deck completion
 *
 * Philosophy:
 * - Process-oriented messaging
 * - "You showed up" > "You crushed it"
 * - Gentle reinforcement
 */

const CompletionHeader = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(800).delay(200)}
      style={styles.container}
    >
      <Text style={styles.heading}>Good work today. 🌱</Text>
      <Text style={styles.subtext}>
        You learned without forcing — that's real progress. ✨
      </Text>
    </Animated.View>
  );
};

export default CompletionHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 36,
  },
  heading: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.p4,
    marginBottom: 8,
    textAlign: "center",
  },
  subtext: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.p5,
    textAlign: "center",
    lineHeight: 22,
  },
});
