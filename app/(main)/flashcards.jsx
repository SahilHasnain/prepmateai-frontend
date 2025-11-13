import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  TextInput,
  Alert,
  Animated,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import DeckSkeleton from "../../components/DeckSkeleton";
import { getDailyMessage } from "../../utils/messages";
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

  // Microcopy revamp – each line motivates and reassures the student
  const getMasteryText = (masteredCards, totalCards) => {
    const progress = masteredCards / totalCards;
    if (progress >= 1) return "🎯 Fully Mastered!";
    if (progress >= 0.6) return "🔥 Making progress!";
    return "🌱 Growing stronger!";
  };

  // Honest motivation system — real encouragement, no fake praise.
  const getProgressFeedback = (progress) => {
    if (progress === 1.0) return "🎯 Fully mastered! Brilliant work!";
    if (progress >= 0.76) return "⚡ Almost there! Great focus today!";
    if (progress >= 0.51) return "🔥 Making real progress — you're on track!";
    if (progress >= 0.26)
      return "💪 You're warming up — keep that spark alive!";
    return "🌱 Just getting started — every step counts.";
  };

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
    Alert.alert("Delete Deck", `Are you sure you want to delete "${topic}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteDeck(deckId),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Final dopamine-balanced polish – calm, friendly, focus-centric */}
      <LinearGradient
        colors={["#6366f1", "#8b5cf6", "#a78bfa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="relative px-6 py-6 mb-4 rounded-b-3xl"
        style={{
          shadowColor: "#6366f1",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 1 },
          elevation: 2,
        }}
      >
        <LottieView
          source={require("../../assets/header-glow.json")}
          autoPlay
          loop={false}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.15,
          }}
        />

        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-2xl font-semibold text-white">
              Welcome back! 📚
            </Text>
            <Animated.Text
              className="mt-1.5 text-sm text-indigo-100 leading-5"
              style={{ opacity: subtitleFadeAnim }}
            >
              Every revision brings you closer to your goal
            </Animated.Text>
          </View>
          {stats && stats.streak > 0 && (
            <View className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20">
              <Text className="text-xs font-medium text-amber-200">
                {stats.streak} day streak
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>

      {/* Daily Message */}
      <View className="p-3 mx-4 mt-4 bg-blue-100 border border-blue-200 rounded-xl">
        <Text className="text-center text-gray-800">{message}</Text>
      </View>

      {/* Friendly discovery search bar with calm dopamine tone. */}
      {!loading && !error && decks.length > 0 && (
        <View className="px-4 mt-4">
          <View
            className="flex-row items-center px-4 py-3 rounded-2xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              shadowColor: "#6366f1",
              shadowOpacity: 0.04,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Feather name="search" size={20} color="#9ca3af" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="🔍 Search or explore new topics..."
              placeholderTextColor="#9ca3af"
              className="flex-1 ml-3 text-gray-700"
              style={{ fontSize: 15 }}
            />
          </View>
        </View>
      )}

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
        <View
          className="items-center justify-center flex-1 px-6"
          style={{ marginTop: -20 }}
        >
          {/* Illustration */}
          <View className="items-center">
            <Text style={{ fontSize: 80, lineHeight: 90 }}>📚</Text>
            <View
              className="px-6 py-2 bg-white rounded-full"
              style={{
                marginTop: 10,
                shadowColor: "#6366f1",
                shadowOpacity: 0.1,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 3,
              }}
            >
              <Text className="text-xs font-medium text-indigo-500">
                Your journey starts here
              </Text>
            </View>
          </View>

          {/* Big Title */}
          <Text
            className="mb-2 text-2xl font-bold text-center text-gray-800"
            style={{ marginTop: 24 }}
          >
            Let's build your first deck! 🌱
          </Text>

          {/* Subtitle */}
          <Text
            className="max-w-xs text-base leading-6 text-center text-gray-500"
            style={{ marginBottom: 24 }}
          >
            Every big rank starts with the first small step.
          </Text>

          {/* CTA Button */}
          <TouchableOpacity
            onPress={() => router.push("/new-deck")}
            activeOpacity={0.8}
            style={{ marginTop: 12 }}
          >
            <LinearGradient
              colors={["#6366f1", "#8b5cf6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 32,
                borderRadius: 12,
                shadowColor: "#6366f1",
                shadowOpacity: 0.2,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 5,
              }}
            >
              <Text className="text-base font-semibold text-center text-white">
                📘 Create your first deck
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Helper text */}
          <Text
            className="text-xs text-center text-gray-400"
            style={{ marginTop: 16 }}
          >
            Start with any topic you want to master
          </Text>
        </View>
      )}

      {/* No Search Results */}
      {!error && !loading && decks.length > 0 && filteredDecks.length === 0 && (
        <View className="items-center justify-center flex-1 px-6">
          <Text className="mb-2 text-lg font-semibold text-gray-700">
            No results found
          </Text>
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
              // Dopamine summary card – visual reward for consistency
              <Animated.View
                style={{ opacity: fadeAnim }}
                className="p-4 mx-4 mt-4 bg-white border border-blue-100 shadow-lg rounded-2xl"
              >
                <Text className="text-lg font-bold text-gray-800">
                  ⚡ Keep your streak alive!
                </Text>

                <View className="flex-row items-center mt-2">
                  <Text className="mr-2 text-base text-blue-600">
                    📘 {stats.cardsReviewedToday} cards reviewed
                  </Text>
                  <Text className="text-base text-green-600">
                    ✨ {stats.cardsMasteredToday || 0} mastered
                  </Text>
                </View>

                <View className="flex-row items-center justify-between mt-3">
                  <View className="px-3 py-1 bg-yellow-100 rounded-full">
                    <Text className="font-semibold text-yellow-700">
                      🏅 Focus Hero
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-400">
                    {new Date().toLocaleDateString()}
                  </Text>
                </View>
              </Animated.View>
            ) : null
          }
          renderItem={({ item }) => {
            // calm dopamine design – emotional encouragement with visual clarity
            const leftBorderColor =
              item.progress >= 1
                ? "#9ff0bf" // green-300 (-10% saturation)
                : item.progress >= 0.6
                  ? "#fde66d" // yellow-300 (-10% saturation)
                  : "#fcb8b8"; // red-300 (-10% saturation)

            const progressBarColor =
              item.progress >= 1
                ? "#9ff0bf" // green-300 (reduced saturation)
                : item.progress >= 0.6
                  ? "#fde66d" // yellow-300 (reduced saturation)
                  : "#fcb8b8"; // red-300 (reduced saturation)

            return (
              <Pressable
                onPress={() => handleDeckPress(item.topic)}
                className="p-4 mb-6 bg-white shadow-sm rounded-2xl"
                style={{ borderLeftWidth: 4, borderLeftColor: leftBorderColor }}
              >
                <View className="flex-row items-start justify-between mb-3">
                  <Text className="flex-1 pr-2 text-lg font-bold text-gray-800">
                    {item.topic}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.deckId, item.topic)}
                    style={{ opacity: 0.5 }}
                  >
                    <Text className="text-lg text-gray-400">🗑️</Text>
                  </TouchableOpacity>
                </View>

                <View className="h-2 overflow-hidden bg-gray-200 rounded-full">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${item.progress * 100}%`,
                      backgroundColor: progressBarColor,
                    }}
                  />
                </View>

                <Text className="mt-2 text-xs italic text-gray-500">
                  {getProgressFeedback(item.progress)}
                </Text>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.deckId}
          contentContainerStyle={{ padding: 16 }}
          ListFooterComponent={
            <Text className="mt-6 mb-12 text-center text-gray-400">
              "Small wins today make big ranks tomorrow 🧠"
            </Text>
          }
        />
      )}

      {/* Dopamine-based action button – represents "add next success", not utility. */}
      <TouchableOpacity
        onPress={() => {
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
        }}
        className="absolute shadow-xl"
        style={{ bottom: 80, right: 22, zIndex: 10 }}
        accessibilityLabel="Add new deck"
        accessibilityRole="button"
      >
        <Animated.View
          style={{
            transform: [
              {
                rotate: fabRotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "90deg"],
                }),
              },
            ],
          }}
        >
          <LinearGradient
            colors={["#6366f1", "#8b5cf6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="items-center justify-center w-16 h-16"
            style={{
              borderRadius: 9999,
              shadowColor: "#6366f1",
              shadowOpacity: 0.35,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 6,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <LottieView
              source={require("../../assets/plus-glow.json")}
              autoPlay
              loop
              style={{ width: 80, height: 80, position: "absolute" }}
            />
            <Text className="z-10 text-3xl font-bold text-white">+</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Flashcards;
