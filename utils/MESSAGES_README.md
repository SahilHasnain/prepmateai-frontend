# Centralized Messaging System Documentation

## Overview

The centralized messaging system (`utils/messages.js`) provides a **single source of truth** for all UI copy across the PrepMateAI frontend. This enables:

- **Tone consistency**: All messages follow the same philosophy (Atomic Habits persona by default)
- **Easy A/B testing**: Switch between tones with one function call
- **Maintainability**: Update copy in one place instead of hunting through components
- **Localization-ready**: Foundation for future i18n support

---

## Core Concepts

### Tone System

Messages support multiple "tones" or "personas" for the app's voice:

- **`atomic`** (default): Based on Atomic Habits principles
  - Systems > goals
  - 1% daily improvement
  - Identity-based language ("You ARE this", "System working")
  - Small wins compound
- **`default`**: Standard motivational copy (fallback)

**Current active tone**: `atomic`

---

## API Reference

### `getMessage(key, context?)`

Retrieve a message by its dot-notation key.

**Parameters:**

- `key` (string): Dot-separated path to message (e.g., `"header.title"`, `"errors.invalidEmail"`)
- `context` (object, optional): Variables for interpolation (e.g., `{count: 5, topic: "Physics"}`)

**Returns:** String with tone applied and variables interpolated

**Examples:**

```javascript
import { getMessage } from "../utils/messages";

// Simple message
getMessage("header.title");
// → "Your Daily Ritual 🎯" (atomic tone)

// Message with interpolation
getMessage("summary.cardsReviewed", { count: 10 });
// → "📘 10 reps today"

// Nested message
getMessage("delete.message", { topic: "Physics" });
// → "Remove 'Physics' from your rituals? Progress will be lost."
```

---

### `setTone(tone)`

Switch the active tone for all messages.

**Parameters:**

- `tone` (string): `'atomic'` or `'default'`

**Example:**

```javascript
import { setTone, getMessage } from "../utils/messages";

setTone("atomic");
getMessage("emptyState.title");
// → "Build your first system! 🌱"

setTone("default");
getMessage("emptyState.title");
// → "Let's build your first deck! 🌱"
```

---

### `getTone()`

Get the currently active tone.

**Returns:** String (`'atomic'` or `'default'`)

---

### `getDailyMessage()`

Get a rotating daily motivational message (same message per day).

**Returns:** String from the daily message pool based on day-of-year hash

**Example:**

```javascript
const dailyQuote = getDailyMessage();
// → "🔥 Build the identity, not just the skill." (changes daily)
```

---

### `getMasteryText(masteredCards, totalCards)`

Helper function for deck mastery level badge.

**Parameters:**

- `masteredCards` (number): Cards marked as mastered
- `totalCards` (number): Total cards in deck

**Returns:** Mastery level string based on progress ratio

**Tiers:**

- `≥ 100%` → "🎯 Locked In" (atomic) / "🎯 Fully Mastered!" (default)
- `≥ 60%` → "🔥 Building habit" / "🔥 Making progress!"
- `< 60%` → "🌱 System active" / "🌱 Growing stronger!"

---

### `getProgressFeedback(progress)`

Helper function for deck progress encouragement text.

**Parameters:**

- `progress` (number): Progress ratio (0-1)

**Returns:** Tier-based feedback string

**Tiers:**

- `1.0` → "🎯 Identity shift complete. You ARE this now."
- `0.76-0.99` → "⚡ System working. Almost ingrained."
- `0.51-0.75` → "🔥 Momentum building. Trust the reps."
- `0.26-0.50` → "💪 Small wins stacking. Keep going."
- `0-0.25` → "🌱 Day 1 is done. The chain begins here."

---

## Message Catalog

### Header Section

