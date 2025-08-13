# React Native Custom Onboarding 🚀

Beautiful, customizable onboarding flows for React Native with smooth animations.

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
npm install react-native-custom-onboarding
# or
yarn add react-native-custom-onboarding
```

## Usage

```tsx
import React, { useState } from 'react';
import { OnboardingFlow } from 'react-native-custom-onboarding';

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const slides = [
    {
      id: 'welcome',
      media: {
        type: 'image',
        source: require('./assets/welcome.png'),
      },
      title: 'Welcome to MyApp',
      description: 'Discover amazing features',
      animation: 'fadeIn',
    },
    {
      id: 'demo',
      media: {
        type: 'video',
        source: require('./assets/demo.mp4'),
        autoPlay: true,
        loop: true,
        muted: false,
      },
      title: 'See It In Action',
      description: 'Watch how easy it is to use',
      animation: 'scaleIn',
    },
    {
      id: 'features',
      image: require('./assets/features.png'), // Legacy format still supported
      title: 'Powerful Features',
      description: 'Everything you need in one place',
      animation: 'slideUp',
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
  // New media object - supports both images and videos
  media?: {
    type: 'image' | 'video';
    source: any; // require() asset
    autoPlay?: boolean; // For videos (default: true)
    loop?: boolean; // For videos (default: true)
    muted?: boolean; // For videos (default: true)
  };
  // Legacy support - will be deprecated
  image?: any; // require() asset - DEPRECATED, use media instead
  title: string;
  description: string;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn';
}
```

### Video Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoPlay` | `boolean` | `true` | Auto-play videos when slide becomes active |
| `loop` | `boolean` | `true` | Loop videos continuously |
| `muted` | `boolean` | `true` | Start videos muted |

## Animation Types

- **`fadeIn`** - Gentle fade in effect
- **`slideUp`** - Slide up from bottom
- **`scaleIn`** - Scale in with spring animation

## License

MIT © [Your Name]