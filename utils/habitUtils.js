/**
 * Habit scheduling and due-date utilities.
 * Pure deterministic functions, no side effects.
 */

/**
 * Frequency type definition:
 * 'daily' | 'weekly' | { intervalDays: number }
 */

/**
 * Calculate next occurrence given a base date and frequency.
 * @param {Date} baseDate - Starting point.
 * @param {'daily'|'weekly'|{intervalDays:number}} frequency - Frequency descriptor.
 * @returns {Date} New Date instance for next occurrence.
 */
export function nextOccurrence(baseDate, frequency) {
  const d = new Date(baseDate);
  if (frequency === "daily") d.setDate(d.getDate() + 1);
  else if (frequency === "weekly") d.setDate(d.getDate() + 7);
  else if (
    frequency &&
    typeof frequency === "object" &&
    Number.isFinite(frequency.intervalDays)
  ) {
    d.setDate(d.getDate() + frequency.intervalDays);
  }
  return d;
}

/**
 * Generate a schedule of occurrences.
 * @param {Date} startDate - Initial date.
 * @param {'daily'|'weekly'|{intervalDays:number}} frequency - Frequency descriptor.
 * @param {number} count - Number of occurrences.
 * @returns {string[]} Array of ISO date strings.
 */
export function generateSchedule(startDate, frequency, count) {
  const dates = [];
  let current = new Date(startDate);
  for (let i = 0; i < count; i++) {
    dates.push(current.toISOString());
    current = nextOccurrence(current, frequency);
  }
  return dates;
}

/**
 * Check if a date is due (past or today) relative to now.
 * @param {Date} date - Target date.
 * @param {Date} [now=new Date()] - Reference 'now'.
 * @returns {boolean} True if due.
 */
export function isDue(date, now = new Date()) {
  return date.getTime() <= now.getTime();
}

/**
 * Filter only dates that are due from an ISO string list.
 * @param {string[]} isoDates - ISO date strings.
 * @param {Date} [now=new Date()] - Reference now.
 * @returns {string[]} Subset of ISO strings that are due.
 */
export function dueDates(isoDates, now = new Date()) {
  return isoDates.filter((d) => isDue(new Date(d), now));
}

/**
 * Get next upcoming date after now from ISO date list.
 * @param {string[]} isoDates - ISO date strings.
 * @param {Date} [now=new Date()] - Reference now.
 * @returns {string|null} Next upcoming ISO date or null if none.
 */
export function nextUpcoming(isoDates, now = new Date()) {
  const future = isoDates
    .map((d) => new Date(d))
    .filter((d) => d.getTime() > now.getTime())
    .sort((a, b) => a - b);
  return future.length ? future[0].toISOString() : null;
}

export default {
  nextOccurrence,
  generateSchedule,
  isDue,
  dueDates,
  nextUpcoming,
};
