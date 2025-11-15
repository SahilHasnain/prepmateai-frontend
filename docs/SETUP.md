# Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app (for mobile testing)

## Installation Steps

### 1. Install Dependencies

All dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Appwrite

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io)
2. Create a new project
3. Copy your Project ID
4. Update the following files:
   - `services/appwrite.js` - Replace `<PROJECT_ID>` with your actual project ID
   - `config/appwrite.js` - Replace `<PROJECT_ID>` with your actual project ID

### 3. Environment Variables (Optional)

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then update with your actual values.

### 4. Start Development Server

```bash
npm start
```

This will open Expo Dev Tools. You can then:

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator (macOS only)
- Press `w` to open in web browser
- Scan QR code with Expo Go app on your phone

## Project Structure

```
prepmateai/
├── app/                    # Expo Router pages (file-based routing)
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Home screen
├── components/            # Reusable UI components
│   └── Button.tsx         # Sample button component
├── services/              # API services
│   └── appwrite.js        # Appwrite authentication service
├── hooks/                 # Custom React hooks
│   └── useAuth.js         # Authentication hook
├── utils/                 # Utility functions
│   └── validation.js      # Validation helpers
├── config/                # Configuration files
│   └── appwrite.js        # Appwrite config
├── assets/                # Images, fonts, etc.
├── global.css             # Global Tailwind CSS
├── tailwind.config.js     # Tailwind configuration
├── metro.config.js        # Metro bundler config (NativeWind)
└── babel.config.js        # Babel configuration
```

## Key Technologies

### Expo Router

- File-based routing system
- Create new routes by adding files to the `app/` directory
- Example: `app/profile.tsx` becomes `/profile` route

### NativeWind (Tailwind CSS)

- Use Tailwind utility classes with `className` prop
- Example: `<View className="flex-1 bg-blue-500" />`
- Supports dark mode, responsive design, and custom themes

### Appwrite

- Backend as a Service (BaaS)
- Provides authentication, database, storage, and more
- Pre-configured authentication functions in `services/appwrite.js`

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (macOS only)
- `npm run web` - Run in web browser

## Troubleshooting

### Metro bundler issues

```bash
npm start -- --clear
```

### Dependency issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

The project supports both JavaScript and TypeScript. TypeScript files will be type-checked automatically.

## Next Steps

1. Configure your Appwrite project
2. Create authentication screens in `app/`
3. Build your UI components in `components/`
4. Add custom hooks in `hooks/`
5. Implement business logic in `utils/`

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev)
- [Appwrite Documentation](https://appwrite.io/docs)
- [React Native Documentation](https://reactnative.dev)
