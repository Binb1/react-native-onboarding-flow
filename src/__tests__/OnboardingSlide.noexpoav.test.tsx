/**
 * Tests that OnboardingSlide works for image slides when expo-av is NOT installed.
 * This is the key test for the lazy import pattern.
 */
import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('expo-av', () => {
  throw new Error("Cannot find module 'expo-av'");
});

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
  media: { type: 'video' as const, source: 1 },
  title: 'Watch this',
  description: 'A video slide',
};

describe('OnboardingSlide without expo-av', () => {
  it('module imports without error (no top-level require)', () => {
    expect(OnboardingSlide).toBeDefined();
  });

  it('renders image slide without expo-av installed', () => {
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

  it('throws when trying to render a video slide without expo-av', () => {
    expect(() => {
      act(() => {
        renderer.create(
          <OnboardingSlide slide={videoSlide} isActive={false} />
        );
      });
    }).toThrow();
  });
});
