import React from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AuthWrapper from './AuthWrapper';
import './global.css';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthWrapper />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}