| Key                   | Atomic Tone                             | Default Tone                            |
| --------------------- | --------------------------------------- | --------------------------------------- |
| `header.title`        | "Your Daily Ritual 🎯"                  | "Flashcards Dashboard"                  |
| `header.subtitle`     | "Build the habit. Let the system work." | "Track your progress and keep learning" |
| `header.streakPrefix` | "🔥 "                                   | "🔥 "                                   |
| `header.streakSuffix` | "-day system"                           | " days"                                 |

### Search Bar

| Key                  | Atomic Tone                    | Default Tone                         |
| -------------------- | ------------------------------ | ------------------------------------ |
| `search.placeholder` | "🔍 Find your next 1% gain..." | "🔍 Search or explore new topics..." |

### Empty State (No Decks)

| Key                     | Atomic Tone                                | Default Tone                                       |
| ----------------------- | ------------------------------------------ | -------------------------------------------------- |
| `emptyState.title`      | "Build your first system! 🌱"              | "Let's build your first deck! 🌱"                  |
| `emptyState.subtitle`   | "Forget goals. Small reps build identity." | "Every big rank starts with the first small step." |
| `emptyState.ctaButton`  | "📘 Build System #1"                       | "📘 Create your first deck"                        |
| `emptyState.helperText` | "Pick any topic. Start the 1% rule today." | "Start with any topic you want to master"          |

### Daily Summary Card

| Key                     | Atomic Tone                 | Default Tone                 |
| ----------------------- | --------------------------- | ---------------------------- |
| `summary.title`         | "⚡ Don't break the chain!" | "⚡ Keep your streak alive!" |
| `summary.cardsReviewed` | "📘 {count} reps today"     | "📘 {count} cards reviewed"  |
| `summary.cardsMastered` | "✨ {count} locked in"      | "✨ {count} mastered"        |
| `summary.badge`         | "🏅 1% Better"              | "🏅 Focus Hero"              |

### Delete Confirmation

| Key              | Atomic Tone                                                  | Default Tone                                 |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------- |
| `delete.title`   | "Delete System?"                                             | "Delete Deck"                                |
| `delete.message` | "Remove '{topic}' from your rituals? Progress will be lost." | "Are you sure you want to delete '{topic}'?" |
| `delete.cancel`  | "Keep It"                                                    | "Cancel"                                     |
| `delete.confirm` | "Remove System"                                              | "Delete"                                     |

### Error Messages

| Key                       | Atomic Tone                                       | Default Tone                                    |
| ------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| `errors.loadFailed`       | "System load failed. Check connection and retry." | "Failed to load. Please check your connection." |
| `errors.networkError`     | "Network down. Your reps are queued offline."     | "Network error. Please check your connection."  |
| `errors.invalidTopic`     | "Pick a topic to build your system."              | "Please enter a topic"                          |
| `errors.invalidEmail`     | "Email format invalid. Try again."                | "Please enter a valid email address"            |
| `errors.passwordTooShort` | "Password needs 6+ characters for security."      | "Password must be at least 6 characters long"   |

### Success Messages

| Key                     | Atomic Tone                                 | Default Tone                         |
| ----------------------- | ------------------------------------------- | ------------------------------------ |
| `success.deckCreated`   | "System Created! First rep starts now."     | "Deck Created!"                      |
| `success.planGenerated` | "Study system ready. Follow the blueprint." | "Study plan generated successfully!" |
| `success.progressSaved` | "Rep recorded. Chain continues."            | "Progress saved successfully!"       |

**Full catalog**: See `MESSAGES` object in `utils/messages.js`

---

## Usage Patterns

### In Components

```jsx
import { getMessage, getProgressFeedback } from "../../utils/messages";

function DeckCard({ deck }) {
  return (
    <View>
      <Text>{deck.topic}</Text>
      <Text>{getProgressFeedback(deck.progress)}</Text>
    </View>
  );
}
```

### In Alert/Toast

