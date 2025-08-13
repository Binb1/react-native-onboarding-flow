# React Native Custom Onboarding 🚀

Beautiful, customizable onboarding flows for React Native with smooth animations and video support.

## Features ✨

- 🎭 **Modal-based** - Non-intrusive onboarding experience
- 🎨 **Beautiful animations** - Fade, slide, and scale effects
- 🎥 **Image & Video support** - Use images or MP4 videos
- 📱 **TypeScript first** - Full type safety
- 🎯 **Minimal dependencies** - Only expo-av for videos
- 🎪 **Highly customizable** - Control every aspect
- 📊 **Progress indicators** - Visual progress dots
- 🔒 **Closeable control** - Prevent/allow closing

## Installation

```bash
npm install react-native-custom-onboarding expo-av
# or
yarn add react-native-custom-onboarding expo-av
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { OnboardingFlow } from 'react-native-custom-onboarding';

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

## API Reference

### OnboardingFlow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slides` | `OnboardingSlideData[]` | **required** | Array of slide data |
| `visible` | `boolean` | **required** | Controls modal visibility |
| `onComplete` | `() => void` | **required** | Called when onboarding completes |
| `closeable` | `boolean` | `false` | Allow users to close before completion |
| `showProgress` | `boolean` | `true` | Show progress dots |

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

## Animation Types

- **`fadeIn`** - Gentle fade in effect
- **`slideUp`** - Slide up from bottom
- **`scaleIn`** - Scale in with spring animation

## License

MIT © [Your Name]