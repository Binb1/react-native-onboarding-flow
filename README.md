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
        width: 300,
        height: 200,
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
| `width` | `number` | `screenWidth * 0.6` | Custom width in pixels (default: 60% of screen width) |
| `height` | `number` | `screenWidth * 0.6` | Custom height in pixels (default: 60% of screen width) |

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