import '@testing-library/jest-native/extend-expect';

// Mock Reanimated
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Mock Gesture Handler
jest.mock('react-native-gesture-handler', () => ({
  TouchableOpacity: jest.fn().mockImplementation(({ children }) => children),
  State: {},
  Directions: {},
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

// Mock react-native-localize
jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: jest.fn(() => ({ languageTag: 'en', isRTL: false })),
  getLocales: jest.fn(() => [{ countryCode: 'US', languageTag: 'en-US', isRTL: false }]),
  getNumberFormatSettings: jest.fn(() => ({ decimalSeparator: '.', groupingSeparator: ',' })),
  getCalendar: jest.fn(() => 'gregorian'),
  getCountry: jest.fn(() => 'US'),
  getCurrencies: jest.fn(() => ['USD']),
  uses24HourClock: jest.fn(() => true),
  usesMetricSystem: jest.fn(() => true),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock LayoutAnimation
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  configureNext: jest.fn(),
  create: jest.fn(),
  Types: {},
  Properties: {},
}));

// Silence warnings
jest.spyOn(global.console, 'warn').mockImplementation(() => {});
jest.spyOn(global.console, 'error').mockImplementation(() => {});
