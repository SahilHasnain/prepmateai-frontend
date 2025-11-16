import { View, Text, StyleSheet, Animated } from "react-native";
import { colors } from "../../utils/colors";

/**
 * DailySummaryCard - shows short daily study summary
 * Props:
 * - stats: { cardsReviewedToday, cardsMasteredToday, totalDecks }
 * - fadeAnim: Animated.Value optional for fade-in
 */

const DailySummaryCard = ({ stats, fadeAnim }) => {
  if (!stats) return null;

  const { cardsReviewedToday, cardsMasteredToday, totalDecks } = stats;

  return (
    // Fade in wrapper is applied by parent with fadeAnim if provided
    <Animated.View
      style={[styles.container, fadeAnim && { opacity: fadeAnim }]}
    >
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.value}>{cardsReviewedToday}</Text>
          <Text style={styles.label}>Reviewed</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.item}>
          <Text style={styles.value}>{cardsMasteredToday}</Text>
          <Text style={styles.label}>Mastered</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.item}>
          <Text style={styles.value}>{totalDecks}</Text>
          <Text style={styles.label}>Decks</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default DailySummaryCard;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 16,
    backgroundColor: colors.s2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.s3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    alignItems: "center",
    flex: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.p4,
  },
  label: {
    fontSize: 12,
    color: colors.p5,
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.s3,
    marginHorizontal: 8,
  },
});
