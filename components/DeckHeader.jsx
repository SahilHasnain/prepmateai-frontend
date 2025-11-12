import { View, Text, TouchableOpacity } from "react-native";

const DeckHeader = ({ topic, nextReview, onBack, onShuffle, showShuffle }) => {
  return (
    <View className="p-4 bg-blue-500">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={onBack}
            className="mr-3"
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Text className="text-2xl text-white">←</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">
            {topic || "Flashcards"}
          </Text>
        </View>
        {showShuffle && (
          <TouchableOpacity
            onPress={onShuffle}
            className="px-3 py-1 bg-white/20 rounded-lg"
            accessibilityLabel="Shuffle cards"
            accessibilityRole="button"
          >
            <Text className="text-white">🔀</Text>
          </TouchableOpacity>
        )}
      </View>
      {nextReview && (
        <Text className="mt-2 text-sm text-white/80">
          Next review:{" "}
          {new Date(nextReview).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
    </View>
  );
};

export default DeckHeader;
