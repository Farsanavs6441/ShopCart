#!/bin/bash

# Get local IP address
IP=$(ipconfig getifaddr en0)

if [ -z "$IP" ]; then
  echo "❌ Could not detect IP address. Make sure you're connected to WiFi."
  exit 1
fi

echo "✅ Your IP address: $IP"
echo ""
echo "📝 Update src/api/products.ts with:"
echo "   const API_URL = 'http://$IP:3000';"
echo ""
echo "🚀 Start JSON server with:"
echo "   json-server --watch db.json --port 3000 --host 0.0.0.0"
