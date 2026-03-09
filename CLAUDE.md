# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A published React Native library (`react-native-onboarding-flow` on npm) providing modal-based onboarding flows with animations. Supports image and video slides, theming, and optional paywall integration.

## Commands

```bash
npm test              # Run all 10 tests (Jest)
npm run build         # Compile TypeScript src/ → lib/
npx jest --testPathPattern="OnboardingSlide" # Run a single test file
```

## Architecture

Three-layer component hierarchy, each with a distinct responsibility:

- **OnboardingFlow** → State management (current slide index, paywall toggle). Top-level public API.
- **OnboardingModal** → Layout and UI (Modal, header, progress dots, footer buttons). No animations.
- **OnboardingSlide** → Media rendering and animation orchestration. Lazy-loads `expo-av` only when a video slide is rendered.

Types are in `src/types.ts`. Animation factories (`createFadeInAnimation`, `createSlideUpAnimation`, `createScaleInAnimation`, `createSlideTransition`) are in `src/animations.ts`.

## Lazy expo-av Pattern

`expo-av` is an optional peer dependency. `OnboardingSlide.tsx` uses a lazy `require('expo-av')` inside `getExpoAV()`, called only in the video branch of `renderMedia()`. This means the library works for image-only onboarding without expo-av installed. The `OnboardingSlide.noexpoav.test.tsx` test file specifically guards this behavior.

## Testing

- Jest + `react-test-renderer` (not `@testing-library/react-native`)
- Custom react-native mock at `src/__tests__/__mocks__/react-native.js` (includes Animated, Easing, StyleSheet.flatten)
- `expo-av` and `@expo/vector-icons` are mocked via `jest.mock()` at file level
- React 19 requires wrapping `renderer.create()` in `act()` — setup file sets `IS_REACT_ACT_ENVIRONMENT = true`
- Two separate test files for OnboardingSlide: one with expo-av mocked as available, one with expo-av mocked as missing

## Publishing

- `lib/` is gitignored — built at publish time via `npm run build`
- `"files"` in package.json includes `lib/`, `src/`, `README.md`
- `.npmrc` has `legacy-peer-deps=true` for dependency resolution
- `tsconfig.json` excludes `src/__tests__/` from compilation so test files don't appear in `lib/`
