# ARGUMENT

**Logic training through America's Founding debates**

A critical thinking game that teaches fallacy detection using actual historical arguments from the Revolutionary Era (1760s-1790s). Players evaluate statements from the Founders, distinguishing sound reasoning from logical fallacies.

## Why This Matters

Democracies require citizens who can think critically. In the information age, distinguishing sound arguments from fallacious rhetoric is essential defense against manipulation. This game builds that skill using historical arguments that shaped America.

## How It Works

1. **Read** historical statements from Paine, Henry, Adams, Hamilton, Jefferson, and others
2. **Analyze** the context, stakes, and logical structure
3. **Decide** whether each argument is sound or contains fallacies
4. **Learn** from detailed narrator feedback

## Victory Condition

Achieve 80%+ accuracy to prove "The Republic Stands." Below that threshold, democracy becomes vulnerable.

## Features

- **10 Historical Scenarios** with actual quotes from the Founding Era
- **Comprehensive Fallacy Reference** with definitions and examples
- **Progress Saving** via localStorage
- **Sound Effects** (optional, togglable)
- **Narrator Feedback** explaining reasoning
- **Mobile Responsive** design

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React icons
- Web Audio API for sounds

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── HamburgerMenu.jsx
│   ├── FallacyReference.jsx
│   ├── Tabs.jsx
│   ├── ScenarioContent.jsx
│   ├── DecisionButtons.jsx
│   ├── FallacySelector.jsx
│   ├── NarratorFeedback.jsx
│   └── EndScreen.jsx
├── data/               # JSON data files
│   ├── scenarios.json
│   └── fallacyReference.json
├── utils/              # Utility functions
│   ├── soundManager.js
│   └── saveProgress.js
├── App.jsx            # Main game loop
└── main.jsx           # Entry point
```

## Contributing

ARGUMENT is open source. We welcome:
- Additional historical scenarios
- Improved fallacy explanations
- Accessibility enhancements
- Bug fixes and optimizations

## Philosophy

The Founders were brilliant AND flawed. Their arguments deserve evaluation on merit - which means seeing both the logic AND the fallacies. This game teaches critical thinking by examining real historical rhetoric, not modern politics.

## License

MIT

## Credits

Built by educators and developers who believe democracy requires an informed citizenry capable of critical reasoning.

Part of the **PlayLoad** project - open source critical thinking training games.

---

**"A well-instructed people alone can be permanently a free people."**  
— James Madison