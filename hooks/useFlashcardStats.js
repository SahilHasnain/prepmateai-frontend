import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { NODE_API_BASE_URL } from "../config/env";

export const useFlashcardStats = (userId) => {
  const [stats, setStats] = useState(null);
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const loadData = async () => {
      if (!userId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${NODE_API_BASE_URL}/api/stats/${userId}`,
          { signal: controller.signal },
        );
        const result = await response.json();

        if (!isMounted) return;

        if (result.success) {
          setStats({
            cardsReviewedToday: result.data.cardsReviewedToday,
            cardsMasteredToday: result.data.cardsMasteredToday,
            totalDecks: result.data.totalDecks,
          });
          setDecks(result.data.decksWithProgress);
        } else {
          throw new Error(result.message || "Failed to load stats");
        }
      } catch (err) {
        if (err.name === "AbortError" || !isMounted) return;
        setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId, refreshTrigger]);

  const refresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const deleteDeck = useCallback(async (deckId) => {
    try {
      const response = await fetch(`${NODE_API_BASE_URL}/api/decks/${deckId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        setDecks((prev) => prev.filter((d) => d.deckId !== deckId));
        return true;
      } else {
        throw new Error(result.message || "Failed to delete deck");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
      return false;
    }
  }, []);

  return { stats, decks, loading, error, refresh, deleteDeck };
};
