# Deep Linking Guide

Deep linking is already configured! You can open specific products directly.

## URL Format

```
myshop://product/{id}
```

## Test Deep Links

### iOS Simulator
```bash
xcrun simctl openurl booted "myshop://product/1"
xcrun simctl openurl booted "myshop://product/5"
xcrun simctl openurl booted "myshop://cart"
xcrun simctl openurl booted "myshop://favorites"
```

### Android Emulator
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myshop://product/1"
adb shell am start -W -a android.intent.action.VIEW -d "myshop://product/5"
adb shell am start -W -a android.intent.action.VIEW -d "myshop://cart"
adb shell am start -W -a android.intent.action.VIEW -d "myshop://favorites"
```

### Real Device (iOS)
1. Send yourself a message with the link: `myshop://product/1`
2. Tap the link in Messages/Notes/Safari
3. App will open to that product

### Real Device (Android)
1. Open Chrome browser
2. Type in address bar: `myshop://product/1`
3. Tap Go
4. App will open to that product

## Available Routes

- `myshop://products` - Product list
- `myshop://product/1` - Product with ID 1
- `myshop://product/5` - Product with ID 5
- `myshop://cart` - Shopping cart
- `myshop://favorites` - Favorites list

## Example: Share Product Link

You can share product links via:
- SMS/iMessage
- Email
- Social media
- QR codes
- Push notifications

The app will automatically navigate to the correct product when the link is opened!
