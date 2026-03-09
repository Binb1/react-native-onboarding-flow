import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('expo-av', () => ({
  Video: 'MockVideo',
  ResizeMode: { CONTAIN: 'contain' },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

import OnboardingFlow from '../components/OnboardingFlow';

const slides = [
  {
    id: '1',
    media: { type: 'image' as const, source: 1 },
    title: 'Slide 1',
    description: 'First slide',
  },
  {
    id: '2',
    media: { type: 'image' as const, source: 2 },
    title: 'Slide 2',
    description: 'Second slide',
  },
];

function findButtonWithText(root: renderer.ReactTestInstance, text: string) {
  const buttons = root.findAllByType('TouchableOpacity' as any);
  return buttons.find((btn) => {
    const textNodes = btn.findAllByType('Text' as any);
    return textNodes.some((t) => {
      return t.children?.some((child: any) => typeof child === 'string' && child.includes(text));
    });
  });
}

describe('OnboardingFlow', () => {
  it('renders without crashing when visible', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(
        <OnboardingFlow slides={slides} visible={true} onComplete={jest.fn()} />
      );
    });

    const json = JSON.stringify(component!.toJSON());
    expect(json).toContain('Slide 1');
    expect(json).toContain('First slide');
  });

  it('returns null when slides array is empty', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(
        <OnboardingFlow slides={[]} visible={true} onComplete={jest.fn()} />
      );
    });

    expect(component!.toJSON()).toBeNull();
  });

  it('advances to next slide on Next press', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(
        <OnboardingFlow slides={slides} visible={true} onComplete={jest.fn()} />
      );
    });

    const nextButton = findButtonWithText(component!.root, 'Next');
    expect(nextButton).toBeDefined();

    act(() => {
      nextButton!.props.onPress();
    });

    const json = JSON.stringify(component!.toJSON());
    expect(json).toContain('Slide 2');
  });

  it('calls onComplete on last slide', () => {
    const onComplete = jest.fn();
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(
        <OnboardingFlow slides={slides} visible={true} onComplete={onComplete} />
      );
    });

    // Press Next to go to slide 2
    const nextButton = findButtonWithText(component!.root, 'Next');
    act(() => {
      nextButton!.props.onPress();
    });

    // Press Get Started
    const getStartedButton = findButtonWithText(component!.root, 'Get Started');
    act(() => {
      getStartedButton!.props.onPress();
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
