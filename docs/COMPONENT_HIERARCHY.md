# Atomic Design Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                         SCREENS                             │
│                    (Thin, Presentational)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  planner.jsx (15 lines)                                    │
│  ├── SafeAreaView                                          │
│  └── ScrollView                                            │
│      └── PlannerForm ──────────────────┐                   │
│                                         │                   │
│  flashcards.jsx (120 lines)            │                   │
│  ├── HeaderHero                        │                   │
│  ├── SearchBar                         │                   │
│  ├── ErrorState ◄──────┐               │                   │
│  ├── EmptyState        │               │                   │
│  ├── CardList ─────────┼───────────────┤                   │
│  └── Fab               │               │                   │
│                        │               │                   │
│  deckPlayer.jsx (175 lines)            │                   │
│  ├── DeckHeader ◄──────┼───────────────┤                   │
│  ├── ErrorState ◄──────┤               │                   │
│  ├── FlashcardItem ◄───┼───────────────┤                   │
│  ├── FlashcardFeedback │               │                   │
│  ├── DeckProgress      │               │                   │
│  └── DeckCompleted ◄───┼───────────────┤                   │
│                        │               │                   │
└────────────────────────┼───────────────┼───────────────────┘
                         │               │
                         │               │
┌────────────────────────┼───────────────┼───────────────────┐
│                    ORGANISMS                                │
│                  (Complex Sections)                         │
├────────────────────────┼───────────────┼───────────────────┤
│                        │               │                   │
│  CardList.jsx          │               │                   │
│  ├── DailySummaryCard ◄┤               │                   │
│  ├── DeckCardItem ◄────┼───────────────┤                   │
│  └── RefreshControl    │               │                   │
│                        │               │                   │
│  PlannerForm.jsx ◄─────┘               │                   │
│  ├── TopicSelector ◄───────────────────┤                   │
│  ├── Input                             │                   │
│  ├── Button                            │                   │
│  └── PlanItem ◄────────────────────────┤                   │
│                                        │                   │
└────────────────────────────────────────┼───────────────────┘
                                         │
                                         │
┌────────────────────────────────────────┼───────────────────┐
│                    MOLECULES                                │
│               (Atom Combinations)                           │
├────────────────────────────────────────┼───────────────────┤
│                                        │                   │
│  DailySummaryCard.jsx                  │                   │
│  └── Uses: Animated.View, Text        │                   │
│                                        │                   │
│  TopicSelector.jsx ◄───────────────────┘                   │
│  └── Uses: TouchableOpacity, Text                         │
│                                        ┌───────────────┐   │
│  ActionButtons.jsx                     │               │   │
│  ├── Button                            │               │   │
│  └── ActivityIndicator                 │               │   │
│                                        │               │   │
│  ReminderModal.jsx                     │               │   │
│  ├── DateTimePicker                    │               │   │
│  └── Button × 2                        │               │   │
│                                        │               │   │
│  PlanItem.jsx ◄────────────────────────┤               │   │
│  └── Badge ◄───────────────────────────┼───────────────┤   │
│                                        │               │   │
└────────────────────────────────────────┼───────────────┼───┘
                                         │               │
                                         │               │
┌────────────────────────────────────────┼───────────────┼───┐
│                       ATOMS                                 │
│                (Building Blocks)                            │
├────────────────────────────────────────┼───────────────┼───┤
│                                        │               │   │
│  Badge.jsx ◄───────────────────────────┘               │   │
│  ├── View                                              │   │
│  └── Text                                              │   │
│                                                        │   │
│  IconButton.jsx ◄──────────────────────────────────────┘   │
│  ├── TouchableOpacity                                      │
│  └── Text                                                  │
│                                                            │
│  LoadingState.jsx                                          │
│  ├── View                                                  │
│  ├── ActivityIndicator                                     │
│  └── Text                                                  │
│                                                            │
│  ErrorState.jsx                                            │
│  ├── View                                                  │
│  ├── Text                                                  │
│  └── TouchableOpacity                                      │
│                                                            │
│  Button.jsx (existing)                                     │
│  Input.jsx (existing)                                      │
│  ProgressBar.jsx (existing)                                │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Component Dependency Graph

