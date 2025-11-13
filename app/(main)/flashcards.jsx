import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import DeckSkeleton from "../../components/DeckSkeleton";
import HeaderHero from "../../components/HeaderHero";
import SearchBar from "../../components/SearchBar";
import Fab from "../../components/Fab";
import EmptyState from "../../components/EmptyState";
import DeckCardItem from "../../components/DeckCardItem";
import { getMessage, getDailyMessage } from "../../utils/messages";
import { useAuth } from "../../hooks/useAuth";
import { useFlashcardStats } from "../../hooks/useFlashcardStats";

function Flashcards() {
  const router = useRouter();
  const { user } = useAuth();
  const { stats, decks, loading, error, refresh, deleteDeck } =
    useFlashcardStats(user?.$id);
  const [message] = useState(getDailyMessage());
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const subtitleFadeAnim = useRef(new Animated.Value(0)).current;
  const fabRotateAnim = useRef(new Animated.Value(0)).current;

  // Fade-in animation for progress card
  useEffect(() => {
    if (stats && stats.cardsReviewedToday > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [stats?.cardsReviewedToday]);

  // Subtitle gentle fade-in animation
  useEffect(() => {
    Animated.timing(subtitleFadeAnim, {
      toValue: 1,
      duration: 800,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

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
      getMessage("delete.title"),
      getMessage("delete.message", { topic }),
      [
        { text: getMessage("delete.cancel"), style: "cancel" },
        {
          text: getMessage("delete.confirm"),
          style: "destructive",
          onPress: () => deleteDeck(deckId),
        },
      ]
    );
  };

  const handleFabPress = () => {
    Animated.sequence([
      Animated.timing(fabRotateAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fabRotateAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    router.push("/new-deck");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Sticky Header */}
      <HeaderHero stats={stats} subtitleFadeAnim={subtitleFadeAnim} />

      {/* Sticky Search Bar (only show when decks exist) */}
      {!loading && !error && decks.length > 0 && (
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      )}

      {/* Daily Message */}
      <View className="p-3 mx-4 mt-4 bg-blue-100 border border-blue-200 rounded-xl">
        <Text className="text-center text-gray-800">{message}</Text>
      </View>

      {/* Error State */}
      {error && (
        <View className="items-center justify-center flex-1 px-6">
          <Text className="mb-4 text-lg text-red-600">⚠️ {error}</Text>
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

      {/* Premium calm empty state – emotional onboarding for first-time learners */}
      {!error && !loading && decks.length === 0 && (
        <EmptyState onCreateDeck={() => router.push("/new-deck")} />
      )}

      {/* No Search Results */}
      {!error && !loading && decks.length > 0 && filteredDecks.length === 0 && (
        <View className="items-center justify-center flex-1 px-6">
          <Text className="mb-2 text-lg font-semibold text-gray-700">
            {getMessage("noResults.title")}
          </Text>
          <Text className="text-gray-500">
            {getMessage("noResults.subtitle")}
          </Text>
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
              // Dopamine summary card – visual reward for consistency
              <Animated.View
                style={{ opacity: fadeAnim }}
                className="p-4 mx-4 mt-4 bg-white border border-blue-100 shadow-lg rounded-2xl"
              >
                <Text className="text-lg font-bold text-gray-800">
                  {getMessage("summary.title")}
                </Text>

                <View className="flex-row items-center mt-2">
                  <Text className="mr-2 text-base text-blue-600">
                    {getMessage("summary.cardsReviewed", {
                      count: stats.cardsReviewedToday,
                    })}
                  </Text>
                  <Text className="text-base text-green-600">
                    {getMessage("summary.cardsMastered", {
                      count: stats.cardsMasteredToday || 0,
                    })}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between mt-3">
                  <View className="px-3 py-1 bg-yellow-100 rounded-full">
                    <Text className="font-semibold text-yellow-700">
                      {getMessage("summary.badge")}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-400">
                    {new Date().toLocaleDateString()}
                  </Text>
                </View>
              </Animated.View>
            ) : null
          }
          renderItem={({ item }) => (
            <DeckCardItem
              deck={item}
              onPress={() => handleDeckPress(item.topic)}
              onDelete={() => handleDelete(item.deckId, item.topic)}
            />
          )}
          keyExtractor={(item) => item.deckId}
          contentContainerStyle={{ padding: 16 }}
          ListFooterComponent={
            <Text className="mt-6 mb-12 text-center text-gray-400">
              {getMessage("footer.quote")}
            </Text>
          }
        />
      )}

      {/* FAB - Floating Action Button */}
      <Fab onPress={handleFabPress} rotateAnim={fabRotateAnim} />
    </SafeAreaView>
  );
}

export default Flashcards;
