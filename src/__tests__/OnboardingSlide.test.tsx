import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('expo-av', () => ({
  Video: 'MockVideo',
  ResizeMode: { CONTAIN: 'contain' },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

import OnboardingSlide from '../components/OnboardingSlide';

const imageSlide = {
  id: '1',
  media: { type: 'image' as const, source: 1 },
  title: 'Welcome',
  description: 'Hello world',
};

const videoSlide = {
  id: '2',
  media: { type: 'video' as const, source: 1, autoPlay: true, loop: true, muted: true },
  title: 'Watch this',
  description: 'A video slide',
};

describe('OnboardingSlide', () => {
  it('renders image slide with title and description', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(
        <OnboardingSlide slide={imageSlide} isActive={false} />
      );
    });

    const json = JSON.stringify(component!.toJSON());
    expect(json).toContain('Welcome');
    expect(json).toContain('Hello world');
  });

  it('renders video slide using expo-av Video component', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(
        <OnboardingSlide slide={videoSlide} isActive={false} />
      );
    });

    const json = JSON.stringify(component!.toJSON());
    expect(json).toContain('Watch this');
    expect(json).toContain('A video slide');
    expect(json).toContain('MockVideo');
  });

  it('applies custom theme colors', () => {
    const theme = { titleColor: '#FF0000', descriptionColor: '#00FF00' };
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(
        <OnboardingSlide slide={imageSlide} isActive={false} theme={theme} />
      );
    });

    const root = component!.root;
    const animatedTexts = root.findAllByType('Animated.Text' as any);
    expect(animatedTexts.length).toBeGreaterThanOrEqual(2);

    const titleStyle = [].concat(...[animatedTexts[0].props.style].flat());
    const titleColors = titleStyle.filter((s: any) => s?.color);
    expect(titleColors.some((s: any) => s.color === '#FF0000')).toBe(true);

    const descStyle = [].concat(...[animatedTexts[1].props.style].flat());
    const descColors = descStyle.filter((s: any) => s?.color);
    expect(descColors.some((s: any) => s.color === '#00FF00')).toBe(true);
  });
});
