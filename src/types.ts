export interface OnboardingSlideData {
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