import { FlatList, RefreshControl, View, Text } from "react-native";
import DeckCardItem from "../DeckCardItem";
import DailySummaryCard from "../molecules/DailySummaryCard";
import { getMessage } from "../../utils/messages";

/**
 * CardList Component (Organism)
 * Complete deck list rendering with summary, refresh control, and empty states
 * Extracted from flashcards.jsx to follow atomic design
 */
const CardList = ({
  decks,
  stats,
  fadeAnim,
  refreshing,
  onRefresh,
  onDeckPress,
  onDelete,
}) => {
  return (
    <FlatList
      data={decks}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <DailySummaryCard stats={stats} fadeAnim={fadeAnim} />
      }
      renderItem={({ item }) => (
        <DeckCardItem
          deck={item}
          onPress={() => onDeckPress(item.topic)}
          onDelete={() => onDelete(item.deckId, item.topic)}
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
  );
};

export default CardList;
