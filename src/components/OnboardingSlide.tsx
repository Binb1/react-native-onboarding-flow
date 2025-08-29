import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { OnboardingSlideProps } from '../types';
import { createFadeInAnimation, createSlideUpAnimation, createScaleInAnimation } from '../animations';

const { width, height } = Dimensions.get('window');

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({ slide, isActive, theme }) => {
  const mediaOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const descriptionTranslateY = useRef(new Animated.Value(30)).current;
  const mediaScale = useRef(new Animated.Value(0.8)).current;
  
  const mediaData = slide.media;

  useEffect(() => {
    if (isActive) {
      mediaOpacity.setValue(0);
      titleOpacity.setValue(0);
      descriptionOpacity.setValue(0);
      titleTranslateY.setValue(30);
      descriptionTranslateY.setValue(30);
      mediaScale.setValue(0.8);

      const animations = [];
      const animationType = slide.animation || 'fadeIn';

      if (animationType === 'scaleIn') {
        animations.push(createScaleInAnimation(mediaScale, 600, 200));
        animations.push(createFadeInAnimation(mediaOpacity, 400, 200));
      } else {
        animations.push(createFadeInAnimation(mediaOpacity, 500, 200));
        animations.push(createScaleInAnimation(mediaScale, 400, 200));
      }

      animations.push(createFadeInAnimation(titleOpacity, 400, 600));
      animations.push(createSlideUpAnimation(titleTranslateY, 400, 600));
      animations.push(createFadeInAnimation(descriptionOpacity, 400, 800));
      animations.push(createSlideUpAnimation(descriptionTranslateY, 400, 800));

      Animated.parallel(animations).start();
    }
  }, [isActive]);

  const renderMedia = () => {
    const mediaStyle = [
      styles.media,
      {
        width: mediaData.width || width * 0.6,
        height: mediaData.height || width * 0.6,
        opacity: mediaOpacity,
        transform: [{ scale: mediaScale }],
        borderRadius: mediaData.borderRadius,
        overflow: 'hidden',
      },
    ];

    if (mediaData.type === 'video') {
      const videoStyle = [
        styles.video,
        {
          borderRadius: mediaData.borderRadius || 12,
        },
      ];

      return (
        <Animated.View style={mediaStyle}>
          <Video
            source={mediaData.source}
            style={videoStyle}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={isActive && (mediaData.autoPlay !== false)}
            isLooping={mediaData.loop !== false}
            isMuted={mediaData.muted !== false}
            onError={(error: any) => console.log('Video load error:', error)}
          />
        </Animated.View>
      );
    }

    return (
      <Animated.Image
        source={mediaData.source}
        style={mediaStyle}
        resizeMode="contain"
        onError={(error: any) => console.log('Image load error:', error)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {renderMedia()}
      </View>

      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.title,
            { color: theme?.titleColor || '#2F4F2F' },
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          {slide.title}
        </Animated.Text>

        <Animated.Text
          style={[
            styles.description,
            { color: theme?.descriptionColor || '#666' },
            {
              opacity: descriptionOpacity,
              transform: [{ translateY: descriptionTranslateY }],
            },
          ]}
        >
          {slide.description}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: height * 0.4,
  },
  media: {
    // Size is now controlled by mediaStyle in renderMedia()
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});

export default OnboardingSlide;