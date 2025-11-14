# Atomic Components Quick Reference Guide

## 🔹 Atoms

### Badge

**Purpose:** Reusable label/tag with preset color schemes

**Props:**

- `text` (string, required) - Badge label
- `variant` (string, optional) - Color scheme: `easy`, `medium`, `hard`, `streak`, `achievement`, `success`, `default`
- `size` (string, optional) - Size: `small`, `medium`, `large`

**Example:**

```jsx
import Badge from '../atoms/Badge';

<Badge text="HARD" variant="hard" size="small" />
<Badge text="🔥 5 days" variant="streak" />
```

---

### IconButton

**Purpose:** Consistent icon-based action buttons

**Props:**

- `icon` (string, required) - Emoji or text icon
- `onPress` (function, required) - Click handler
- `variant` (string, optional) - `primary`, `danger`, `transparent`, `default`
- `size` (string, optional) - `small`, `medium`, `large`
- `accessibilityLabel` (string, required) - Screen reader label
- `disabled` (boolean, optional)

**Example:**

```jsx
import IconButton from "../atoms/IconButton";

<IconButton
  icon="🗑️"
  onPress={handleDelete}
  variant="danger"
  size="small"
  accessibilityLabel="Delete item"
/>;
```

---

### LoadingState

**Purpose:** Consistent loading spinner with optional message

**Props:**

- `message` (string, optional) - Loading text

**Example:**

```jsx
import LoadingState from "../atoms/LoadingState";

{
  loading && <LoadingState message="Generating flashcards..." />;
}
```

---

### ErrorState

**Purpose:** Error display with retry button

**Props:**

- `error` (string, required) - Error message
- `onRetry` (function, optional) - Retry handler

**Example:**

```jsx
import ErrorState from "../atoms/ErrorState";

{
  error && <ErrorState error={error} onRetry={refresh} />;
}
```

---

## 🔸 Molecules

### TopicSelector

**Purpose:** Multi-select topic chips for forms

**Props:**

- `topics` (array, required) - Available topics
- `selectedTopics` (array, required) - Currently selected
- `onToggle` (function, required) - Selection handler

**Example:**

```jsx
import TopicSelector from "../molecules/TopicSelector";

const [selected, setSelected] = useState([]);

const toggleTopic = (topic) => {
  setSelected((prev) =>
    prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
  );
};

<TopicSelector
  topics={["Physics", "Chemistry", "Biology"]}
  selectedTopics={selected}
  onToggle={toggleTopic}
/>;
```

---

### DailySummaryCard

**Purpose:** Animated daily progress summary

**Props:**

- `stats` (object, required) - `{ cardsReviewedToday, cardsMasteredToday }`
- `fadeAnim` (Animated.Value, required) - Fade animation

**Example:**

```jsx
import DailySummaryCard from "../molecules/DailySummaryCard";
import { Animated } from "react-native";

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 600,
    useNativeDriver: true,
  }).start();
}, [stats]);

<DailySummaryCard stats={stats} fadeAnim={fadeAnim} />;
```

---

### ActionButtons

**Purpose:** Post-completion action button group

**Props:**

- `onReviewMistakes` (function, required) - Review handler
- `onSetReminder` (function, required) - Reminder handler
- `settingReminder` (boolean, optional) - Loading state
- `showReviewMistakes` (boolean, optional) - Show/hide first button

**Example:**

```jsx
import ActionButtons from "../molecules/ActionButtons";

<ActionButtons
  onReviewMistakes={() => router.push("/review")}
  onSetReminder={() => setShowPicker(true)}
  settingReminder={loading}
/>;
```

---

### ReminderModal

**Purpose:** Time picker modal overlay

**Props:**

- `visible` (boolean, required) - Show/hide modal
- `onClose` (function, required) - Cancel handler
- `onConfirm` (function, required) - Set time handler
- `reminderTime` (Date, required) - Current time
- `onTimeChange` (function, required) - Time change handler

**Example:**

```jsx
import ReminderModal from "../molecules/ReminderModal";

const [show, setShow] = useState(false);
const [time, setTime] = useState(new Date());

<ReminderModal
  visible={show}
  onClose={() => setShow(false)}
  onConfirm={handleSetReminder}
  reminderTime={time}
  onTimeChange={setTime}
/>;
```

---

### PlanItem

**Purpose:** Individual study plan card

**Props:**

- `topic` (string, required)
- `duration` (number, required) - Minutes
- `difficulty` (string, required) - `easy`, `medium`, `hard`

**Example:**

