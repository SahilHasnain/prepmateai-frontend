# Custom Hooks Quick Reference

## 📚 Available Hooks

### **Business Logic Hooks**

#### **usePlannerForm**

```javascript
import { usePlannerForm } from "../hooks/usePlannerForm";

const MyComponent = ({ userId }) => {
  const {
    selectedTopics, // string[] - Selected topics
    hours, // string - Hour input value
    plan, // array - Generated plan items
    loading, // boolean - API loading state
    toggleTopic, // (topic: string) => void
    setHours, // (hours: string) => void
    generatePlan, // () => Promise<void>
    resetForm, // () => void
  } = usePlannerForm(userId);
};
```

**Use Cases:**

- Study planner forms
- Topic selection UI
- AI plan generation
- Form validation

---

#### **useReminderManager**

```javascript
import { useReminderManager } from "../hooks/useReminderManager";

const MyComponent = ({ userId }) => {
  const {
    showTimePicker, // boolean - Modal visibility
    reminderTime, // Date - Selected time
    settingReminder, // boolean - API loading
    showPicker, // () => void - Show modal
    hidePicker, // () => void - Hide modal
    setReminderTime, // (date: Date) => void
    setReminder, // () => Promise<boolean>
  } = useReminderManager(userId);
};
```

**Use Cases:**

- Daily study reminders
- Habit notifications
- Custom alarms
- Any notification feature

---

#### **useFeedbackTracking**

```javascript
import { useFeedbackTracking } from "../hooks/useFeedbackTracking";

const MyComponent = () => {
  const {
    counts, // { greens, yellows, reds }
    trackFeedback, // (type: 'remembered' | 'unsure' | 'forgot') => void
    revertFeedback, // (type: string) => void
    resetCounts, // () => void
    getTotalCount, // () => number
    getAccuracy, // () => number (0-100)
  } = useFeedbackTracking();
};
```

**Use Cases:**

- Flashcard analytics
- Performance tracking
- Progress visualization
- Statistics dashboard

---

### **Data Fetching Hooks**

#### **useDeckPlayer** (Existing)

```javascript
import { useDeckPlayer } from "../hooks/useDeckPlayer";

const {
  cards, // array - Flashcards
  loading, // boolean
  error, // string | null
  currentIndex, // number
  reviewedCount, // number
  nextReview, // Date | null
  streak, // number
  totalCards, // number
  setCards, // (cards) => void
  setReviewedCount, // (count) => void
  retry, // () => void
  shuffle, // () => void
} = useDeckPlayer(userId, topic);
```

---

#### **useOfflineQueue** (Existing)

```javascript
import { useOfflineQueue } from "../hooks/useOfflineQueue";

const {
  offlineQueue, // array - Pending items
  submitting, // boolean
  lastFeedback, // object | null
  setLastFeedback, // (feedback) => void
  submitFeedback, // (data) => Promise<result>
  undo, // () => object | null
} = useOfflineQueue(userId);
```

---

#### **useFlashcardStats** (Existing)

```javascript
import { useFlashcardStats } from "../hooks/useFlashcardStats";

const {
  stats, // object - { cardsReviewedToday, cardsMasteredToday, totalDecks }
  decks, // array - Deck list with progress
  loading, // boolean
  error, // string | null
  refresh, // () => void
  deleteDeck, // (deckId) => Promise<boolean>
} = useFlashcardStats(userId);
```

---

#### **useAuth** (Existing)

```javascript
import { useAuth } from "../hooks/useAuth";

const {
  user, // object | null
  loading, // boolean
  refreshUser, // () => void
} = useAuth();
```

---

## 🎯 Hook Combination Patterns

### **Pattern 1: Complete Deck Player**

```javascript
const DeckPlayer = () => {
  const { user } = useAuth();
  const { topic } = useLocalSearchParams();

  // Data
  const { cards, loading, error, retry } = useDeckPlayer(user?.$id, topic);

  // Feedback
  const { submitFeedback, undo } = useOfflineQueue(user?.$id);
  const { counts, trackFeedback, revertFeedback } = useFeedbackTracking();

  // Reminders
  const { showPicker, setReminder, settingReminder } = useReminderManager(user?.$id);

  return (/* UI */);
};
```

---

### **Pattern 2: Statistics Dashboard**

