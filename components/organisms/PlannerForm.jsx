import { View, Text, StyleSheet } from "react-native";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
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
 * PlannerForm Component (Organism) - Dark mode
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
    <View style={styles.container}>
      <Text style={styles.heading}>Study Planner 📝</Text>
      <Text style={styles.subtitle}>
        Build a personalized study schedule that works for you.
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
        <View style={styles.planSection}>
          <Text style={styles.planHeading}>Your Study Plan</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 8,
    fontSize: 26,
    fontWeight: "700",
    color: "#E5E7EB",
  },
  subtitle: {
    marginBottom: 16,
    fontSize: 15,
    color: "#9CA3AF",
    lineHeight: 22,
  },
  planSection: {
    marginTop: 24,
  },
  planHeading: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#E5E7EB",
  },
});

export default PlannerForm;
