import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OnboardingModalProps } from '../types';
import OnboardingSlide from './OnboardingSlide';

const { width } = Dimensions.get('window');

const OnboardingModal: React.FC<OnboardingModalProps> = ({
  visible,
  slides,
  currentSlide,
  onNext,
  onClose,
  closeable,
  showProgress,
}) => {
  const isValidSlide = currentSlide >= 0 && currentSlide < slides.length;
  const isLastSlide = isValidSlide && currentSlide === slides.length - 1;
  const currentSlideData = isValidSlide ? slides[currentSlide] : null;

  const renderProgressDots = () => {
    if (!showProgress) return null;

    return (
      <View style={styles.progressContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              {
                backgroundColor: index <= currentSlide ? '#6B8E5A' : '#E5E5E5',
                width: index === currentSlide ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={closeable ? onClose : undefined}
    >
      <SafeAreaView style={styles.container}>
        {/* Header with optional close button */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          {closeable && onClose && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        {/* Progress dots */}
        {renderProgressDots()}

        {/* Slide content */}
        <View style={styles.slideContainer}>
          {currentSlideData && currentSlideData.media && (
            <OnboardingSlide
              slide={currentSlideData}
              isActive={true}
            />
          )}
          {!currentSlideData && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Unable to load slide</Text>
            </View>
          )}
        </View>

        {/* Footer with next button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              isLastSlide && styles.completeButton,
            ]}
            onPress={onNext}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.nextButtonText,
              isLastSlide && styles.completeButtonText,
            ]}>
              {isLastSlide ? 'Get Started' : 'Next'}
            </Text>
            {!isLastSlide && (
              <Ionicons 
                name="arrow-forward" 
                size={20} 
                color="white" 
                style={styles.nextIcon}
              />
            )}
          </TouchableOpacity>

          {!isLastSlide && (
            <Text style={styles.slideCounter}>
              {currentSlide + 1} of {slides.length}
            </Text>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
  },
  headerSpacer: {
    width: 32,
  },
  closeButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
  },
  slideContainer: {
    flex: 1,
    paddingHorizontal: 0,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    alignItems: 'center',
    gap: 16,
  },
  nextButton: {
    backgroundColor: '#6B8E5A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    minWidth: width * 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completeButton: {
    backgroundColor: '#2F4F2F',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  completeButtonText: {
    color: 'white',
  },
  nextIcon: {
    marginLeft: 8,
  },
  slideCounter: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default OnboardingModal;