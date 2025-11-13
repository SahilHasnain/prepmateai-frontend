/**
 * Centralized UI Copy System with Tone Support
 * Based on Atomic Habits persona: Systems > Goals, Small Wins, Identity-Based
 */

// ============= TONE CONFIGURATIONS =============
const TONES = {
  atomic: {
    // Atomic Habits-inspired: systems thinking, 1% better, identity formation
    philosophy:
      "Systems over goals. Small wins compound. Identity drives action.",
  },
  default: {
    // Fallback: standard motivational copy
    philosophy: "Encouragement with clarity.",
  },
};

// Current active tone (can be switched for A/B testing)
let activeTone = "atomic";

/**
 * Set the active tone for all UI copy
 * @param {string} tone - 'atomic' or 'default'
 */
export const setTone = (tone) => {
  if (TONES[tone]) {
    activeTone = tone;
  }
};

/**
 * Get the current active tone
 * @returns {string} Current tone key
 */
export const getTone = () => activeTone;

// ============= MESSAGE CATALOG =============
const MESSAGES = {
  // Header Section
  header: {
    title: {
      atomic: "Your Daily Ritual 🎯",
      default: "Flashcards Dashboard",
    },
    subtitle: {
      atomic: "Build the habit. Let the system work.",
      default: "Track your progress and keep learning",
    },
    streakPrefix: {
      atomic: "🔥 ", // Fire emoji for atomic habits "Don't break the chain"
      default: "🔥 ",
    },
    streakSuffix: {
      atomic: "-day system",
      default: " days",
    },
  },

  // Search Bar
  search: {
    placeholder: {
      atomic: "🔍 Find your next 1% gain...",
      default: "🔍 Search or explore new topics...",
    },
  },

  // Floating Action Button
  fab: {
    label: {
      atomic: "Start a New System",
      default: "Create Deck",
    },
    accessibility: {
      atomic: "Create new learning system",
      default: "Create new deck",
    },
  },

  // Empty State (No Decks)
  emptyState: {
    title: {
      atomic: "Build your first system! 🌱",
      default: "Let's build your first deck! 🌱",
    },
    subtitle: {
      atomic: "Forget goals. Small reps build identity.",
      default: "Every big rank starts with the first small step.",
    },
    ctaButton: {
      atomic: "📘 Build System #1",
      default: "📘 Create your first deck",
    },
    helperText: {
      atomic: "Pick any topic. Start the 1% rule today.",
      default: "Start with any topic you want to master",
    },
    badge: {
      atomic: "System starts now",
      default: "Your journey starts here",
    },
  },

  // No Search Results
  noResults: {
    title: {
      atomic: "No systems match that search",
      default: "No results found",
    },
    subtitle: {
      atomic: "Try another keyword or build it from scratch",
      default: "Try a different search term",
    },
  },

  // Daily Summary Card (After Progress)
  summary: {
    title: {
      atomic: "⚡ Don't break the chain!",
      default: "⚡ Keep your streak alive!",
    },
    cardsReviewed: {
      atomic: "📘 {count} reps today", // "reps" = repetitions, fits Atomic Habits
      default: "📘 {count} cards reviewed",
    },
    cardsMastered: {
      atomic: "✨ {count} locked in", // "locked in" = mastered/internalized
      default: "✨ {count} mastered",
    },
    badge: {
      atomic: "🏅 1% Better",
      default: "🏅 Focus Hero",
    },
  },

  // Deck Progress Feedback (Tier-based encouragement)
  deckFeedback: {
    tier5: {
      // 100% complete
      atomic: "🎯 Identity shift complete. You ARE this now.",
      default: "🎯 Fully mastered! Brilliant work!",
    },
    tier4: {
      // 76-99%
      atomic: "⚡ System working. Almost ingrained.",
      default: "⚡ Almost there! Great focus today!",
    },
    tier3: {
      // 51-75%
      atomic: "🔥 Momentum building. Trust the reps.",
      default: "🔥 Making real progress — you're on track!",
    },
    tier2: {
      // 26-50%
      atomic: "💪 Small wins stacking. Keep going.",
      default: "💪 You're warming up — keep that spark alive!",
    },
    tier1: {
      // 0-25%
      atomic: "🌱 Day 1 is done. The chain begins here.",
      default: "🌱 Just getting started — every step counts.",
    },
  },

  // Mastery Text (Deck Card Badge)
  mastery: {
    complete: {
      atomic: "🎯 Locked In",
      default: "🎯 Fully Mastered!",
    },
    high: {
      atomic: "🔥 Building habit",
      default: "🔥 Making progress!",
    },
    low: {
      atomic: "🌱 System active",
      default: "🌱 Growing stronger!",
    },
  },

  // Footer Motivational Quote
  footer: {
    quote: {
      atomic: '"Every rep is a vote for who you\'re becoming." 🧠',
      default: '"Small wins today make big ranks tomorrow 🧠"',
    },
  },

  // Delete Confirmation
  delete: {
    title: {
      atomic: "Delete System?",
      default: "Delete Deck",
    },
    message: {
      atomic: 'Remove "{topic}" from your rituals? Progress will be lost.',
      default: 'Are you sure you want to delete "{topic}"?',
    },
    cancel: {
      atomic: "Keep It",
      default: "Cancel",
    },
    confirm: {
      atomic: "Remove System",
      default: "Delete",
    },
  },

  // Flashcard Actions
  flashcardActions: {
    forgot: {
      atomic: "Reset Rep",
      default: "Forgot",
    },
    unsure: {
      atomic: "Half Rep",
      default: "Unsure",
    },
    remembered: {
      atomic: "Full Rep",
      default: "Remembered",
    },
  },

  // Error Messages
  errors: {
    loadFailed: {
      atomic: "System load failed. Check connection and retry.",
      default: "Failed to load. Please check your connection.",
    },
    networkError: {
      atomic: "Network down. Your reps are queued offline.",
      default: "Network error. Please check your connection.",
    },
    saveFailed: {
      atomic: "Progress save failed. Will retry automatically.",
      default: "Failed to save progress.",
    },
    invalidTopic: {
      atomic: "Pick a topic to build your system.",
      default: "Please enter a topic",
    },
    invalidEmail: {
      atomic: "Email format invalid. Try again.",
      default: "Please enter a valid email address",
    },
    passwordTooShort: {
      atomic: "Password needs 6+ characters for security.",
      default: "Password must be at least 6 characters long",
    },
    passwordMismatch: {
      atomic: "Passwords don't match. Re-enter carefully.",
      default: "Passwords do not match",
    },
    loginFailed: {
      atomic: "Login failed. Check credentials.",
      default: "Login Failed",
    },
    signupFailed: {
      atomic: "Signup failed. Try different email.",
      default: "Signup Failed",
    },
  },

  // Success Messages
  success: {
    deckCreated: {
      atomic: "System Created! First rep starts now.",
      default: "Deck Created!",
    },
    planGenerated: {
      atomic: "Study system ready. Follow the blueprint.",
      default: "Study plan generated successfully!",
    },
    progressSaved: {
      atomic: "Rep recorded. Chain continues.",
      default: "Progress saved successfully!",
    },
  },

  // Planner Screen
  planner: {
    selectTopicError: {
      atomic: "Choose at least one weak spot to fix.",
      default: "Please select at least one topic.",
    },
    invalidHoursError: {
      atomic: "Enter study hours (must be > 0).",
      default: "Please enter valid study hours greater than 0.",
    },
    hoursPlaceholder: {
      atomic: "Study hours (e.g., 5)",
      default: "Enter hours (e.g., 5)",
    },
  },

  // Auth Screens
  auth: {
    namePlaceholder: {
      atomic: "Your name",
      default: "Enter your name",
    },
    emailPlaceholder: {
      atomic: "Your email",
      default: "Enter your email",
    },
    passwordPlaceholder: {
      atomic: "Create password",
      default: "Enter your password",
    },
    confirmPasswordPlaceholder: {
      atomic: "Confirm password",
      default: "Confirm your password",
    },
  },

  // Daily Motivational Messages (rotating)
  daily: {
    atomic: [
      "🔥 Build the identity, not just the skill.",
      "🧠 1% better = 37x better in a year.",
      "🚀 Systems beat goals. Every time.",
      "💪 The reps you do define who you become.",
      "⚡ Small habits compound into mastery.",
      "🎯 Don't break the chain. Show up today.",
    ],
    default: [
      "🔥 You're building concept power!",
      "🧠 Repetition = Retention!",
      "🚀 Small steps → Big results!",
      "💪 Every card counts!",
      "⚡ Keep the momentum going!",
      "🎯 Focus brings mastery!",
    ],
  },
};

