# Test Deep Links

## After rebuilding the app:

```bash
# Rebuild Android app
cd android && ./gradlew clean && cd ..
npm run android
```

## Test in Chrome (Android)

1. Open Chrome browser on your Android device/emulator
2. Type in address bar: `myshop://product/1`
3. Press Enter
4. Chrome will prompt "Open with ShopCart" - tap it
5. App opens to product ID 1

## Alternative: Use ADB

```bash
# Test deep link via ADB
adb shell am start -W -a android.intent.action.VIEW -d "myshop://product/1" com.shopcart

# Test different products
adb shell am start -W -a android.intent.action.VIEW -d "myshop://product/5" com.shopcart
adb shell am start -W -a android.intent.action.VIEW -d "myshop://cart" com.shopcart
adb shell am start -W -a android.intent.action.VIEW -d "myshop://favorites" com.shopcart
```

## Test HTTPS links (if domain configured)

```bash
adb shell am start -W -a android.intent.action.VIEW -d "https://myshop.com/product/1" com.shopcart
```

## Troubleshooting

If deep links don't work:
1. Make sure app is installed
2. Rebuild after manifest changes: `npm run android`
3. Clear Chrome cache
4. Try ADB command instead of Chrome
5. Check logcat: `adb logcat | grep -i "myshop"`

## iOS Testing

```bash
# iOS Simulator
xcrun simctl openurl booted "myshop://product/1"

# iOS Device - send link via Messages/Notes and tap it
```
