# Deploy API for Different WiFi Networks

## Option 1: Use Public API (Easiest)

Switch to DummyJSON public API - no setup needed:

```typescript
// src/api/products.ts
const API_URL = 'https://dummyjson.com';
```

## Option 2: Deploy to Render (Free)

1. Create `server.js`:
```javascript
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
```

2. Add to package.json scripts:
```json
"server": "node server.js"
```

3. Deploy to Render.com:
   - Push code to GitHub
   - Connect to Render
   - Deploy as Web Service
   - Get public URL: `https://your-app.onrender.com`

## Option 3: ngrok (Quick Testing)

1. Install ngrok: `brew install ngrok`

2. Start JSON server locally:
```bash
json-server --watch db.json --port 3000
```

3. Expose with ngrok:
```bash
ngrok http 3000
```

4. Use the ngrok URL (e.g., `https://abc123.ngrok.io`)

## Option 4: AWS/Heroku/Railway

Deploy JSON server to any cloud platform and use the public URL.

## Update API URL

```typescript
// src/api/products.ts
const API_URL = 'https://your-deployed-api.com';
```
