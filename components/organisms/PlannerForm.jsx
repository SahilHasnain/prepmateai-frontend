import { View, Text } from "react-native";
import Input from "../Input";
import Button from "../Button";
import TopicSelector from "../molecules/TopicSelector";
import PlanItem from "../molecules/PlanItem";
import { usePlannerForm } from "../../hooks/usePlannerForm";
import { getMessage } from "../../utils/messages";

// Available topics for NEET/JEE
const AVAILABLE_TOPICS = [
  "Kinematics",
  "Thermodynamics",
  "Organic Chemistry",
  "Cell Biology",
  "Calculus",
  "Algebra",
  "Optics",
  "Electromagnetism",
];

/**
 * PlannerForm Component (Organism)
 * Pure presentation component for study planner
 * Business logic extracted to usePlannerForm hook
 */
const PlannerForm = ({ userId }) => {
  // All business logic in custom hook
  const {
    selectedTopics,
    hours,
    plan,
    loading,
    toggleTopic,
    setHours,
    generatePlan,
  } = usePlannerForm(userId);

  return (
    <View className="flex-1 p-4">
      <Text className="mb-4 text-2xl font-bold text-gray-800">
        Study Planner
      </Text>

      {/* Topic Selection */}
      <TopicSelector
        topics={AVAILABLE_TOPICS}
        selectedTopics={selectedTopics}
        onToggle={toggleTopic}
      />

      {/* Hours Input */}
      <Input
        label="Available Hours"
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
        placeholder={getMessage("planner.hoursPlaceholder")}
      />

      {/* Generate Button */}
      <Button
        title={loading ? "Generating..." : "Generate Plan"}
        onPress={generatePlan}
        loading={loading}
      />

      {/* Plan Display */}
      {plan.length > 0 && (
        <View className="mt-6">
          <Text className="mb-3 text-xl font-bold text-gray-800">
            Your Study Plan
          </Text>
          {plan.map((item, index) => (
            <PlanItem
              key={index}
              topic={item.topic}
              duration={item.duration}
              difficulty={item.difficulty}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default PlannerForm;
