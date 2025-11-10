import { View, Text, TouchableOpacity } from 'react-native';

// Flashcard Feedback Buttons Component
const FlashcardFeedback = ({ onRemember, onMaybe, onForgot }) => {
  return (
    <View className="flex-row items-center justify-center">
      {/* Forgot Button */}
      <TouchableOpacity onPress={onForgot} className="p-3 mx-2 bg-red-500 rounded-full">
        <Text className="text-2xl">❌</Text>
      </TouchableOpacity>

      {/* Not Sure Button */}
      <TouchableOpacity onPress={onMaybe} className="p-3 mx-2 bg-yellow-500 rounded-full">
        <Text className="text-2xl">🤔</Text>
      </TouchableOpacity>

      {/* Remembered Button */}
      <TouchableOpacity onPress={onRemember} className="p-3 mx-2 bg-green-500 rounded-full">
        <Text className="text-2xl">✅</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlashcardFeedback;
