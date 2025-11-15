import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, gradients, shadows } from "../../utils/colors";

/**
 * TopicSelector Component (Molecule) - Dark mode
 * Multi-select topic chips for planner
 */
const TopicSelector = ({ topics, selectedTopics, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Weak Topics</Text>
      <View style={styles.chipsContainer}>
        {topics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <TouchableOpacity
              key={topic}
              onPress={() => onToggle(topic)}
              style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipUnselected,
              ]}
              accessibilityLabel={`${topic} topic`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={isSelected ? styles.textSelected : styles.textUnselected}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "600",
    color: colors.p4,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1.5,
  },
  chipSelected: {
    backgroundColor: colors.p2,
    borderColor: colors.p2,
  },
  chipUnselected: {
    backgroundColor: colors.s2,
    borderColor: colors.s3,
  },
  textSelected: {
    color: colors.s1,
    fontWeight: "600",
  },
  textUnselected: {
    color: colors.p4,
  },
});

export default TopicSelector;