// ============= CORE API =============

/**
 * Get a message by key path with optional context interpolation
 * @param {string} key - Dot-notation key (e.g., 'header.title', 'deckFeedback.tier5')
 * @param {Object} context - Variables for interpolation (e.g., {count: 5, topic: 'Physics'})
 * @returns {string} The message string with tone applied
 */
export const getMessage = (key, context = {}) => {
  const keys = key.split(".");
  let message = MESSAGES;

  // Navigate to the message object
  for (const k of keys) {
    if (message && typeof message === "object" && k in message) {
      message = message[k];
    } else {
      console.warn(`[getMessage] Key not found: ${key}`);
      return key; // Fallback to key itself
    }
  }

  // If message is an object with tone variants, pick the active tone
  if (typeof message === "object" && !Array.isArray(message)) {
    message = message[activeTone] || message.default || key;
  }

  // Interpolate context variables (e.g., {count}, {topic})
  if (typeof message === "string" && context) {
    return message.replace(/\{(\w+)\}/g, (match, variable) => {
      return context[variable] !== undefined ? context[variable] : match;
    });
  }

  return message;
};

/**
 * Get all messages for a given category (useful for batch rendering)
 * @param {string} category - Top-level category (e.g., 'header', 'errors')
 * @returns {Object} All messages in that category with active tone applied
 */
