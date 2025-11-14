import { View, Text, TouchableOpacity } from "react-native";

/**
 * TopicSelector Component (Molecule)
 * Multi-select topic chips for planner
 * Extracted from planner.jsx to reduce screen complexity
 */
const TopicSelector = ({ topics, selectedTopics, onToggle }) => {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-lg font-semibold text-gray-800">
        Select Weak Topics
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {topics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <TouchableOpacity
              key={topic}
              onPress={() => onToggle(topic)}
              className={`px-4 py-2 rounded-full ${
                isSelected ? "bg-blue-500" : "bg-gray-200"
              }`}
              accessibilityLabel={`${topic} topic`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text className={isSelected ? "text-white" : "text-gray-800"}>
                {topic}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TopicSelector;
