# PrepMateAI

A mobile-first AI education app built with Expo + NativeWind + Appwrite.

## Tech Stack

- **Expo SDK 54** - Latest Expo framework
- **Expo Router** - File-based routing
- **NativeWind** - Tailwind CSS for React Native
- **Appwrite** - Backend as a Service
- **React Native Reanimated** - Animations
- **Expo Image Picker** - Image selection
- **React Native Compressor** - Media compression

## Project Structure

```
/app          — All screens (file-based routing)
/components   — Reusable UI components
/services     — Appwrite + API calls
/hooks        — Custom logic hooks
/utils        — Helper functions
/config       — Environment + constants
/assets       — Images, fonts, icons
```

## Setup for Developers

1. **Install dependencies:**
```bash
npm install
```

2. **Configure Appwrite:**
   - Replace `<PROJECT_ID>` in `services/appwrite.js` with your Appwrite project ID

3. **Start the app:**
```bash
expo start
```
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web
   - Scan QR code with Expo Go app

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS (macOS only)
- `npm run web` - Run on web

## Backend Repository

Backend API: [prepmateai-backend](https://github.com/<yourname>/prepmateai-backend)
