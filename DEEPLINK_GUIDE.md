# Deep Linking Guide

## Setup Complete ✅

Deep linking has been configured for the ShopCart app with the URL scheme: `myshop://`

## Supported Deep Links

### Product Details
- **Format**: `myshop://product/{productId}`
- **Example**: `myshop://product/p-1001`
- Opens the product details screen for the specified product

### Other Screens
- **Products List**: `myshop://products`
- **Cart**: `myshop://cart`
- **Favorites**: `myshop://favorites`

## Testing Deep Links

### iOS Simulator
```bash
xcrun simctl openurl booted "myshop://product/p-1001"
```

### Android Emulator
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myshop://product/p-1001" com.shopcart
```

### iOS Device (Safari)
Just type in Safari: `myshop://product/p-1001`

### Android Device
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myshop://product/p-1001" com.shopcart
```

## Configuration Files Modified

1. **App.tsx** - Added linking configuration to NavigationContainer
2. **ios/ShopCart/Info.plist** - Added CFBundleURLTypes for URL scheme
3. **android/app/src/main/AndroidManifest.xml** - Added intent-filter for deep links

## How It Works

When a user clicks a link like `myshop://product/p-1001`:
1. The OS opens the ShopCart app
2. React Navigation parses the URL
3. The app navigates to ProductDetails screen with id="p-1001"
4. The product details are fetched and displayed

## Notes

- Deep links work even when the app is closed
- The app will launch and navigate to the correct screen
- Make sure to rebuild the app after configuration changes
