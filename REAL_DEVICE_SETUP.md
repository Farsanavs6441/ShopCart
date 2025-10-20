# Access Data on Real Device

## Step 1: Find Your Computer's IP Address

**On macOS:**
```bash
ipconfig getifaddr en0
```
Or check System Preferences → Network

**Example output:** `192.168.1.100`

## Step 2: Start JSON Server on Network

```bash
json-server --watch db.json --port 3000 --host 0.0.0.0
```

The `--host 0.0.0.0` makes it accessible from other devices on your network.

## Step 3: Update API URL

Replace `localhost` with your computer's IP address in `src/api/products.ts`:

```typescript
const API_URL = 'http://192.168.1.100:3000'; // Use YOUR IP address
```

## Step 4: Run on Device

**iOS:**
```bash
npm run ios -- --device
```

**Android:**
- Connect device via USB with USB debugging enabled
- Ensure device is on same WiFi network as your computer
```bash
npm run android
```

## Important Notes

- Device and computer must be on the same WiFi network
- Some corporate/public WiFi networks block device-to-device communication
- Firewall may need to allow port 3000
- For production, use a real API server (not localhost)
