import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

/**
 * ReminderModal Component (Molecule)
 * Time picker modal for setting daily reminders
 * Extracted from DeckCompleted.jsx
 */
const ReminderModal = ({
  visible,
  onClose,
  onConfirm,
  reminderTime,
  onTimeChange,
}) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 items-center justify-center bg-black/50">
      <View className="p-6 bg-white rounded-xl">
        <Text className="mb-4 text-lg font-bold text-center text-gray-800">
          Select Reminder Time
        </Text>
        <DateTimePicker
          value={reminderTime}
          mode="time"
          display="spinner"
          onChange={(event, selectedTime) => {
            if (selectedTime) {
              onTimeChange(selectedTime);
            }
          }}
        />
        <View className="flex-row justify-around mt-4">
          <TouchableOpacity
            onPress={onClose}
            className="px-6 py-2 bg-gray-300 rounded-lg"
            accessibilityLabel="Cancel"
            accessibilityRole="button"
          >
            <Text className="font-bold text-gray-800">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            className="px-6 py-2 bg-blue-500 rounded-lg"
            accessibilityLabel="Set reminder time"
            accessibilityRole="button"
          >
            <Text className="font-bold text-white">Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReminderModal;
