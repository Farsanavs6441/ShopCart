# RTL (Right-to-Left) Support Guide

## How RTL Works in ShopCart

The app uses `I18nManager` from React Native to handle RTL layout for Arabic language.

## Important Notes

⚠️ **RTL requires app restart** - When you change language from English to Arabic (or vice versa), you must restart the app for RTL layout to take effect.

## Testing RTL

### Method 1: Change Device Language (Recommended)

**iOS:**
1. Settings → General → Language & Region
2. Add Arabic
3. Restart the app
4. App will automatically detect Arabic and enable RTL

**Android:**
1. Settings → System → Languages
2. Add Arabic
3. Restart the app
4. App will automatically detect Arabic and enable RTL

### Method 2: In-App Language Toggle

1. Tap the language button (عر/EN) in the product list header
2. **Close the app completely** (swipe away from recent apps)
3. Reopen the app
4. RTL layout will now be active

## What Changes in RTL Mode

✅ Text alignment (right-aligned)
✅ Layout direction (mirrored)
✅ Navigation flow (right to left)
✅ Icons and buttons (mirrored positions)
✅ Currency position (after amount: "199.99 د.إ")

## Current Behavior

- **English**: Left-to-right layout, $ before amount
- **Arabic**: Right-to-left layout, د.إ after amount
- Language toggle button shows current opposite language (عر when in EN, EN when in عر)

## Known Limitation

React Native's `I18nManager.forceRTL()` only takes effect after app restart. This is a React Native limitation, not a bug in the app.

## For Development

To test RTL without changing device language:

1. Modify `src/i18n/index.ts`:
```typescript
const languageTag = 'ar'; // Force Arabic
```

2. Rebuild the app:
```bash
npm run android  # or npm run ios
```

3. App will start in RTL mode
