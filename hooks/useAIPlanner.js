import { useState } from "react";
import { NODE_API_BASE_URL } from "../config/env";

// Custom hook for AI planner and flashcards
export default function useAIPlanner() {
  const [plan, setPlan] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generate study plan
  const generatePlan = async (weakTopics, hours, userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${NODE_API_BASE_URL}/api/ai/generate-plan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            weakTopics,
            availableHours: hours,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        setPlan(result.data);
        return result.data;
      } else {
        throw new Error(result.message || "Failed to generate plan");
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generate flashcards
  const generateFlashcards = async (topic, userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${NODE_API_BASE_URL}/api/ai/generate-flashcards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            topic,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        setFlashcards(result.data.flashcards);
        return result.data.flashcards;
      } else {
        throw new Error(result.message || "Failed to generate flashcards");
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    plan,
    flashcards,
    loading,
    error,
    generatePlan,
    generateFlashcards,
  };
}
