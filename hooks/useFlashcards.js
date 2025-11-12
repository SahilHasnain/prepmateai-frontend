import { useState } from "react";
import { NODE_API_BASE_URL } from "../config/env";

// Custom hook for flashcard management
export const useFlashcards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);

  // Load today's due flashcards
  const loadToday = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${NODE_API_BASE_URL}/api/due/today/${userId}`
      );
      const result = await response.json();

      if (result.success) {
        setCards(result.data);
        setCurrentIndex(0);
        setReviewedCount(0);
      } else {
        throw new Error(result.message || "Failed to load flashcards");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate new flashcard deck
  const generateDeck = async (userId, topic) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${NODE_API_BASE_URL}/api/ai/generate-flashcards`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, topic }),
        }
      );

      const result = await response.json();

      if (result.success) {
        const flashcards = result.data.flashcards.map((card, index) => ({
          cardId: `${topic}_${index}_${Date.now()}`,
          question: card.question,
          answer: card.answer,
          topic,
          nextReview: null,
        }));

        setCards(flashcards);
        setCurrentIndex(0);
        setReviewedCount(0);
      } else {
        throw new Error(result.message || "Failed to generate deck");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit feedback for current card
  const submitFeedback = async (userId, cardId, topic, feedback) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${NODE_API_BASE_URL}/api/progress/update-progress`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, cardId, topic, feedback }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Increment reviewed count
        setReviewedCount((prev) => prev + 1);

        // Remove reviewed card from array
        setCards((prev) => prev.filter((_, index) => index !== currentIndex));

        // Keep currentIndex same (next card shifts into position)
        // If no more cards, reset to 0
        if (cards.length <= 1) {
          setCurrentIndex(0);
        }
      } else {
        throw new Error(result.message || "Failed to submit feedback");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    cards,
    loading,
    error,
    currentIndex,
    reviewedCount,
    loadToday,
    generateDeck,
    submitFeedback,
    setCurrentIndex,
  };
};
