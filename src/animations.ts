import { Animated, Easing } from 'react-native';

export const createFadeInAnimation = (animatedValue: Animated.Value, duration = 500, delay = 0) => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    delay,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
  });
};

export const createSlideUpAnimation = (animatedValue: Animated.Value, duration = 600, delay = 0) => {
  return Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    delay,
    easing: Easing.out(Easing.back(1.2)),
    useNativeDriver: true,
  });
};

export const createScaleInAnimation = (animatedValue: Animated.Value, duration = 400, delay = 0) => {
  return Animated.spring(animatedValue, {
    toValue: 1,
    delay,
    tension: 100,
    friction: 8,
    useNativeDriver: true,
  });
};

export const createSlideTransition = (
  fadeOut: Animated.Value,
  fadeIn: Animated.Value,
  duration = 300
) => {
  return Animated.sequence([
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: duration / 2,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }),
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: duration / 2,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }),
  ]);
};