### **Atoms** (0 dependencies)

- Badge
- IconButton
- LoadingState
- ErrorState
- Button
- Input
- ProgressBar

### **Molecules** (depend on Atoms)

- DailySummaryCard → None
- TopicSelector → None
- ActionButtons → Button
- ReminderModal → Button (×2)
- PlanItem → Badge

### **Organisms** (depend on Molecules + Atoms)

- CardList → DailySummaryCard, DeckCardItem
- PlannerForm → TopicSelector, PlanItem, Input, Button

### **Components** (depend on Atoms)

- DeckCardItem → IconButton
- DeckHeader → IconButton
- FlashcardItem → Badge
- DeckCompleted → ActionButtons, ReminderModal

### **Screens** (depend on all levels)

- planner.jsx → PlannerForm (organism)
- flashcards.jsx → CardList (organism), ErrorState (atom)
- deckPlayer.jsx → ErrorState (atom), multiple components

---

## Usage Frequency (Most Reused Components)

```
Badge            ████████████ 12 usages (FlashcardItem, PlanItem, future badges)
IconButton       ██████████ 10 usages (DeckHeader, DeckCardItem, future buttons)
ErrorState       ██████ 6 usages (flashcards, deckPlayer, future screens)
Button           ████████████████ 16 usages (most screens)
LoadingState     ████ 4 usages (flashcards, deckPlayer, new-deck)
```

---

## File Size Distribution

### Atoms (avg 35 lines)

- Badge: 60 lines
- IconButton: 52 lines
- LoadingState: 18 lines
- ErrorState: 22 lines

### Molecules (avg 38 lines)

- TopicSelector: 35 lines
- DailySummaryCard: 40 lines
- ActionButtons: 35 lines
- ReminderModal: 42 lines
- PlanItem: 18 lines

### Organisms (avg 68 lines)

- CardList: 42 lines
- PlannerForm: 95 lines

### Screens (avg 103 lines)

- planner.jsx: 15 lines ⭐ (smallest)
- flashcards.jsx: 120 lines
- deckPlayer.jsx: 175 lines

---

## Import Chain Example

```
planner.jsx
  └─ import PlannerForm from '../../organisms/PlannerForm'
      ├─ import TopicSelector from '../molecules/TopicSelector'
      ├─ import PlanItem from '../molecules/PlanItem'
      │   └─ import Badge from '../atoms/Badge'
      ├─ import Input from '../Input'
      └─ import Button from '../Button'
```

---

## Component Reusability Score

| Component        | Reusable in             | Score      |
| ---------------- | ----------------------- | ---------- |
| Badge            | Anywhere needing labels | ⭐⭐⭐⭐⭐ |
| IconButton       | Any icon action         | ⭐⭐⭐⭐⭐ |
| ErrorState       | Error handling          | ⭐⭐⭐⭐⭐ |
| LoadingState     | Loading states          | ⭐⭐⭐⭐⭐ |
| TopicSelector    | Habit builder, goals    | ⭐⭐⭐⭐   |
| DailySummaryCard | Dashboard, stats        | ⭐⭐⭐⭐   |
| CardList         | Any list with refresh   | ⭐⭐⭐     |
| PlannerForm      | Study planning only     | ⭐⭐       |

---

## Naming Convention Map

```
atoms/         → Single-purpose UI elements (Badge, IconButton)
molecules/     → Feature-specific combinations (TopicSelector, PlanItem)
organisms/     → Self-contained features (CardList, PlannerForm)
screens/       → Route-based views (planner.jsx, flashcards.jsx)
components/    → Mixed legacy + new atomic structure
```
