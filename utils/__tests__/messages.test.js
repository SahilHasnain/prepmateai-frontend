/**
 * Unit Tests for Centralized Messaging System
 * Tests getMessage, tone switching, and helper functions
 */

import {
  getMessage,
  setTone,
  getTone,
  getDailyMessage,
  getMasteryText,
  getProgressFeedback,
} from "../messages";

describe("Centralized Messaging System", () => {
  beforeEach(() => {
    // Reset to default tone before each test
    setTone("atomic");
  });

  describe("getMessage", () => {
    test("should return correct message for simple key", () => {
      const title = getMessage("header.title");
      expect(title).toBe("Your Daily Ritual 🎯");
    });

    test("should return message with interpolation", () => {
      const message = getMessage("summary.cardsReviewed", { count: 10 });
      expect(message).toBe("📘 10 reps today");
    });

    test("should return message with multiple variables", () => {
      const message = getMessage("delete.message", { topic: "Physics" });
      expect(message).toContain("Physics");
      expect(message).toContain("rituals");
    });

    test("should return key itself if not found", () => {
      const message = getMessage("nonexistent.key");
      expect(message).toBe("nonexistent.key");
    });

    test("should handle nested keys correctly", () => {
      const feedback = getMessage("deckFeedback.tier5");
      expect(feedback).toContain("Identity shift");
    });
  });

  describe("Tone Switching", () => {
    test("should return atomic tone messages by default", () => {
      const subtitle = getMessage("header.subtitle");
      expect(subtitle).toBe("Build the habit. Let the system work.");
    });

    test("should switch to default tone when set", () => {
      setTone("default");
      const subtitle = getMessage("header.subtitle");
      expect(subtitle).toBe("Track your progress and keep learning");
    });

    test("should not change tone for invalid tone name", () => {
      const currentTone = getTone();
      setTone("invalid_tone");
      expect(getTone()).toBe(currentTone);
    });

    test("should return correct empty state messages per tone", () => {
      // Atomic tone
      setTone("atomic");
      expect(getMessage("emptyState.title")).toContain("system");

      // Default tone
      setTone("default");
      expect(getMessage("emptyState.title")).toContain("deck");
    });
  });

  describe("Helper Functions", () => {
    test("getDailyMessage should return a message from the list", () => {
      const message = getDailyMessage();
      expect(typeof message).toBe("string");
      expect(message.length).toBeGreaterThan(0);
    });

    test("getDailyMessage should return same message on same day", () => {
      const message1 = getDailyMessage();
      const message2 = getDailyMessage();
      expect(message1).toBe(message2);
    });

    test("getMasteryText should return correct tier based on progress", () => {
      expect(getMasteryText(10, 10)).toContain("Locked In");
      expect(getMasteryText(7, 10)).toContain("Building habit");
      expect(getMasteryText(3, 10)).toContain("System active");
    });

    test("getProgressFeedback should return correct feedback tier", () => {
      expect(getProgressFeedback(1.0)).toContain("Identity shift");
      expect(getProgressFeedback(0.8)).toContain("System working");
      expect(getProgressFeedback(0.6)).toContain("Momentum building");
      expect(getProgressFeedback(0.4)).toContain("Small wins");
      expect(getProgressFeedback(0.1)).toContain("Day 1");
    });
  });

  describe("Error Messages", () => {
    test("should return error messages correctly", () => {
      expect(getMessage("errors.invalidTopic")).toContain("topic");
      expect(getMessage("errors.networkError")).toContain("Network");
      expect(getMessage("errors.passwordTooShort")).toContain("6");
    });

    test("should handle tone variants for errors", () => {
      setTone("atomic");
      const atomicError = getMessage("errors.invalidEmail");
      setTone("default");
      const defaultError = getMessage("errors.invalidEmail");
      expect(atomicError).not.toBe(defaultError);
    });
  });

  describe("Success Messages", () => {
    test("should return success messages correctly", () => {
      expect(getMessage("success.deckCreated")).toContain("System Created");
      expect(getMessage("success.planGenerated")).toContain("blueprint");
    });
  });

  describe("Flashcard Actions", () => {
    test("should return flashcard action labels", () => {
      setTone("atomic");
      expect(getMessage("flashcardActions.forgot")).toBe("Reset Rep");
      expect(getMessage("flashcardActions.unsure")).toBe("Half Rep");
      expect(getMessage("flashcardActions.remembered")).toBe("Full Rep");
    });

    test("should change labels when tone is switched", () => {
      setTone("default");
      expect(getMessage("flashcardActions.forgot")).toBe("Forgot");
      expect(getMessage("flashcardActions.unsure")).toBe("Unsure");
      expect(getMessage("flashcardActions.remembered")).toBe("Remembered");
    });
  });

  describe("Edge Cases", () => {
    test("should handle empty context object", () => {
      const message = getMessage("header.title", {});
      expect(message).toBe("Your Daily Ritual 🎯");
    });

    test("should not replace variables that don't exist in context", () => {
      const message = getMessage("summary.cardsReviewed", { wrong: 5 });
      expect(message).toContain("{count}");
    });

    test("should handle undefined context gracefully", () => {
      const message = getMessage("header.subtitle", undefined);
      expect(message).toBe("Build the habit. Let the system work.");
    });
  });
});
