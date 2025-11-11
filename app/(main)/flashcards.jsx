// Imports
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import DeckCard from "../../components/DeckCard";
import DailySummary from "../../components/DailySummary";
import Button from "../../components/Button";
import { getDailyMessage } from "../../utils/messages";
import { NODE_API_BASE_URL } from "../../config/env";
import { useAuth } from "../../hooks/useAuth";

// Main Flashcards Screen
function Flashcards() {
  const router = useRouter();
  const { user } = useAuth();
  
  // State
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message] = useState(getDailyMessage());

  // Fetch real decks from backend instead of mock data
  useEffect(() => {
    const loadDecks = async () => {
      if (!user?.$id) return;
      
      try {
        const res = await fetch(`${NODE_API_BASE_URL}/api/flashcards/decks/${user.$id}`);
        const json = await res.json();
        if (json.success) setDecks(json.data);
      } catch (e) {
        Alert.alert('Error', 'Failed to load flashcards');
      } finally {
        setLoading(false);
      }
    };
    loadDecks();
  }, [user]);

  // Navigate to deck player
  const handleDeckPress = (topic) => {
    router.push(`/deckPlayer?topic=${encodeURIComponent(topic)}`);
  };

  // Consistent CTA for generating new flashcards (same behavior everywhere)
  const GenerateDeckButton = () => (
    <View className="mb-4">
      <Button title="Generate Deck" onPress={() => router.push('/new-deck')} />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
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

      {/* Render */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      ) : decks.length === 0 ? (
        // Empty state
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg font-semibold text-gray-700 mb-2">No decks yet 😅</Text>
          <Text className="text-gray-500 mb-4">Generate your first deck to start learning!</Text>
          <GenerateDeckButton />
        </View>
      ) : (
        // Deck List
        <FlatList
          data={decks}
          ListHeaderComponent={
            <>
              <DailySummary cardsReviewed={7} cardsMastered={3} />
              <GenerateDeckButton />
            </>
          }
          renderItem={({ item }) => (
            <DeckCard
              topic={item.topic}
              progress={item.progress || 0}
              difficulty={item.difficulty || "medium"}
              onPress={() => handleDeckPress(item.topic)}
            />
          )}
          keyExtractor={(item) => item.$id || item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => router.push("/new-deck")}
        className="absolute items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg bottom-6 right-6"
        accessibilityLabel="Add new deck"
        accessibilityRole="button"
      >
        <Text className="text-3xl font-bold text-white">+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Flashcards;