```javascript
const StatsDashboard = () => {
  const { user } = useAuth();
  const { stats, decks, loading } = useFlashcardStats(user?.$id);
  const { counts, getAccuracy } = useFeedbackTracking();

  return (
    <View>
      <DailySummary stats={stats} />
      <AccuracyChart accuracy={getAccuracy()} />
      <FeedbackBreakdown counts={counts} />
    </View>
  );
};
```

---

### **Pattern 3: Planner with Reminders**

```javascript
const StudyPlanner = () => {
  const { user } = useAuth();

  // Planner
  const { selectedTopics, plan, generatePlan, loading } = usePlannerForm(
    user?.$id,
  );

  // Reminder
  const { showPicker, setReminder } = useReminderManager(user?.$id);

  return (
    <View>
      <PlannerForm {...{ selectedTopics, plan, generatePlan, loading }} />
      <Button onPress={showPicker}>Set Daily Reminder</Button>
    </View>
  );
};
```

---

## ⚠️ Common Mistakes

### **❌ Don't: Mix Business Logic in Components**

```javascript
// BAD
const MyComponent = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(API_URL); // ❌ API call in component
    const result = await response.json();
    setData(result.data);
  };

  return (...);
};
```

### **✅ Do: Use Custom Hooks**

```javascript
// GOOD
const MyComponent = () => {
  const { data, loading, refresh } = useMyDataHook(); // ✅ Logic in hook
  return (...);
};
```

---

### **❌ Don't: Duplicate Logic Across Components**

```javascript
// BAD - Same logic in 3 files
const Screen1 = () => {
  const [counts, setCounts] = useState({ greens: 0, yellows: 0, reds: 0 });
  const track = (type) =>
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
};

const Screen2 = () => {
  const [counts, setCounts] = useState({ greens: 0, yellows: 0, reds: 0 });
  const track = (type) =>
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
};
```

### **✅ Do: Create Reusable Hook**

```javascript
// GOOD - One hook, many components
const Screen1 = () => {
  const { counts, trackFeedback } = useFeedbackTracking();
};

const Screen2 = () => {
  const { counts, trackFeedback } = useFeedbackTracking();
};
```

---

## 🧪 Testing Hooks

### **Test in Isolation:**

```javascript
import { renderHook, act } from "@testing-library/react-hooks";
import { useFeedbackTracking } from "../hooks/useFeedbackTracking";

test("tracks feedback correctly", () => {
  const { result } = renderHook(() => useFeedbackTracking());

  act(() => {
    result.current.trackFeedback("remembered");
  });

  expect(result.current.counts.greens).toBe(1);
});
```

### **Test with Dependencies:**

```javascript
test('generates plan', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ success: true, data: [...] })
  }));

  const { result } = renderHook(() => usePlannerForm('user123'));

  await act(() => result.current.generatePlan());

  expect(result.current.plan).toHaveLength(5);
});
```

---

## 📋 Migration Checklist

When converting a component to use hooks:

1. ✅ Identify business logic (API calls, state management, validation)
2. ✅ Check if existing hook can be reused
3. ✅ Create new hook if needed (single responsibility!)
4. ✅ Move all logic to hook
5. ✅ Update component to use hook
6. ✅ Remove old state/functions from component
7. ✅ Test hook independently
8. ✅ Verify component still works

---

## 🎓 Best Practices

### **1. Single Responsibility**

```javascript
// ✅ GOOD - One purpose
const useReminderManager = () => {
  // Only handles reminders
};

// ❌ BAD - Too many things
const useEverything = () => {
  // Handles reminders, stats, API, auth, UI state...
};
```

### **2. Clear Return Values**

```javascript
// ✅ GOOD - Descriptive names
const {
  showPicker, // Function to show
  hidePicker, // Function to hide
  settingReminder, // Loading state
} = useReminderManager(userId);

// ❌ BAD - Unclear names
const { show, hide, loading } = useReminderManager(userId);
```

### **3. Optional Cleanup**

```javascript
const useMyHook = () => {
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription.unsubscribe(); // ✅ Cleanup
  }, []);
};
```

---

## 🚀 Future Hooks (Ideas)

### **useHabitTracker**

```javascript
const { habits, addHabit, markComplete, getStreak } = useHabitTracker(userId);
```

### **useQuizMode**

```javascript
const { questions, currentQuestion, submitAnswer, score } = useQuizMode(topic);
```

### **useStudyTimer**

```javascript
const { timeElapsed, start, pause, reset } = useStudyTimer();
```
