module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@expo|expo-av|@testing-library)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '__mocks__', 'setup\\.ts$'],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/src/__tests__/__mocks__/react-native.js',
  },
  setupFiles: ['<rootDir>/src/__tests__/setup.ts'],
};
