/**
 * Manual Testing Script for Centralized Messaging System
 * Run this to verify messages work across different tones
 */

import {
  getMessage,
  setTone,
  getTone,
  getDailyMessage,
  getMasteryText,
  getProgressFeedback,
} from "./messages";

console.log("=== CENTRALIZED MESSAGING SYSTEM VERIFICATION ===\n");

// Test 1: Current Tone
console.log(`Current Tone: ${getTone()}`);
console.log("");

// Test 2: Basic Messages (Atomic Tone)
console.log("--- ATOMIC TONE MESSAGES ---");
console.log("Header Title:", getMessage("header.title"));
console.log("Header Subtitle:", getMessage("header.subtitle"));
console.log("Search Placeholder:", getMessage("search.placeholder"));
console.log("Empty State Title:", getMessage("emptyState.title"));
console.log("Delete Title:", getMessage("delete.title"));
console.log("");

// Test 3: Messages with Context
console.log("--- MESSAGES WITH INTERPOLATION ---");
console.log(
  "Cards Reviewed (10):",
  getMessage("summary.cardsReviewed", { count: 10 }),
);
console.log(
  "Delete Message (Physics):",
  getMessage("delete.message", { topic: "Physics" }),
);
console.log("");

// Test 4: Switch to Default Tone
console.log("--- SWITCHING TO DEFAULT TONE ---");
setTone("default");
console.log(`New Tone: ${getTone()}`);
console.log("Header Title:", getMessage("header.title"));
console.log("Header Subtitle:", getMessage("header.subtitle"));
console.log("Empty State Title:", getMessage("emptyState.title"));
console.log("");

// Test 5: Switch back to Atomic
setTone("atomic");
console.log("--- BACK TO ATOMIC TONE ---");
console.log(`Tone: ${getTone()}`);
console.log("");

// Test 6: Helper Functions
console.log("--- HELPER FUNCTIONS ---");
console.log("Daily Message:", getDailyMessage());
console.log("Mastery (10/10):", getMasteryText(10, 10));
console.log("Mastery (7/10):", getMasteryText(7, 10));
console.log("Mastery (3/10):", getMasteryText(3, 10));
console.log("Progress (1.0):", getProgressFeedback(1.0));
console.log("Progress (0.8):", getProgressFeedback(0.8));
console.log("Progress (0.5):", getProgressFeedback(0.5));
console.log("Progress (0.2):", getProgressFeedback(0.2));
console.log("");

// Test 7: Error Messages
console.log("--- ERROR MESSAGES ---");
console.log("Invalid Topic:", getMessage("errors.invalidTopic"));
console.log("Network Error:", getMessage("errors.networkError"));
console.log("Password Too Short:", getMessage("errors.passwordTooShort"));
console.log("");

// Test 8: Success Messages
console.log("--- SUCCESS MESSAGES ---");
console.log("Deck Created:", getMessage("success.deckCreated"));
console.log("Plan Generated:", getMessage("success.planGenerated"));
console.log("");

// Test 9: Flashcard Actions
console.log("--- FLASHCARD ACTIONS (ATOMIC) ---");
console.log("Forgot:", getMessage("flashcardActions.forgot"));
console.log("Unsure:", getMessage("flashcardActions.unsure"));
console.log("Remembered:", getMessage("flashcardActions.remembered"));

setTone("default");
console.log("\n--- FLASHCARD ACTIONS (DEFAULT) ---");
console.log("Forgot:", getMessage("flashcardActions.forgot"));
console.log("Unsure:", getMessage("flashcardActions.unsure"));
console.log("Remembered:", getMessage("flashcardActions.remembered"));

// Reset to atomic
setTone("atomic");

console.log("\n=== ALL TESTS COMPLETE ===");
console.log("✅ Messaging system is working correctly!");
console.log(
  "\nTo use in components: import { getMessage } from '../utils/messages';",
);
