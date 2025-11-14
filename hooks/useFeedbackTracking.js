import { useState, useCallback } from "react";

/**
 * useFeedbackTracking Hook
 * Tracks flashcard feedback statistics:
 * - Counts for remembered/unsure/forgot
 * - Track feedback by type
 * - Revert feedback (for undo)
 *
 * Extracted from deckPlayer.jsx to isolate analytics logic
 * Useful for: deck completion stats, performance analytics, progress tracking
 */
export const useFeedbackTracking = () => {
  const [feedbackCounts, setFeedbackCounts] = useState({
    greens: 0, // remembered
    yellows: 0, // unsure
    reds: 0, // forgot
  });

  // Track a feedback submission
  const trackFeedback = useCallback((feedbackType) => {
    setFeedbackCounts((prev) => {
      switch (feedbackType) {
        case "remembered":
          return { ...prev, greens: prev.greens + 1 };
        case "unsure":
          return { ...prev, yellows: prev.yellows + 1 };
        case "forgot":
          return { ...prev, reds: prev.reds + 1 };
        default:
          return prev;
      }
    });
  }, []);

  // Revert a feedback (for undo functionality)
  const revertFeedback = useCallback((feedbackType) => {
    setFeedbackCounts((prev) => {
      switch (feedbackType) {
        case "remembered":
          return { ...prev, greens: Math.max(0, prev.greens - 1) };
        case "unsure":
          return { ...prev, yellows: Math.max(0, prev.yellows - 1) };
        case "forgot":
          return { ...prev, reds: Math.max(0, prev.reds - 1) };
        default:
          return prev;
      }
    });
  }, []);

  // Reset all counts
  const resetCounts = useCallback(() => {
    setFeedbackCounts({ greens: 0, yellows: 0, reds: 0 });
  }, []);

  // Get total feedback count
  const getTotalCount = useCallback(() => {
    return feedbackCounts.greens + feedbackCounts.yellows + feedbackCounts.reds;
  }, [feedbackCounts]);

  // Get accuracy percentage (greens + 0.5*yellows)
  const getAccuracy = useCallback(() => {
    const total = getTotalCount();
    if (total === 0) return 0;

    const score = feedbackCounts.greens + feedbackCounts.yellows * 0.5;
    return Math.round((score / total) * 100);
  }, [feedbackCounts, getTotalCount]);

  return {
    // State
    counts: feedbackCounts,

    // Actions
    trackFeedback,
    revertFeedback,
    resetCounts,

    // Computed values
    getTotalCount,
    getAccuracy,
  };
};
