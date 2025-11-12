import { View, Text, TouchableOpacity, FlatList, RefreshControl, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo } from "react";
import { useRouter } from "expo-router";
import DeckCard from "../../components/DeckCard";
import DailySummary from "../../components/DailySummary";
import DeckSkeleton from "../../components/DeckSkeleton";
import { getDailyMessage } from "../../utils/messages";
import { useAuth } from "../../hooks/useAuth";
import { useFlashcardStats } from "../../hooks/useFlashcardStats";

function Flashcards() {
  const router = useRouter();
  const { user } = useAuth();
  const { stats, decks, loading, error, refresh, deleteDeck } = useFlashcardStats(user?.$id);
  const [message] = useState(getDailyMessage());
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeckPress = (topic) => {
    router.push(`/deckPlayer?topic=${encodeURIComponent(topic)}`);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const filteredDecks = useMemo(() => {
    if (!searchQuery.trim()) return decks;
    return decks.filter((deck) =>
      deck.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [decks, searchQuery]);

  const handleDelete = (deckId, topic) => {
    Alert.alert(
      "Delete Deck",
      `Are you sure you want to delete "${topic}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteDeck(deckId),
        },
      ]
    );
  };



  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 bg-blue-500">
        <Text className="text-2xl font-bold text-white">
          My Flashcard Decks
        </Text>
      </View>

      {/* Daily Message */}
      <View className="p-3 mx-4 mt-4 rounded-xl bg-blue-100">
        <Text className="text-center text-gray-800">{message}</Text>
      </View>

      {/* Search Bar */}
      {!loading && !error && decks.length > 0 && (
        <View className="px-4 mt-4">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search decks..."
            className="p-3 bg-white border border-gray-300 rounded-lg"
          />
        </View>
      )}

      {/* Error State */}
      {error && (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg text-red-600 mb-4">⚠️ {error}</Text>
          <TouchableOpacity
            onPress={refresh}
            className="px-6 py-3 bg-blue-500 rounded-lg"
          >
            <Text className="font-bold text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Skeleton Loading */}
      {!error && loading && (
        <View className="px-4 mt-4">
          <DeckSkeleton />
          <DeckSkeleton />
          <DeckSkeleton />
        </View>
      )}

      {/* Empty State */}
      {!error && !loading && decks.length === 0 && (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg font-semibold text-gray-700 mb-2">No decks yet 😅</Text>
          <Text className="text-gray-500 mb-4">Generate your first deck to start learning!</Text>
        </View>
      )}

      {/* No Search Results */}
      {!error && !loading && decks.length > 0 && filteredDecks.length === 0 && (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-lg font-semibold text-gray-700 mb-2">No results found</Text>
          <Text className="text-gray-500">Try a different search term</Text>
        </View>
      )}

      {/* Deck List */}
      {!error && !loading && filteredDecks.length > 0 && (
        <FlatList
          data={filteredDecks}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListHeaderComponent={
            stats && stats.cardsReviewedToday > 0 ? (
              <DailySummary
                cardsReviewed={stats.cardsReviewedToday}
                cardsMastered={stats.cardsMasteredToday}
                streak={stats.streak || 0}
                accuracy={stats.accuracy || 0}
              />
            ) : null
          }
          renderItem={({ item }) => (
            <DeckCard
              topic={item.topic}
              progress={item.progress}
              totalCards={item.totalCards}
              masteredCards={item.masteredCards}
              lastReviewed={item.lastReviewed}
              onPress={() => handleDeckPress(item.topic)}
              onDelete={() => handleDelete(item.deckId, item.topic)}
            />
          )}
          keyExtractor={(item) => item.deckId}
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
