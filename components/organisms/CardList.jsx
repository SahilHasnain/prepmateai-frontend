import { FlatList, RefreshControl, View, Text, StyleSheet } from "react-native";
import DeckCardItem from "../DeckCardItem";
import DailySummaryCard from "../molecules/DailySummaryCard";
import { getMessage } from "../../utils/messages";
import { colors, gradients, shadows } from "../../utils/colors";

/**
 * CardList Component (Organism) - Dark mode
 * Complete deck list rendering with summary, refresh control, and empty states
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
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.p5}
        />
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
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={
        <Text style={styles.footerText}>{getMessage("footer.quote")}</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  footerText: {
    marginTop: 24,
    marginBottom: 48,
    textAlign: "center",
    color: colors.p5,
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default CardList;
