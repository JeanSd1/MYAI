# Design Guidelines: AI Chat Interface

## Design Approach

**Selected Approach:** Reference-Based (ChatGPT-inspired)

**Primary Reference:** ChatGPT's interface, known for its clean, distraction-free chat experience with excellent information hierarchy and intuitive interaction patterns.

**Key Design Principles:**
1. Clarity over decoration - every element serves a functional purpose
2. Conversation-focused layout that eliminates distractions
3. Responsive fluidity that adapts seamlessly across devices
4. Subtle visual feedback for all interactive states

---

## Typography System

**Font Families:**
- Primary: 'Inter' (Google Fonts) for UI elements, buttons, labels
- Content: 'Söhne' fallback to system fonts (ui-sans-serif, system-ui, -apple-system) for chat messages

**Type Scale:**
- Chat messages: text-base (16px) with line-height relaxed (1.75)
- User input: text-base (16px)
- Timestamps: text-xs (12px), opacity-60
- Sidebar items: text-sm (14px)
- Page headers: text-lg (18px) font-semibold
- Model selector: text-sm (14px)

**Hierarchy:**
- User messages: font-normal
- AI responses: font-normal (distinguished by background treatment)
- System messages: text-sm, opacity-70, italic

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 3, 4, 6, 8** primarily
- Component padding: p-3, p-4
- Message spacing: gap-4, gap-6
- Sidebar padding: p-4
- Input area padding: p-4
- Section margins: mb-6, mt-8

**Grid Structure:**

Desktop Layout (lg and above):
- Sidebar: Fixed width 260px on left
- Main chat area: flex-1 (remaining space)
- Maximum content width: max-w-3xl centered within chat area

Mobile Layout:
- Sidebar: Slide-over drawer (full-width overlay)
- Main chat: Full-width with safe padding (px-4)
- Hamburger menu button in top-left corner

**Vertical Rhythm:**
- Messages container: Consistent py-6 spacing
- Individual messages: mb-6 between message groups
- Input area: Fixed to bottom with py-4

---

## Component Library

### Layout Components

**Sidebar:**
- Fixed left panel on desktop (w-64, h-screen)
- Contains: New chat button, conversation history list, user settings at bottom
- Conversation list items: rounded-lg, px-3, py-2, hover states
- Scrollable history with subtle scrollbar styling
- Divider between sections using border-t with opacity-10

**Main Chat Container:**
- Full height viewport layout
- Three sections: Header bar (fixed top), Messages area (scrollable), Input area (fixed bottom)
- Messages container: overflow-y-auto, smooth scrolling behavior
- Background: Subtle gradient or solid depending on theme requirements

**Header Bar:**
- Height: h-14
- Contains: Model selector dropdown (center), settings icon (right)
- Sticky positioning, backdrop blur effect (backdrop-blur-sm)
- Border bottom with subtle opacity

### Message Components

**User Message:**
- Max width: max-w-3xl
- Alignment: ml-auto (right-aligned feel)
- Padding: px-4, py-3
- No background box - clean text presentation

**AI Message:**
- Max width: max-w-3xl
- Full width treatment with subtle background differentiation
- Padding: px-4, py-6
- Avatar/icon: Left-aligned, 28x28px, mr-3
- Message content: Supports markdown rendering (code blocks, lists, bold, italic)

**Code Blocks:**
- Background: Distinct from message background
- Padding: p-4
- Border radius: rounded-lg
- Copy button: Absolute positioned top-right
- Font: font-mono, text-sm
- Syntax highlighting ready structure

**Typing Indicator:**
- Three animated dots
- Size: w-2 h-2 each
- Animation: Subtle bounce with staggered delay
- Container padding: py-6

### Input Components

**Message Input Area:**
- Fixed bottom positioning
- Max width: max-w-3xl, centered
- Container padding: p-4
- Input wrapper: Rounded-2xl, border with focus states
- Multi-line textarea with auto-expand (max 200px height)
- Send button: Absolute positioned bottom-right within input wrapper
- Send button: rounded-lg, p-2, disabled state when empty

**Send Button States:**
- Default: Subtle background, icon visible
- Hover: Enhanced background
- Disabled: Reduced opacity (opacity-40)
- Active: Slight scale transform

### Navigation & Controls

**New Chat Button:**
- Full width in sidebar
- Height: h-10
- Border: border with rounded-lg
- Icon + Text layout: Icon (20x20), ml-2 for text
- Hover: Background transition

**Conversation History Items:**
- Height: min-h-[44px] for touch targets
- Truncate long titles: truncate class
- Active state: Distinct background
- Hover state: Subtle background change
- Delete button: Appears on hover, right-aligned, p-1

**Model Selector Dropdown:**
- Trigger button: px-4, py-2, rounded-lg
- Dropdown menu: Absolute positioned, mt-2
- Menu items: px-4, py-2, hover states
- Checkmark for selected model
- Border and shadow on dropdown

### Feedback Elements

**Loading States:**
- Shimmer effect for message loading
- Typing indicator with animated dots
- Disabled input during processing

**Empty States:**
- Centered content when no messages
- Suggested prompts: Grid of 2x2 cards on desktop, stacked on mobile
- Each prompt card: p-4, rounded-xl, border, hover effect
- Prompt text: text-sm

**Error States:**
- Inline error messages below input
- Error icon + text combination
- Retry button when applicable
- Error message styling: text-sm, red tone indication

---

## Interaction Patterns

**Message Flow:**
1. User types and sends message
2. Message appears immediately in chat
3. Input clears and typing indicator shows
4. AI response streams in (or appears complete)
5. Input re-enables for next message

**Keyboard Shortcuts:**
- Enter: Send message (Shift+Enter for new line)
- Cmd/Ctrl + K: Focus input
- Esc: Close sidebar on mobile

**Scroll Behavior:**
- Auto-scroll to bottom on new messages
- Smooth scroll animation
- Maintain scroll position when loading history
- Scroll-to-bottom button appears when not at bottom

---

## Responsive Breakpoints

**Mobile (< 768px):**
- Hamburger menu for sidebar
- Full-width messages
- Reduced padding (px-4 instead of px-6)
- Simplified header with essential controls only
- Input area: Full width with px-3

**Tablet (768px - 1024px):**
- Collapsible sidebar option
- Messages: max-w-2xl
- Maintain desktop-like layout

**Desktop (1024px+):**
- Full sidebar visible
- Messages: max-w-3xl
- Optimal spacing and padding

---

## Accessibility

**Focus Management:**
- Visible focus rings on all interactive elements (ring-2 ring-offset-2)
- Logical tab order through interface
- Focus trap in sidebar when open on mobile

**ARIA Labels:**
- Descriptive labels for icon-only buttons
- Role="log" for messages container
- Live region announcements for new messages
- Status updates for loading/error states

**Keyboard Navigation:**
- All actions accessible via keyboard
- Skip to main content link
- Esc to dismiss modals/drawers

---

## Images

**No large hero images required** - This is a functional chat interface where images would be distracting.

**Icon Usage:**
- Heroicons (via CDN) for all interface icons
- Message send icon, new chat icon, menu icons, settings gear
- User avatar placeholder (circular, 28x28px)
- AI avatar icon/logo (circular, 28x28px)

---

## Animation Strategy

**Minimal, purposeful animations only:**
- Message appearance: Subtle fade-in (150ms)
- Typing indicator: Gentle dot bounce
- Button hover: 150ms background transitions
- Sidebar slide: 200ms ease-in-out
- Scroll: Smooth behavior enabled

**No scroll-triggered effects or parallax** - Maintains focus on conversation.