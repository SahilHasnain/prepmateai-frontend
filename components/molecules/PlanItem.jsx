import { View, Text } from "react-native";
import Badge from "../atoms/Badge";

/**
 * PlanItem Component (Molecule)
 * Individual study plan item card with topic, duration, and difficulty
 * Extracted from planner.jsx
 */
const PlanItem = ({ topic, duration, difficulty }) => {
  return (
    <View className="p-4 mb-3 border border-gray-200 rounded-lg bg-gray-50">
      <Text className="mb-1 text-lg font-semibold text-gray-800">{topic}</Text>
      <Text className="mb-2 text-gray-600">{duration} minutes</Text>
      <Badge text={difficulty} variant={difficulty} size="small" />
    </View>
  );
};

export default PlanItem;
