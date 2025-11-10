// Motivational messages for flashcard learning
export const MESSAGES = [
  "🔥 You&apos;re building concept power!",
  "🧠 Repetition = Retention!",
  "🚀 Small steps → Big results!",
  "💪 Every card counts!",
  "⚡ Keep the momentum going!",
  "🎯 Focus brings mastery!",
];

// Get random daily message (same message per day)
export const getDailyMessage = () => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  return MESSAGES[dayOfYear % MESSAGES.length];
};
