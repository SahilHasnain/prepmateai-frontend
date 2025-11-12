import { useState, useEffect, useCallback } from "react";
import { NODE_API_BASE_URL } from "../config/env";

export const useDeckPlayer = (userId, topic) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [nextReview, setNextReview] = useState(null);
  const [streak, setStreak] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const loadData = async () => {
      if (!userId) return;

      setLoading(true);
      setError(null);

      try {
        let loadedCards = [];

        if (topic) {
          const response = await fetch(
            `${NODE_API_BASE_URL}/api/flashcards/decks/${userId}`,
            { signal: controller.signal }
          );
          const result = await response.json();

          if (result.success) {
            const deck = result.data.find((d) => d.topic === topic);
            if (deck) {
              const flashcards = JSON.parse(deck.flashcards || "[]");
              loadedCards = flashcards.map((card, index) => ({
                cardId: `${deck.$id}_${index}`,
                question: card.question,
                answer: card.answer,
                topic: deck.topic,
              }));
            }
          }
        } else {
          const response = await fetch(
            `${NODE_API_BASE_URL}/api/due/today/${userId}`,
            { signal: controller.signal }
          );
          const result = await response.json();

          if (result.success) {
            loadedCards = result.data;
          }
        }

        if (!isMounted) return;

        setCards(loadedCards);
        setCurrentIndex(0);
        setReviewedCount(0);
        setTotalCards(loadedCards.length);

        const summaryResponse = await fetch(
          `${NODE_API_BASE_URL}/api/progress/summary/${userId}`,
          { signal: controller.signal }
        );
        const summaryResult = await summaryResponse.json();
        
        if (isMounted && summaryResult.success) {
          if (summaryResult.data.nextReview) {
            setNextReview(summaryResult.data.nextReview);
          }
          if (summaryResult.data.streak !== undefined) {
            setStreak(summaryResult.data.streak);
          }
        }
      } catch (err) {
        if (err.name === "AbortError" || !isMounted) return;
        setError(err.message || "Failed to load cards");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId, topic, retryTrigger]);

  const retry = useCallback(() => {
    setError(null);
    setRetryTrigger((prev) => prev + 1);
  }, []);

  const shuffle = useCallback(() => {
    if (cards.length === 0) return;
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setCurrentIndex(0);
  }, [cards]);

  return {
    cards,
    loading,
    error,
    currentIndex,
    reviewedCount,
    nextReview,
    streak,
    totalCards,
    setCards,
    setReviewedCount,
    retry,
    shuffle,
  };
};
