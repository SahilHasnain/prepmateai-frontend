import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { NODE_API_BASE_URL } from "../config/env";

export const useOfflineQueue = (userId) => {
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null);

  // Load offline queue
  useEffect(() => {
    const loadQueue = async () => {
      if (!userId) return;
      const queueData = await AsyncStorage.getItem(`offline_queue_${userId}`);
      if (queueData) {
        setOfflineQueue(JSON.parse(queueData));
      }
    };
    loadQueue();
  }, [userId]);

  // Process offline queue
  useEffect(() => {
    const processQueue = async () => {
      if (offlineQueue.length === 0 || !userId) return;

      const remainingQueue = [];

      for (const item of offlineQueue) {
        try {
          const response = await fetch(
            `${NODE_API_BASE_URL}/api/progress/update-progress`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(item),
            },
          );

          if (!response.ok) {
            remainingQueue.push(item);
          }
        } catch (err) {
          remainingQueue.push(item);
        }
      }

      if (remainingQueue.length !== offlineQueue.length) {
        setOfflineQueue(remainingQueue);
        await AsyncStorage.setItem(
          `offline_queue_${userId}`,
          JSON.stringify(remainingQueue),
        );
      }
    };

    const timer = setTimeout(processQueue, 2000);
    return () => clearTimeout(timer);
  }, [offlineQueue, userId]);

  const submitFeedback = useCallback(
    async (feedbackData) => {
      setSubmitting(true);

      try {
        const response = await fetch(
          `${NODE_API_BASE_URL}/api/progress/update-progress`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feedbackData),
          },
        );

        if (!response.ok) throw new Error("Failed to save");

        return { success: true };
      } catch (err) {
        // Add to offline queue
        const newQueue = [...offlineQueue, feedbackData];
        setOfflineQueue(newQueue);
        await AsyncStorage.setItem(
          `offline_queue_${userId}`,
          JSON.stringify(newQueue),
        );

        Alert.alert(
          "Offline",
          "Progress saved locally. Will sync when online.",
        );
        return { success: true, offline: true };
      } finally {
        setSubmitting(false);
      }
    },
    [offlineQueue, userId],
  );

  const undo = useCallback(() => {
    if (!lastFeedback) return null;
    const feedback = lastFeedback;
    setLastFeedback(null);
    return feedback;
  }, [lastFeedback]);

  return {
    offlineQueue,
    submitting,
    lastFeedback,
    setLastFeedback,
    submitFeedback,
    undo,
  };
};
