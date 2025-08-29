
[![npm version](https://badge.fury.io/js/react-native-onboarding-flow.svg)](https://badge.fury.io/js/react-native-onboarding-flow)
[![npm downloads](https://img.shields.io/npm/dm/react-native-onboarding-flow.svg)](https://npmjs.org/package/react-native-onboarding-flow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Package Size](https://img.shields.io/bundlephobia/minzip/react-native-onboarding-flow)](https://bundlephobia.com/package/react-native-onboarding-flow)
[![React Native](https://img.shields.io/badge/React%20Native-0.60+-blue.svg)](https://reactnative.dev/)
[![Dependencies Status](https://img.shields.io/librariesio/github/binb1/react-native-onboarding-flow)](https://libraries.io/github/binb1/react-native-onboarding-flow)
[![Known Vulnerabilities](https://snyk.io/test/github/binb1/react-native-onboarding-flow/badge.svg)](https://snyk.io/test/github/binb1/react-native-onboarding-flow)

# React Native Onboarding Flow

Beautiful, customizable onboarding flows for **Expo React Native** apps with smooth animations and video support.

## Features ✨

- 🎭 **Modal-based** - Non-intrusive onboarding experience
- 🎨 **Beautiful animations** - Fade, slide, and scale effects
- 🎥 **Image & Video support** - Use images or MP4 videos
- 📱 **TypeScript first** - Full type safety
- 🎯 **Minimal dependencies** - Only expo-av for videos
- 📱 **Expo compatible** - Designed for Expo React Native projects
- 🎪 **Highly customizable** - Control every aspect
- 📊 **Progress indicators** - Visual progress dots
- 🔒 **Closeable control** - Prevent/allow closing
- 💰 **Paywall support** - Display custom paywall after onboarding

## Demo
https://github.com/user-attachments/assets/310fdcf8-bd8f-4a3b-bdde-a03c0ed7b8a6



## Requirements

- **Expo React Native** app (uses `expo-av` for video support)
- React Native >= 0.60.0
- Expo SDK >= 49.0.0

## Installation

Install the package along with its peer dependency:

```bash
npm install react-native-onboarding-flow expo-av
# or
yarn add react-native-onboarding-flow expo-av
```

**Why install `expo-av`?** It's a peer dependency needed for video playback. This prevents version conflicts and keeps your bundle size optimized.

## Basic Usage

```tsx
import React, { useState } from 'react';
import { OnboardingFlow } from 'react-native-onboarding-flow';

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const slides = [
    {
      id: 'welcome',
      media: {
        type: 'video',
        source: require('./assets/welcome-video.mp4'),
        autoPlay: true,
        loop: true,
        muted: true,
      },
      title: 'Welcome to Our App',
      description: 'Experience the future of mobile apps',
      animation: 'scaleIn',
    },
    {
      id: 'features',
      media: {
        type: 'image',
        source: require('./assets/features.png'),
        width: 300,
        height: 200,
        borderRadius: 20,
      },
      title: 'Powerful Features',
      description: 'Everything you need in one place',
      animation: 'fadeIn',
    },
  ];

  return (
    <OnboardingFlow
      slides={slides}
      visible={showOnboarding}
      onComplete={() => setShowOnboarding(false)}
      closeable={false}
      showProgress={true}
    />
  );
};
```

## Paywall Integration

Display a custom paywall component after the onboarding completes:

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { OnboardingFlow } from 'react-native-onboarding-flow';

const MyPaywall = ({ onComplete }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
      Unlock Premium Features
    </Text>
    <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 30 }}>
      Get access to all features with our premium subscription
    </Text>
    <TouchableOpacity
      style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 25 }}
      onPress={onComplete} // This will close the onboarding flow
    >
      <Text style={{ color: 'white', fontSize: 16 }}>Start Free Trial</Text>
    </TouchableOpacity>
  </View>
);

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <OnboardingFlow
      slides={slides}
      visible={showOnboarding}
      onComplete={() => setShowOnboarding(false)}
      showPaywall={true}
      paywallComponent={<MyPaywall />}
    />
  );
};
```

## Custom Theme

```tsx
const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Custom theme colors
  const theme = {
    backgroundColor: '#1a1a1a',
    titleColor: '#ffffff',
    descriptionColor: '#cccccc',
    buttonBackgroundColor: '#007AFF',
    buttonTextColor: '#ffffff',
    progressDotColor: '#333333',
    progressDotActiveColor: '#007AFF',
    closeButtonColor: '#cccccc',
  };

  return (
    <OnboardingFlow
      slides={slides}
      visible={showOnboarding}
      onComplete={() => setShowOnboarding(false)}
      theme={theme}
    />
  );
};
```

## API Reference

### OnboardingFlow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `OnboardingSlideData[]` | **required** | Array of slide data |
| `visible` | `boolean` | **required** | Controls modal visibility |
| `onComplete` | `() => void` | **required** | Called when onboarding completes |
| `closeable` | `boolean` | `false` | Allow users to close before completion |
| `showProgress` | `boolean` | `true` | Show progress dots |
| `theme` | `OnboardingTheme` | `undefined` | Custom colors |
| `showPaywall` | `boolean` | `false` | Show paywall after last slide |
| `paywallComponent` | `React.ReactNode` | `undefined` | Custom paywall component |

### Slide Data Structure

```tsx
interface OnboardingSlideData {
  id: string;
  media: {
    type: 'image' | 'video';
    source: any; // require() asset
    autoPlay?: boolean; // For videos (default: true)
    loop?: boolean; // For videos (default: true)  
    muted?: boolean; // For videos (default: true)
    width?: number; // Custom width in pixels
    height?: number; // Custom height in pixels
    borderRadius?: number; // Custom border radius in pixels
  };
  title: string;
  description: string;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn';
}
```

### Media Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `'image' \| 'video'` | **required** | Media type |
| `source` | `any` | **required** | Asset source (require()) |
| `autoPlay` | `boolean` | `true` | Auto-play videos when slide becomes active |
| `loop` | `boolean` | `true` | Loop videos continuously |
| `muted` | `boolean` | `true` | Start videos muted |
| `width` | `number` | `screenWidth * 0.6` | Custom width in pixels (default: 60% of screen width) |
| `height` | `number` | `screenWidth * 0.6` | Custom height in pixels (default: 60% of screen width) |
| `borderRadius` | `number` | `12` (videos), `undefined` (images) | Border radius in pixels |

### Theme Colors

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `backgroundColor` | `string` | `'white'` | Modal background color |
| `titleColor` | `string` | `'#2F4F2F'` | Title text color |
| `descriptionColor` | `string` | `'#666'` | Description text color |
| `buttonBackgroundColor` | `string` | `'#6B8E5A'` | Next button background |
| `buttonTextColor` | `string` | `'white'` | Next button text color |
| `progressDotColor` | `string` | `'#E5E5E5'` | Inactive dot color |
| `progressDotActiveColor` | `string` | `'#6B8E5A'` | Active dot color |
| `closeButtonColor` | `string` | `'#666'` | Close button icon color |

## Animation Types

- **`fadeIn`** - Gentle fade in effect
- **`slideUp`** - Slide up from bottom
- **`scaleIn`** - Scale in with spring animation

## License

MIT © Binb1
