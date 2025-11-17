# Falling Sprites System

## Current Implementation

The falling sprites system now supports both **image sprites** and **emoji fallbacks** for maximum flexibility.

### How It Works

1. **Sprite Selection**: Each holiday has 2 sprite types defined in `resources.js`
2. **Image Check**: The system checks if a PNG image exists in the `sprites/` folder
3. **Fallback**: If no image exists, it displays an emoji instead
4. **Animation**: All sprites (images and emojis) animate the same way

### Available Image Sprites

Currently available in `sprites/` folder:
- ✅ `skull.png` - Halloween
- ✅ `pumpkin.png` - Halloween, Thanksgiving, Fall
- ✅ `turkey.png` - Thanksgiving

### Holiday Sprite Mappings

| Holiday | Sprite Types | Status |
|---------|-------------|--------|
| **Halloween** | skull 💀, pumpkin 🎃 | Both have images |
| **Thanksgiving** | pumpkin 🎃, turkey 🦃 | Both have images |
| **Christmas** | snowflake ❄️, ornament 🎄 | Emoji fallback |
| **New Year** | confetti 🎊, firework 🎆 | Emoji fallback |
| **Valentine's** | heart 💝, rose 🌹 | Emoji fallback |
| **St. Patrick's** | shamrock ☘️, coin 🪙 | Emoji fallback |
| **Easter** | egg 🥚, bunny 🐰 | Emoji fallback |
| **Spring** | flower 🌸, butterfly 🦋 | Emoji fallback |
| **Summer** | sun ☀️, beach-ball 🏖️ | Emoji fallback |
| **Independence** | star ⭐, flag 🇺🇸 | Emoji fallback |
| **Fall** | leaf 🍂, pumpkin 🎃 | Pumpkin has image |

### Adding New Sprite Images

To add a new sprite image:

1. Create a PNG file (transparent background recommended)
2. Name it according to the sprite type (e.g., `snowflake.png`, `heart.png`)
3. Place it in the `sprites/` folder
4. Add the sprite name to `getAvailableSpriteImages()` in `resources.js`:

```javascript
getAvailableSpriteImages() {
    return ['skull', 'pumpkin', 'turkey', 'snowflake', 'heart']; // Add new ones here
}
```

The system will automatically use the image instead of the emoji!

### Sprite Configuration

In `falling-sprites.js`, you can adjust:
- `spriteSize` - Size in pixels (default: 100)
- `spawnRate` - Milliseconds between spawns (default: 1000)
- `gravity` - How fast sprites fall (default: 0.1)
- `maxSprites` - Maximum sprites on screen (default: 20)

### Testing Different Holidays

Since sprites are tied to holidays, change the month in `resources.js` to test:

```javascript
determineHoliday() {
    return 'christmas'; // Force a specific holiday for testing
    
    // Normal mode:
    // switch(this.currentMonth) { ... }
}
```

### Emoji Benefits

Using emoji fallbacks means:
- ✅ No need to create images for every holiday
- ✅ Instant visual variety
- ✅ Scales with the sprite system
- ✅ Easy to change via `getSpriteDisplay()` method
- ✅ Works on all devices

### Future Enhancements

Ideas for expansion:
- Add more PNG sprites for popular holidays
- Animate emojis (rotate, pulse, etc.)
- Different sprite sizes per type
- Special effects for certain holidays
- Seasonal color tinting
