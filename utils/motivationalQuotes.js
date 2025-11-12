// Dopamine trigger: positive motivational messages
export const motivationalQuotes = [
  "Every card counts! 💪",
  "Mastered like a pro! 🎯",
  "You're on fire! 🔥",
  "Knowledge is power! ⚡",
  "Keep crushing it! 💎",
  "Brain gains unlocked! 🧠",
  "Consistency wins! 👑",
  "You're unstoppable! 🚀",
  "Level up! 📈",
  "Champion mindset! 🏆",
];

export const getRandomQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};
