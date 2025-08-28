import React, { useState } from 'react';
import { OnboardingFlowProps } from '../types';
import OnboardingModal from './OnboardingModal';

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  slides,
  visible,
  onComplete,
  closeable = false,
  showProgress = true,
  theme,
  showPaywall = false,
  paywallComponent,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showingPaywall, setShowingPaywall] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Check if paywall should be shown
      if (showPaywall && paywallComponent) {
        setShowingPaywall(true);
      } else {
        setCurrentSlide(0);
        onComplete();
      }
    }
  };

  const handleClose = () => {
    if (closeable) {
      setCurrentSlide(0);
      setShowingPaywall(false);
      onComplete();
    }
  };

  const handlePaywallComplete = () => {
    setCurrentSlide(0);
    setShowingPaywall(false);
    onComplete();
  };

  // Don't render if no slides provided
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <OnboardingModal
      visible={visible}
      slides={slides}
      currentSlide={currentSlide}
      onNext={handleNext}
      onClose={closeable ? handleClose : undefined}
      closeable={closeable}
      showProgress={showProgress}
      theme={theme}
      showPaywall={showingPaywall}
      paywallComponent={paywallComponent ? React.cloneElement(paywallComponent as React.ReactElement<any>, { onComplete: handlePaywallComplete }) : undefined}
    />
  );
};

export default OnboardingFlow;