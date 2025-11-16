import { View, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import GradientButton from "../atoms/GradientButton";
import GhostButton from "../atoms/GhostButton";
import { colors, gradients } from "../../utils/colors";

/**
 * CompletionActions - CTA buttons for post-session actions
 *
 * Buttons:
 * 1. Review Mistakes (Primary - gradient g3)
 * 2. Set Reminder (Secondary - gradient g4)
 * 3. Finish for Now (Ghost - transparent)
 *
 * Props:
 * - onShowTimePicker: Handler to open reminder modal
 * - settingReminder: Boolean for loading state
 */

const CompletionActions = ({ onShowTimePicker, settingReminder }) => {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInUp.duration(600).delay(400)}
      style={styles.container}
    >
      {/* Primary: Review Mistakes */}
      <GradientButton
        gradient={gradients.g3}
        onPress={() => router.push("/(main)/flashcards")}
        shadowColor={colors.p1}
        accessibilityLabel="Review mistakes from this session"
      >
        🔍 Review Mistakes
      </GradientButton>

      {/* Secondary: Set Reminder */}
      <GradientButton
        gradient={gradients.g4}
        onPress={onShowTimePicker}
        disabled={settingReminder}
        shadowColor={colors.p2}
        accessibilityLabel="Set a reminder for next review"
        style={styles.secondaryButton}
      >
        {settingReminder ? "Setting..." : "⏳ Set a Reminder"}
      </GradientButton>

      {/* Ghost: Finish for Now */}
      <GhostButton
        onPress={() => router.push("/(main)/dashboard")}
        accessibilityLabel="Return to dashboard"
      >
        Finish for Now
      </GhostButton>
    </Animated.View>
  );
};

export default CompletionActions;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 30,
  },
  secondaryButton: {
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
});
