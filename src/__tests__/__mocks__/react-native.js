const React = require('react');

const createMockComponent = (name) => {
  const component = (props) => React.createElement(name, props, props.children);
  component.displayName = name;
  return component;
};

const AnimatedValue = function (val) {
  this._value = val;
  this.setValue = (v) => { this._value = v; };
};

const mockAnimation = { start: (cb) => cb && cb() };

const easingFn = (v) => v;
easingFn.out = () => easingFn;
easingFn.in = () => easingFn;
easingFn.back = () => easingFn;

const Easing = {
  out: (fn) => easingFn,
  in: (fn) => easingFn,
  quad: easingFn,
  back: () => easingFn,
};

const Animated = {
  Value: AnimatedValue,
  View: createMockComponent('Animated.View'),
  Text: createMockComponent('Animated.Text'),
  Image: createMockComponent('Animated.Image'),
  parallel: () => mockAnimation,
  sequence: () => mockAnimation,
  timing: () => mockAnimation,
  spring: () => mockAnimation,
  createAnimatedComponent: (component) => component,
};

module.exports = {
  View: createMockComponent('View'),
  Text: createMockComponent('Text'),
  Image: createMockComponent('Image'),
  ScrollView: createMockComponent('ScrollView'),
  TouchableOpacity: createMockComponent('TouchableOpacity'),
  Modal: createMockComponent('Modal'),
  SafeAreaView: createMockComponent('SafeAreaView'),
  StyleSheet: {
    create: (styles) => styles,
    flatten: (style) => {
      if (Array.isArray(style)) {
        return Object.assign({}, ...style.flat().filter(Boolean));
      }
      return style || {};
    },
  },
  Dimensions: {
    get: () => ({ width: 375, height: 812 }),
  },
  Animated,
  Easing,
};
