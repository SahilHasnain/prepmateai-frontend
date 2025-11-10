import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import DeckCard from "../../components/DeckCard";
import DailySummary from "../../components/DailySummary";
import { getDailyMessage } from "../../utils/messages";

// Mock deck data
const MOCK_DECKS = [
  { id: "1", topic: "Thermodynamics", progress: 0.7, difficulty: "medium" },
  { id: "2", topic: "Kinematics", progress: 0.3, difficulty: "easy" },
  { id: "3", topic: "Organic Chemistry", progress: 1.0, difficulty: "hard" },
];

// Main Flashcards Screen
function Flashcards() {
  const router = useRouter();
  const [decks] = useState(MOCK_DECKS);
  const [loading] = useState(false);
  const [message] = useState(getDailyMessage());

  // Navigate to deck player
  const handleDeckPress = (topic) => {
    router.push(`/deckPlayer?topic=${encodeURIComponent(topic)}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 bg-blue-500">
        <Text className="text-2xl font-bold text-white">
          My Flashcard Decks
        </Text>
      </View>

      {/* Daily Motivational Message */}
      <View className="p-3 mx-4 mt-4 rounded-xl bg-blue-100">
        <Text className="text-center text-gray-800">{message}</Text>
      </View>

      {/* Deck List */}
      <FlatList
        data={decks}
        ListHeaderComponent={
          <DailySummary cardsReviewed={7} cardsMastered={3} />
        }
        renderItem={({ item }) => (
          <DeckCard
            topic={item.topic}
            progress={item.progress}
            difficulty={item.difficulty}
            onPress={() => handleDeckPress(item.topic)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => router.push("/new-deck")}
        className="absolute items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg bottom-6 right-6"
        accessibilityLabel="Add new deck"
        accessibilityRole="button"
      >
        <Text className="text-3xl font-bold text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Flashcards;
