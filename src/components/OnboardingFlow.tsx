import React, { useState } from 'react';
import { OnboardingFlowProps } from '../types';
import OnboardingModal from './OnboardingModal';

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  slides,
  visible,
  onComplete,
  closeable = false,
  showProgress = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
      onComplete();
    }
  };

  const handleClose = () => {
    if (closeable) {
      setCurrentSlide(0);
      onComplete();
    }
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
    />
  );
};

export default OnboardingFlow;