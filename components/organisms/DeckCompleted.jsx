import { View, StyleSheet } from "react-native";
import Animated, { FadeInUp, FadeIn } from "react-native-reanimated";
import CompletionHeader from "../molecules/CompletionHeader";
import SessionStatsCard from "../molecules/SessionStatsCard";
import CompletionActions from "../molecules/CompletionActions";
import FooterText from "../atoms/FooterText";
import ReminderModal from "../molecules/ReminderModal";
import { colors } from "../../utils/colors";

/**
 * DeckCompleted - Atomic Habits + Subtle Art Psychology
 *
 * Philosophy:
 * - No trophies, fireworks, or hype (avoids dopamine addiction)
 * - Calm reinforcement: "You showed up" > "You're the best!"
 * - Process over outcome: consistency, not intensity
 * - Gentle nudges: micro-text, soft animations
 * - Breathing room: spacious layout, no clustering
 *
 * Architecture:
 * - Organism composed of molecules/atoms
 * - Each child component has single responsibility
 * - Clean separation of concerns
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
  greens = 0,
  yellows = 0,
  reds = 0,
}) => {
  return (
    <>
      <Animated.View
        entering={FadeInUp.duration(600).delay(100)}
        style={styles.container}
      >
        {/* Calm Header */}
        <CompletionHeader />

        {/* Stats Card with Breathing Animation */}
        <SessionStatsCard
          reviewedCount={reviewedCount}
          greens={greens}
          yellows={yellows}
          reds={reds}
        />

        {/* CTA Buttons */}
        <CompletionActions
          onShowTimePicker={onShowTimePicker}
          settingReminder={settingReminder}
        />

        {/* Micro-text Footer */}
        <Animated.View
          entering={FadeIn.duration(1000).delay(500)}
          style={styles.footer}
        >
          <FooterText>
            Tiny reviews compound quietly — trust the process. 🌿
          </FooterText>
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
  footer: {
    alignItems: "center",
    paddingTop: 16,
  },
});
