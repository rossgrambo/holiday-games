# Holiday System Implementation

## Overview

The project now automatically switches themes based on the current month. All holiday-specific content (emojis, strings, descriptions) is centralized in `resources.js`.

## How It Works

### `resources.js`
This file contains the `HolidayResources` class that:
- Determines the current holiday based on the month
- Provides all holiday-specific strings, emojis, and content
- Returns appropriate values for each holiday

### Holiday Calendar
- **October**: Halloween 🎃
- **November**: Thanksgiving 🦃
- **December**: Christmas 🎄
- **January**: New Year 🎆
- **February**: Valentine's Day 💝
- **March**: St. Patrick's Day ☘️
- **April**: Easter 🐰
- **May**: Spring 🌸
- **June**: Summer ☀️
- **July**: Independence Day 🎆
- **August**: Summer ☀️
- **September**: Fall 🍂

## Updated Files

### Core Files
- **`resources.js`** (NEW): Central holiday resource manager
- **`index.html`**: Updated to use dynamic IDs
- **`main.js`**: Uses holiday resources for reward system

### Game Files
- **`games/jump.html`**: Updated with dynamic content IDs
- **`games/run.html`**: Updated with dynamic content IDs  
- **`games/taxes.html`**: Updated with dynamic content IDs
- **`scripts/jump-game.js`**: Populates content from resources
- **`scripts/run-game.js`**: Populates content from resources
- **`scripts/taxes-game.js`**: Populates content from resources
- **`scripts/gallery.js`**: Populates gallery content
- **`scripts/falling-sprites.js`**: Uses holiday sprite types

## How to Use

### Getting Holiday-Specific Content

All files that need holiday content should:
1. Include `<script src="resources.js"></script>` (or `../resources.js` for game pages)
2. Access content via the global `holidayResources` object

### Example Usage

```javascript
// Get current holiday title
const title = holidayResources.getGalleryTitle();

// Get game-specific content
const runGameIcon = holidayResources.getRunGameIcon();
const jumpInstruction = holidayResources.getJumpInstruction();

// Get difficulty icons for current holiday
const icons = holidayResources.getDifficultyIcons();
// Returns: { easy: '👻', medium: '🎃', hard: '🧟', crazy: '💀' }
```

## Available Methods

### Gallery
- `getGalleryTitle()` - Main gallery heading
- `getGallerySubtitle()` - Gallery subtitle

### Run Game
- `getRunGameTitle()` - Game title with icon
- `getRunGameDescription()` - Game description
- `getRunGameIcon()` - Icon emoji
- `getRunGameWarning()` - In-game warning message

### Jump Game
- `getJumpGameTitle()` - Game title with icon
- `getJumpGameDescription()` - Game description
- `getJumpGameIcon()` - Icon emoji
- `getJumpInstruction()` - Jump instruction text

### Taxes Game
- `getTaxesGameTitle()` - Game title with icon
- `getTaxesGameDescription()` - Game description
- `getTaxesGameIcon()` - Icon emoji
- `getTaxesFormHeader()` - Form header text
- `getTaxesFormYear()` - Form year text

### Rewards & UI
- `getRewardEmoji()` - Reward modal emoji
- `getRewardTitle()` - Victory title
- `getRewardMessage(gameName)` - Victory message
- `getScoreLabel()` - Score label text
- `getDifficultyLabel()` - Difficulty label text
- `getContinueButtonText()` - Continue button text
- `getReturnButtonText()` - Return button text

### Misc
- `getDifficultyIcons()` - All difficulty level icons
- `getComingSoonIcon()` - Coming soon card icon
- `getComingSoonTitle()` - Coming soon title
- `getComingSoonDescription()` - Coming soon description
- `getSpriteTypes()` - Falling sprite types for current holiday
- `getAchievementsStorageKey()` - LocalStorage key
- `getConsoleVictoryMessage()` - Console log message

## Testing Different Holidays

To test different holidays without waiting for the calendar:

1. Open `resources.js`
2. Find the `determineHoliday()` method
3. Temporarily modify it to return a specific holiday:

```javascript
determineHoliday() {
    // Test mode - return specific holiday
    return 'christmas';  // or 'thanksgiving', 'easter', etc.
    
    // Normal mode (comment out test mode above)
    switch(this.currentMonth) {
        case 9: return 'halloween';
        // ...
    }
}
```

## Adding New Holidays

To add a new holiday:

1. Add the month mapping in `determineHoliday()`
2. Add entries for the new holiday in each method:
   - Gallery methods
   - Game-specific methods
   - Reward methods
   - UI methods

## Sprite Images

The falling sprites system now dynamically selects sprite types based on the holiday. Ensure you have sprite images for each holiday in the `sprites/` folder:

### Halloween
- `skull.png`
- `pumpkin.png`

### Other Holidays (examples)
- `turkey.png`, `corn.png` (Thanksgiving)
- `snowflake.png`, `ornament.png` (Christmas)
- `heart.png`, `rose.png` (Valentine's)
- etc.

## Benefits

1. **Centralized Management**: All holiday content in one file
2. **Easy Updates**: Change holiday content without touching HTML/game logic
3. **Automatic Switching**: No manual intervention needed
4. **Consistent Theming**: All games use the same holiday theme
5. **Maintainable**: Easy to add new holidays or update existing ones
6. **Type-Safe**: Single source of truth for all holiday strings

## Notes

- The system automatically detects the current month and applies the appropriate theme
- All game logic remains unchanged - only display content is affected
- Storage keys are holiday-specific, so achievements are tracked per holiday
- The falling sprites will automatically use holiday-appropriate images
