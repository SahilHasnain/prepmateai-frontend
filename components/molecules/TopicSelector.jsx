import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
    color: "#E5E7EB",
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
    backgroundColor: "#93C5FD",
    borderColor: "#93C5FD",
  },
  chipUnselected: {
    backgroundColor: "#1C1F24",
    borderColor: "#2A2D33",
  },
  textSelected: {
    color: "#0F1115",
    fontWeight: "600",
  },
  textUnselected: {
    color: "#E5E7EB",
  },
});

export default TopicSelector;
