import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DeckCompleted = ({
  showTimePicker,
  setShowTimePicker,
  reminderTime,
  setReminderTime,
  onSetReminder,
  settingReminder,
}) => {
  return (
    <>
      <View className="px-6 mb-6">
        <Text className="mb-4 text-lg font-bold text-center text-gray-800">
          🎉 Deck Completed!
        </Text>
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
