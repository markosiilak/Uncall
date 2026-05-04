#!/bin/bash

echo "🚀 Starting FriendCall development environment setup..."

# 1. Install dependencies
echo "📦 Checking and installing modules..."
npm install

# 2. Start with a clean cache
echo "🧹 Clearing cache and starting the app..."
npx expo start --clear --web
