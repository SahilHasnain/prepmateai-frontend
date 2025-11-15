import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import LottieView from "lottie-react-native";
import CircularProgress from "./CircularProgress";
import AchievementBadge from "./molecules/AchievementBadge";
import StreakDisplay from "./StreakDisplay";
import ActionButtons from "./molecules/ActionButtons";
import ReminderModal from "./molecules/ReminderModal";
import { playSuccessSound } from "../utils/soundEffects";
import { colors } from "../utils/colors";

// dopamine booster achievement screen after deck completion

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

  // Motivational result system - replaces numeric score with positive reinforcement
  // Inspired by mastery learning psychology (low anxiety, high consistency)
  const score = totalCards > 0 ? (greens * 1 + yellows * 0.5) / totalCards : 0;

  let message, bgGradient;
  if (score >= 0.85) {
    message = "🔥 Outstanding recall! You're mastering this topic.";
    bgGradient = "bg-gradient-to-r from-blue-100 to-blue-200";
  } else if (score >= 0.6) {
    message = "💪 Good job! A few cards need a quick review.";
    bgGradient = "bg-gradient-to-r from-yellow-100 to-yellow-200";
  } else {
    message = "📘 Keep going! Every try makes you smarter.";
    bgGradient = "bg-gradient-to-r from-gray-100 to-gray-200";
  }

  const percentage = Math.round(score * 100);
  const stats = { cardsReviewed: reviewedCount, accuracy: percentage, streak };

  useEffect(() => {
    playSuccessSound();
  }, []);

  return (
    <>
      {/* subtle enter animation to celebrate completion without being distracting */}
      <Animated.View
        entering={FadeInUp.duration(350)}
        className="items-center px-6 mb-6"
      >
        {/* Trophy Animation */}
        <LottieView
          source={require("../assets/Trophy.json")}
          autoPlay
          loop={false}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginBottom: 16,
          }}
        />

        {/* Summary Card */}
        <View className="w-full p-6 mb-4 bg-white shadow-sm rounded-2xl">
          <Text className="mb-4 text-2xl font-bold text-center text-gray-800">
            🎉 Deck Completed!
          </Text>

          {/* Motivational Message */}
          <View className={`p-4 mb-4 rounded-xl ${bgGradient}`}>
            <Text className="text-lg font-bold text-center text-gray-800">
              {message}
            </Text>
            <Text className="mt-2 text-sm text-center text-gray-600">
              You're getting sharper with every deck! 🔥
            </Text>
          </View>

          {/* Streak Display */}
          <View className="items-center mb-4">
            <StreakDisplay streak={streak} />
          </View>

          {/* Achievement Badges */}
          <View className="items-center mb-3">
            <AchievementBadge stats={stats} />
          </View>
        </View>

        {/* Action Buttons */}
        <ActionButtons
          onReviewMistakes={() => router.push(`/(main)/review?topic=${topic}`)}
          onSetReminder={onShowTimePicker}
          settingReminder={settingReminder}
        />
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
