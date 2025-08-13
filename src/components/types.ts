export interface OnboardingSlideData {
  id: string;
  image: any; // require() asset
  title: string;
  description: string;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn';
}

export interface OnboardingFlowProps {
  slides: OnboardingSlideData[];
  visible: boolean;
  onComplete: () => void;
  closeable?: boolean;
  showProgress?: boolean;
}

export interface OnboardingModalProps {
  visible: boolean;
  slides: OnboardingSlideData[];
  currentSlide: number;
  onNext: () => void;
  onClose?: () => void;
  closeable: boolean;
  showProgress: boolean;
}

export interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  isActive: boolean;
}