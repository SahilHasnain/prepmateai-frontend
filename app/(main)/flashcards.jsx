import { View, Text, Alert, Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import DeckSkeleton from "../../components/DeckSkeleton";
import HeaderHero from "../../components/HeaderHero";
import SearchBar from "../../components/SearchBar";
import Fab from "../../components/Fab";
import EmptyState from "../../components/EmptyState";
import CardList from "../../components/organisms/CardList";
import ErrorState from "../../components/atoms/ErrorState";
import { getMessage, getDailyMessage } from "../../utils/messages";
import { useAuth } from "../../hooks/useAuth";
import { useFlashcardStats } from "../../hooks/useFlashcardStats";
import { colors, gradients } from "../../utils/colors";

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
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Sticky Header */}
      <HeaderHero stats={stats} subtitleFadeAnim={subtitleFadeAnim} />

      {/* Sticky Search Bar (only show when decks exist) */}
      {!loading && !error && decks.length > 0 && (
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      )}

      {/* Daily Message */}
      <View style={styles.messageCard}>
        <Text style={styles.messageText}>{message}</Text>
      </View>

      {/* Error State */}
      {error && <ErrorState error={error} onRetry={refresh} />}

      {/* Skeleton Loading */}
      {!error && loading && (
        <View style={styles.skeletonContainer}>
          <DeckSkeleton />
          <DeckSkeleton />
          <DeckSkeleton />
        </View>
      )}

      {/* Premium calm empty state */}
      {!error && !loading && decks.length === 0 && (
        <EmptyState onCreateDeck={() => router.push("/new-deck")} />
      )}

      {/* No Search Results */}
      {!error && !loading && decks.length > 0 && filteredDecks.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsTitle}>
            {getMessage("noResults.title")}
          </Text>
          <Text style={styles.noResultsSubtitle}>
            {getMessage("noResults.subtitle")}
          </Text>
        </View>
      )}

      {/* Deck List */}
      {!error && !loading && filteredDecks.length > 0 && (
        <CardList
          decks={filteredDecks}
          stats={stats}
          fadeAnim={fadeAnim}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onDeckPress={handleDeckPress}
          onDelete={handleDelete}
        />
      )}

      {/* FAB - Floating Action Button */}
      <Fab onPress={handleFabPress} rotateAnim={fabRotateAnim} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.s1,
  },
  messageCard: {
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "rgba(147, 197, 253, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(147, 197, 253, 0.2)",
    borderRadius: 14,
  },
  messageText: {
    textAlign: "center",
    color: colors.p2,
    fontSize: 14,
    lineHeight: 20,
  },
  skeletonContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  noResultsTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "600",
    color: colors.p4,
  },
  noResultsSubtitle: {
    color: colors.p5,
    fontSize: 15,
  },
});

export default Flashcards;
