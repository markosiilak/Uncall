# FriendCall 🛡️

FriendCall is a premium, privacy-focused mobile application built with Expo (React Native) designed to protect users from scam and spam calls by filtering incoming calls against the device's contacts and a custom whitelist.

## ✨ Key Features

- **Intelligent Call Filtering**: Automatically screens incoming calls.
- **Premium Aesthetics**: Stunning dark-mode UI with "glassmorphism" effects and a vibrant neon blue theme.
- **Privacy First**: All call screening logic happens locally. Featuring "Blur-to-Reveal" technology for recent call history.
- **Bilingual Support**: Fully localized in **English** and **Estonian** with a built-in language switcher.
- **Functional Whitelist**: Manage a custom list of allowed numbers with persistent storage.
- **Modular Architecture**: Clean, scalable codebase refactored into reusable components and hooks.

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- Expo Go app on your mobile device (for testing)

### Installation & Launch

To set up the project and start with a clean cache, simply run:

```bash
chmod +x dev.sh
./dev.sh
```

Or using npm:

```bash
npm run dev
```

## 🛠️ Tech Stack

- **Framework**: Expo (React Native SDK 51)
- **Styling**: Vanilla StyleSheet with `expo-blur` and `expo-linear-gradient`
- **Animations**: `react-native-reanimated`
- **Icons**: `lucide-react-native`
- **Internationalization**: `i18n-js` & `expo-localization`
- **Persistence**: `@react-native-async-storage/async-storage`

## 📁 Project Structure

- `src/components/`: Modular UI components (Shield, SettingsModal, etc.)
- `src/ui/`: Primitive UI elements (StatCard, etc.)
- `src/hooks/`: Custom React hooks (useContacts, etc.)
- `src/constants/`: App constants and i18n configuration
- `assets/`: App icons and splash screens (updated with the blue theme)

## 📱 Platform Support

- **Android**: Full native support via `CallScreeningService` integration.
- **iOS**: UI provides guidance for native "Silence Unknown Callers" feature.
- **Web**: Fully responsive preview available in the browser.

---
Created to keep scammers away and your phone silent from spam. 🚫📞