```javascript
import { getMessage } from "../utils/messages";

Alert.alert(
  getMessage("delete.title"),
  getMessage("delete.message", { topic: "Physics" }),
  [
    { text: getMessage("delete.cancel"), style: "cancel" },
    {
      text: getMessage("delete.confirm"),
      style: "destructive",
      onPress: handleDelete,
    },
  ]
);
```

### With Dynamic Context

```javascript
<Text>
  {getMessage("summary.cardsReviewed", { count: stats.cardsReviewedToday })}
</Text>
// Renders: "📘 15 reps today"
```

---

## Adding New Messages

1. **Add to `MESSAGES` catalog** in `utils/messages.js`:

```javascript
newCategory: {
  newKey: {
    atomic: "Atomic tone version",
    default: "Default tone version",
  }
}
```

2. **Use in components**:

```javascript
getMessage("newCategory.newKey");
```

3. **Add to tests** in `utils/__tests__/messages.test.js`:

```javascript
test("should return new message", () => {
  expect(getMessage("newCategory.newKey")).toBeTruthy();
});
```

---

## Testing

Run unit tests:

```bash
cd prepmateai-frontend
npm test -- messages.test.js
```

Manual spot-check:

1. Change `activeTone` in `messages.js` from `'atomic'` to `'default'`
2. Reload app
3. Verify all UI copy changes tone

---

## Migration Checklist

✅ **Completed:**

- [x] Created centralized `messages.js` with tone support
- [x] Replaced hardcoded strings in `flashcards.jsx`
- [x] Replaced hardcoded strings in `login.jsx`
- [x] Replaced hardcoded strings in `signup.jsx`
- [x] Replaced hardcoded strings in `planner.jsx`
- [x] Replaced hardcoded strings in `new-deck.jsx`
- [x] Replaced hardcoded strings in `FlashcardFeedback.jsx`
- [x] Created unit tests in `__tests__/messages.test.js`
- [x] Created documentation (this file)

**Remaining (optional):**

- [ ] Migrate `DeckCompleted.jsx` alerts
- [ ] Migrate `deckPlayer.jsx` alerts
- [ ] Migrate `dashboard.jsx` copy
- [ ] Add more daily motivational messages

---

## A/B Testing Setup

To test different tones:

```javascript
// In app initialization (e.g., App.js or _layout.tsx)
import { setTone } from "./utils/messages";

// Randomly assign tone for A/B test
const userTone = Math.random() > 0.5 ? "atomic" : "default";
setTone(userTone);

// Log to analytics
analytics.logEvent("tone_assigned", { tone: userTone });
```

---

## Future Enhancements

1. **Localization (i18n)**:

   - Add `locale` parameter to `getMessage`
   - Structure: `MESSAGES[locale][key][tone]`

2. **User Preference**:

   - Let users choose their preferred tone
   - Store in AsyncStorage or user profile

3. **Dynamic Loading**:

   - Load message catalogs from remote config
   - A/B test new copy without app updates

4. **Analytics Integration**:
   - Track which messages drive engagement
   - Measure conversion rates per tone

---

## Philosophy: Atomic Habits Persona

The `atomic` tone is based on James Clear's _Atomic Habits_ principles:

| Principle                 | Implementation                                                |
| ------------------------- | ------------------------------------------------------------- |
| **Systems > Goals**       | "Build your first system" instead of "Create your first deck" |
| **1% Better Daily**       | "Find your next 1% gain" in search placeholder                |
| **Identity-Based**        | "You ARE this now" for 100% mastery                           |
| **Small Wins Compound**   | "Small wins stacking" for mid-progress                        |
| **Don't Break the Chain** | "Don't break the chain!" for streaks                          |
| **Reps Build Habits**     | "reps" instead of "cards reviewed"                            |

This tone aims to shift users from **goal-oriented** (pass NEET/JEE) to **system-oriented** (build daily study habits), which research shows is more effective for long-term behavior change.

---

## Questions?

For implementation questions or to suggest new messages, contact the development team or open an issue in the repo.
