import { View, Text } from "react-native";
import IconButton from "./atoms/IconButton";

const DeckHeader = ({ topic, nextReview, onBack, onShuffle, showShuffle }) => {
  return (
    <View className="p-4 bg-blue-500">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <IconButton
            icon="←"
            onPress={onBack}
            variant="transparent"
            size="large"
            accessibilityLabel="Go back"
          />
          <Text className="ml-2 text-xl font-bold text-white">
            {topic || "Flashcards"}
          </Text>
        </View>
        {showShuffle && (
          <IconButton
            icon="🔀"
            onPress={onShuffle}
            variant="transparent"
            size="medium"
            accessibilityLabel="Shuffle cards"
          />
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
