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
}) => {
  const router = useRouter();
  const percentage =
    totalCards > 0 ? Math.round((reviewedCount / totalCards) * 100) : 0;
  const randomMessage = getRandomQuote();
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

          {/* Circular Progress */}
          <View className="items-center mb-4">
            <CircularProgress
              percentage={percentage}
              size={100}
              strokeWidth={10}
            />
            <Text className="mt-2 text-sm text-gray-600">
              {reviewedCount} / {totalCards} cards
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

          {/* Motivational Quote */}
          <Text className="text-base font-medium text-center text-blue-600">
            {randomMessage}
          </Text>
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
              📝 Review Mistakes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            disabled={settingReminder}
            className="p-3 bg-blue-500 rounded-lg"
            accessibilityLabel="Set daily reminder"
            accessibilityRole="button"
          >
            {settingReminder ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-bold text-center text-white">
                ⏰ Set Daily Reminder
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
