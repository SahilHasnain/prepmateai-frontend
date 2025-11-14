/**
 * Utility functions for scoring and feedback aggregation.
 * Pure functions only; no external side effects.
 */

/**
 * Compute accuracy percentage (0–100) from correct and total.
 * @param {number} correct - Count of remembered/correct items.
 * @param {number} total - Total items reviewed.
 * @returns {number} Integer accuracy percentage.
 */
export function computeAccuracy(correct, total) {
  if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0)
    return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Aggregate an array of feedback events into counters.
 * @param {Array<'forgot'|'unsure'|'remembered'>} feedbackEvents - Events sequence.
 * @returns {{ forgot: number, unsure: number, remembered: number }} Counts per feedback type.
 */
export function aggregateFeedback(feedbackEvents) {
  return (feedbackEvents || []).reduce(
    (acc, ev) => {
      if (ev === "forgot") acc.forgot += 1;
      else if (ev === "unsure") acc.unsure += 1;
      else if (ev === "remembered") acc.remembered += 1;
      return acc;
    },
    { forgot: 0, unsure: 0, remembered: 0 }
  );
}

/**
 * Format an accuracy number as a percentage string.
 * @param {number} accuracy - Accuracy percentage integer.
 * @returns {string} Formatted value like "87%".
 */
export function formatAccuracy(accuracy) {
  if (!Number.isFinite(accuracy) || accuracy < 0) return "0%";
  return `${Math.min(100, Math.round(accuracy))}%`;
}

/**
 * Derive accuracy directly from feedback events array.
 * @param {Array<'forgot'|'unsure'|'remembered'>} feedbackEvents
 * @returns {number} Accuracy percentage.
 */
export function accuracyFromEvents(feedbackEvents) {
  const { remembered } = aggregateFeedback(feedbackEvents);
  const total = feedbackEvents.length;
  return computeAccuracy(remembered, total);
}

export default {
  computeAccuracy,
  aggregateFeedback,
  formatAccuracy,
  accuracyFromEvents,
};
