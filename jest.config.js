module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js','@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated)/)',
    'node_modules/(?!(react-native|@react-native|@reduxjs|immer)/)',
    //  'node_modules/(?!(react-native|react-redux|@react-navigation)/)',
  ],
};