```jsx
import PlanItem from "../molecules/PlanItem";

{
  plan.map((item, i) => (
    <PlanItem
      key={i}
      topic={item.topic}
      duration={item.duration}
      difficulty={item.difficulty}
    />
  ));
}
```

---

## 🔷 Organisms

### CardList

**Purpose:** Complete deck list with refresh + summary

**Props:**

- `decks` (array, required) - Deck objects
- `stats` (object, required) - Stats for summary card
- `fadeAnim` (Animated.Value, required) - Summary animation
- `refreshing` (boolean, required) - Pull-to-refresh state
- `onRefresh` (function, required) - Refresh handler
- `onDeckPress` (function, required) - Deck click handler
- `onDelete` (function, required) - Delete handler `(deckId, topic) => {}`

**Example:**

```jsx
import CardList from "../organisms/CardList";

const [refreshing, setRefreshing] = useState(false);

const handleRefresh = async () => {
  setRefreshing(true);
  await refresh();
  setRefreshing(false);
};

<CardList
  decks={decks}
  stats={stats}
  fadeAnim={fadeAnim}
  refreshing={refreshing}
  onRefresh={handleRefresh}
  onDeckPress={(topic) => router.push(`/deck?topic=${topic}`)}
  onDelete={(id, topic) => deleteDeck(id)}
/>;
```

---

### PlannerForm

**Purpose:** Self-contained study planner

**Props:**

- `userId` (string, required) - User ID for API calls

**Example:**

```jsx
import PlannerForm from "../organisms/PlannerForm";
import { useAuth } from "../../hooks/useAuth";

const { user } = useAuth();

<ScrollView>
  <PlannerForm userId={user.$id} />
</ScrollView>;
```

**Features:**

- Topic selection (8 NEET/JEE topics)
- Hour input with validation
- AI plan generation
- Plan display with difficulty badges
- All state managed internally

---

## 📦 Barrel Exports

**Use index files for cleaner imports:**

```jsx
// Instead of:
import Badge from "../atoms/Badge";
import IconButton from "../atoms/IconButton";
import LoadingState from "../atoms/LoadingState";

// Use:
import { Badge, IconButton, LoadingState } from "../atoms";
```

**Available:**

- `components/atoms/index.js`
- `components/molecules/index.js`
- `components/organisms/index.js`

---

## 🎨 Color Variants Reference

### Badge Variants:

- `easy` → Green (bg-green-100, text-green-700)
- `medium` → Yellow (bg-yellow-100, text-yellow-700)
- `hard` → Red (bg-red-100, text-red-700)
- `streak` → Amber (bg-amber-100, text-amber-700)
- `achievement` → Yellow (same as medium)
- `success` → Blue (bg-blue-100, text-blue-700)
- `default` → Gray (bg-gray-100, text-gray-700)

### IconButton Variants:

- `primary` → Blue background (bg-blue-500)
- `danger` → Red background (bg-red-500)
- `transparent` → No background
- `default` → Gray background (bg-gray-200)

---

## ✅ Best Practices

### 1. **Use Atoms for Consistency**

```jsx
// ❌ Don't create inline badges
<View className="px-3 py-1 bg-green-100 rounded-full">
  <Text className="text-green-700">Easy</Text>
</View>

// ✅ Use Badge atom
<Badge text="Easy" variant="easy" size="small" />
```

### 2. **Delegate Complex UI to Organisms**

```jsx
// ❌ Don't embed 60-line FlatList in screen
function MyScreen() {
  return (
    <FlatList
    // 60 lines of config
    />
  );
}

// ✅ Use CardList organism
function MyScreen() {
  return <CardList decks={decks} onPress={handlePress} />;
}
```

### 3. **Extract Repeated Patterns to Molecules**

```jsx
// ❌ Don't repeat topic selection UI
<View className="flex-row flex-wrap">
  {topics.map(t => <TouchableOpacity>...</TouchableOpacity>)}
</View>

// ✅ Use TopicSelector molecule
<TopicSelector topics={topics} selectedTopics={selected} onToggle={toggle} />
```

---

## 🚀 Migration Checklist

When refactoring a screen:

1. ✅ Replace error UIs with `ErrorState`
2. ✅ Replace loading spinners with `LoadingState`
3. ✅ Extract JSX chunks > 40 lines into molecules/organisms
4. ✅ Use `Badge` for all labels/tags
5. ✅ Use `IconButton` for all icon actions
6. ✅ Keep screens < 150 lines
7. ✅ Add accessibility labels to interactive components
