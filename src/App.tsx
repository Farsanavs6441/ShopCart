import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { store, persistor } from './store/store';
import { ThemeProvider } from './theme/theme';
import AppNavigator from './navigation/AppNavigator';
import '../src/i18n';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate 
          loading={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
              <Text style={{ fontSize: 24, color: '#000' }}>ShopCart App</Text>
              <Text style={{ fontSize: 16, color: '#666', marginTop: 10 }}>Loading...</Text>
            </View>
          } 
          persistor={persistor}
        >
          <ThemeProvider>
            
            <AppNavigator />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
