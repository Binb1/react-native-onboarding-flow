export interface OnboardingSlideData {
  id: string;
  // New media object - supports both images and videos
  media?: {
    type: 'image' | 'video';
    source: any; // require() asset
    autoPlay?: boolean; // For videos
    loop?: boolean; // For videos
    muted?: boolean; // For videos
  };
  // Legacy support - will be deprecated
  image?: any; // require() asset - DEPRECATED, use media instead
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