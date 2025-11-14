import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { NODE_API_BASE_URL } from "../config/env";
import { getMessage } from "../utils/messages";

/**
 * usePlannerForm Hook
 * Handles all study planner business logic:
 * - Topic selection state
 * - Hour input validation
 * - AI plan generation API call
 * - Loading/error states
 *
 * Extracted from PlannerForm organism to separate concerns
 */
export const usePlannerForm = (userId) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState([]);

  // Toggle topic selection
  const toggleTopic = useCallback((topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }, []);

  // Validate form inputs
  const validateInputs = useCallback(() => {
    if (selectedTopics.length === 0) {
      Alert.alert("Error", getMessage("planner.selectTopicError"));
      return false;
    }

    if (!hours || isNaN(hours) || parseFloat(hours) <= 0) {
      Alert.alert("Error", getMessage("planner.invalidHoursError"));
      return false;
    }

    return true;
  }, [selectedTopics, hours]);

  // Generate study plan via AI
  const generatePlan = useCallback(async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${NODE_API_BASE_URL}/api/ai/generate-plan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            weakTopics: selectedTopics,
            availableHours: parseFloat(hours),
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setPlan(result.data);
        Alert.alert(
          getMessage("success.planGenerated"),
          "AI Plan Generated ✅"
        );
      } else {
        Alert.alert("Error", result.message || getMessage("errors.saveFailed"));
      }
    } catch (error) {
      Alert.alert("Error", getMessage("errors.networkError"));
    } finally {
      setLoading(false);
    }
  }, [userId, selectedTopics, hours, validateInputs]);

  // Reset form
  const resetForm = useCallback(() => {
    setSelectedTopics([]);
    setHours("");
    setPlan([]);
  }, []);

  return {
    // State
    selectedTopics,
    hours,
    plan,
    loading,

    // Actions
    toggleTopic,
    setHours,
    generatePlan,
    resetForm,
  };
};