export const getMessageCategory = (category) => {
  const categoryMessages = MESSAGES[category];
  if (!categoryMessages) return {};

  const result = {};
  for (const [key, value] of Object.entries(categoryMessages)) {
    if (typeof value === "object" && value[activeTone]) {
      result[key] = value[activeTone];
    } else if (typeof value === "object" && value.default) {
      result[key] = value.default;
    } else {
      result[key] = value;
    }
  }
  return result;
};

/**
 * Get random daily message (same message per day using day-of-year hash)
 * @returns {string} Daily motivational message
 */
export const getDailyMessage = () => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const messages = MESSAGES.daily[activeTone] || MESSAGES.daily.default;
  return messages[dayOfYear % messages.length];
};

/**
 * Helper: Get mastery text based on progress ratio
 * @param {number} masteredCards - Number of mastered cards
 * @param {number} totalCards - Total cards in deck
 * @returns {string} Mastery level text
 */
export const getMasteryText = (masteredCards, totalCards) => {
  const progress = masteredCards / totalCards;
  if (progress >= 1) return getMessage("mastery.complete");
  if (progress >= 0.6) return getMessage("mastery.high");
  return getMessage("mastery.low");
};

/**
 * Helper: Get progress feedback based on completion ratio
 * @param {number} progress - Progress ratio (0-1)
 * @returns {string} Tier-based feedback message
 */
export const getProgressFeedback = (progress) => {
  if (progress === 1.0) return getMessage("deckFeedback.tier5");
  if (progress >= 0.76) return getMessage("deckFeedback.tier4");
  if (progress >= 0.51) return getMessage("deckFeedback.tier3");
  if (progress >= 0.26) return getMessage("deckFeedback.tier2");
  return getMessage("deckFeedback.tier1");
};
