import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { OnboardingFlow } from 'react-native-custom-onboarding';

const OnboardingExample = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const slides = [
    {
      id: 'welcome',
      media: {
        type: 'video' as const,
        source: require('./assets/welcome-video.mp4'),
        autoPlay: true,
        loop: true,
        muted: true,
      },
      title: 'Welcome to Our App',
      description: 'Experience the future of mobile apps',
      animation: 'scaleIn' as const,
    },
    {
      id: 'features',
      media: {
        type: 'image' as const,
        source: require('./assets/features.png'),
      },
      title: 'Powerful Features',
      description: 'Everything you need in one place',
      animation: 'fadeIn' as const,
    },
    {
      id: 'start',
      media: {
        type: 'image' as const,
        source: require('./assets/rocket.png'),
      },
      title: 'Ready to Begin?',
      description: 'Let\'s get started on your journey',
      animation: 'slideUp' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <Button
        title="Show Onboarding"
        onPress={() => setShowOnboarding(true)}
      />

      <OnboardingFlow
        slides={slides}
        visible={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
        closeable={false}
        showProgress={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingExample;