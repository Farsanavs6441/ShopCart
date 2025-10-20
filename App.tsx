import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import { store, persistor } from './src/store/store';
import StackNavigator from './src/navigation/StackNavigator';
import { ThemeProvider } from './src/theme/theme';
import i18n from './src/i18n/index';

const App = () => {
  const linking = {
    prefixes: ['myshop://', 'https://myshop.com'],
    config: {
      screens: {
        Products: 'products',
        ProductDetails: 'product/:id',
        Cart: 'cart',
        Favorites: 'favorites',
      },
    },
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <NavigationContainer linking={linking}>
              <StackNavigator />
            </NavigationContainer>
          </ThemeProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
