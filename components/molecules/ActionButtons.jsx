import { View, TouchableOpacity, ActivityIndicator, Text } from "react-native";

/**
 * ActionButtons Component (Molecule)
 * Reusable action button group for post-completion actions
 * Extracted from DeckCompleted.jsx
 */
const ActionButtons = ({
  onReviewMistakes,
  onSetReminder,
  settingReminder = false,
  showReviewMistakes = true,
}) => {
  return (
    <View className="w-full gap-3">
      {showReviewMistakes && (
        <TouchableOpacity
          onPress={onReviewMistakes}
          className="p-3 bg-purple-500 rounded-lg"
          accessibilityLabel="Review mistakes"
          accessibilityRole="button"
        >
          <Text className="font-bold text-center text-white">
            Review Mistakes
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={onSetReminder}
        disabled={settingReminder}
        className="p-3 bg-blue-500 rounded-lg"
        accessibilityLabel="Set reminder"
        accessibilityRole="button"
      >
        {settingReminder ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="font-bold text-center text-white">Set Reminder</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
