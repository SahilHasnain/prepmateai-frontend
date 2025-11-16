import { View, Text, StyleSheet } from "react-native";
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import StatBadge from "../atoms/StatBadge";
import { colors } from "../../utils/colors";

/**
 * SessionStatsCard - Stats display with breathing animation
 *
 * Features:
 * - Soft breathing effect (1.0 → 1.02 → 1.0 scale)
 * - Dark theme card (s2 background, s3 border)
 * - Non-judgmental stat display
 *
 * Props:
 * - reviewedCount: Total cards reviewed
 * - greens: Cards remembered
 * - yellows: Cards unsure
 * - reds: Cards forgot
 */

const SessionStatsCard = ({ reviewedCount, greens, yellows, reds }) => {
  // Breathing animation (calm, slow, therapeutic)
  const breatheScale = useSharedValue(1);

  useEffect(() => {
    breatheScale.value = withRepeat(
      withSequence(
        withTiming(1.02, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1, // infinite
      false
    );
  }, []);

  const breathingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breatheScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInUp.duration(700).delay(300)}
      style={[styles.card, breathingStyle]}
    >
      <Text style={styles.title}>🌼 Session complete</Text>

      <View style={styles.messageBlock}>
        <Text style={styles.message}>
          Consistency isn't intensity — it's showing up gently.
        </Text>
        <Text style={[styles.message, { marginTop: 12 }]}>
          You added another layer of clarity today. ✨
        </Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <StatBadge label="Reviewed" value={reviewedCount} />
        <View style={styles.divider} />
        <StatBadge label="Remembered" value={greens} />
        <View style={styles.divider} />
        <StatBadge label="To revisit" value={reds + yellows} />
      </View>
    </Animated.View>
  );
};

export default SessionStatsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.s2,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.s3,
    padding: 24,
    marginBottom: 30,
    shadowColor: colors.p1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.p4,
    marginBottom: 20,
    textAlign: "center",
  },
  messageBlock: {
    marginBottom: 24,
  },
  message: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.p5,
    lineHeight: 24,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.s3,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.s3,
  },
});
