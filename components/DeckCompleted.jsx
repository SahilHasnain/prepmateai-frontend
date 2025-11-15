import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  FadeInUp,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import ReminderModal from "./molecules/ReminderModal";
import { colors } from "../utils/colors";

/**
 * DeckCompleted - Atomic Habits + Subtle Art Psychology
 *
 * Philosophy:
 * - No trophies, fireworks, or hype (avoids dopamine addiction)
 * - Calm reinforcement: "You showed up" > "You're the best!"
 * - Process over outcome: consistency, not intensity
 * - Gentle nudges: micro-text, soft animations
 * - Breathing room: spacious layout, no clustering
 */

const DeckCompleted = ({
  showTimePicker,
  onShowTimePicker,
  onHideTimePicker,
  reminderTime,
  setReminderTime,
  onSetReminder,
  settingReminder,
  reviewedCount,
  totalCards,
  streak,
  topic,
  greens = 0,
  yellows = 0,
  reds = 0,
}) => {
  const router = useRouter();

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
    <>
      <Animated.View
        entering={FadeInUp.duration(600).delay(100)}
        style={styles.container}
      >
        {/* Calm Header */}
        <Animated.View
          entering={FadeIn.duration(800).delay(200)}
          style={styles.header}
        >
          <Text style={styles.heading}>Good work today. 🌱</Text>
          <Text style={styles.subtext}>
            You learned without forcing — that's real progress. ✨
          </Text>
        </Animated.View>

        {/* Soft Card with Breathing Animation */}
        <Animated.View
          entering={FadeInUp.duration(700).delay(300)}
          style={[styles.card, breathingStyle]}
        >
          <Text style={styles.cardTitle}>🌼 Session complete</Text>

          <View style={styles.messageBlock}>
            <Text style={styles.message}>
              Consistency isn't intensity — it's showing up gently.
            </Text>
            <Text style={[styles.message, { marginTop: 12 }]}>
              You added another layer of clarity today. ✨
            </Text>
          </View>

          {/* Subtle Stats (non-judgmental) */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Reviewed</Text>
              <Text style={styles.statValue}>{reviewedCount}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Remembered</Text>
              <Text style={styles.statValue}>{greens}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>To revisit</Text>
              <Text style={styles.statValue}>{reds + yellows}</Text>
            </View>
          </View>
        </Animated.View>

        {/* CTAs */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(400)}
          style={styles.ctaContainer}
        >
          {/* Primary: Review Mistakes */}
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => router.push(`/(main)/flashcards`)}
            accessibilityLabel="Review mistakes from this session"
          >
            <Text style={styles.buttonTextPrimary}>🔍 Review Mistakes</Text>
          </TouchableOpacity>

          {/* Secondary: Set Reminder */}
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={onShowTimePicker}
            disabled={settingReminder}
            accessibilityLabel="Set a reminder for next review"
          >
            <Text style={styles.buttonTextSecondary}>
              {settingReminder ? "Setting..." : "⏳ Set a Reminder"}
            </Text>
          </TouchableOpacity>

          {/* Ghost: Finish for Now */}
          <TouchableOpacity
            style={styles.buttonGhost}
            onPress={() => router.push("/(main)/dashboard")}
            accessibilityLabel="Return to dashboard"
          >
            <Text style={styles.buttonTextGhost}>Finish for Now</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Micro-text footer */}
        <Animated.View
          entering={FadeIn.duration(1000).delay(500)}
          style={styles.footer}
        >
          <Text style={styles.microText}>
            Tiny reviews compound quietly — trust the process. 🌿
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Reminder Modal */}
      <ReminderModal
        visible={showTimePicker}
        onClose={onHideTimePicker}
        onConfirm={onSetReminder}
        reminderTime={reminderTime}
        onTimeChange={setReminderTime}
      />
    </>
  );
};

export default DeckCompleted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: colors.s1,
  },
  header: {
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.064,
    shadowRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
  },
  messageBlock: {
    marginBottom: 24,
  },
  message: {
    fontSize: 15,
    fontWeight: "400",
    color: "#4B5563",
    lineHeight: 24,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#9CA3AF",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },
  ctaContainer: {
    gap: 12,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonSecondary: {
    backgroundColor: colors.p2,
    shadowColor: colors.p2,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonGhost: {
    backgroundColor: "transparent",
  },
  buttonTextPrimary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonTextGhost: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.p5,
  },
  footer: {
    alignItems: "center",
    paddingTop: 16,
  },
  microText: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.p5,
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.8,
  },
});
