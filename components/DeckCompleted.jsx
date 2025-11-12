import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import LottieView from "lottie-react-native";
import CircularProgress from "./CircularProgress";
import AchievementBadge from "./AchievementBadge";
import StreakDisplay from "./StreakDisplay";
import { getRandomQuote } from "../utils/motivationalQuotes";
import { playSuccessSound } from "../utils/soundEffects";

// dopamine booster achievement screen after deck completion

const DeckCompleted = ({
  showTimePicker,
  setShowTimePicker,
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
      <View className="items-center px-6 mb-6">
        {/* Trophy Animation */}
        <LottieView
          source={require("../assets/Trophy.json")}
          autoPlay
          loop={false}
          style={{ width: 200, height: 200, alignSelf: "center", marginBottom: 16 }}
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
        <View className="w-full gap-3">
          <TouchableOpacity
            onPress={() => router.push(`/(main)/review?topic=${topic}`)}
            className="p-3 bg-purple-500 rounded-lg"
            accessibilityLabel="Review mistakes"
            accessibilityRole="button"
          >
            <Text className="font-bold text-center text-white">
              Review Mistakes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            disabled={settingReminder}
            className="p-3 bg-blue-500 rounded-lg"
            accessibilityLabel="Set reminder"
            accessibilityRole="button"
          >
            {settingReminder ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-bold text-center text-white">
                Set Reminder
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {showTimePicker && (
        <View className="absolute inset-0 items-center justify-center bg-black/50">
          <View className="p-6 bg-white rounded-xl">
            <Text className="mb-4 text-lg font-bold text-center">
              Select Reminder Time
            </Text>
            <DateTimePicker
              value={reminderTime}
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                if (selectedTime) {
                  setReminderTime(selectedTime);
                }
              }}
            />
            <View className="flex-row justify-around mt-4">
              <TouchableOpacity
                onPress={() => setShowTimePicker(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg"
                accessibilityLabel="Cancel"
                accessibilityRole="button"
              >
                <Text className="font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSetReminder}
                className="px-6 py-2 bg-blue-500 rounded-lg"
                accessibilityLabel="Set reminder time"
                accessibilityRole="button"
              >
                <Text className="font-bold text-white">Set</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default DeckCompleted;
