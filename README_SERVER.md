# JSON Server Setup

## Start the API Server

Run this command in a separate terminal:

```bash
./start-server.sh
```

Or manually:

```bash
json-server --watch db.json --port 3000 --host 0.0.0.0
```

The API will be available at:
- https://delmer-superadorn-luba.ngrok-free.dev/products
- https://delmer-superadorn-luba.ngrok-free.dev/products/:id

## For Android Emulator

If using Android emulator, use `http://10.0.2.2:3000` instead of `https://delmer-superadorn-luba.ngrok-free.dev`

Update `src/api/products.ts`:
```typescript
const API_URL = 'http://10.0.2.2:3000';
```

## For iOS Simulator

iOS simulator can use `https://delmer-superadorn-luba.ngrok-free.dev` directly.

## For Physical Device

Find your computer's IP address and use:
```typescript
const API_URL = 'http://YOUR_IP:3000';
```
