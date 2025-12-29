import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { AlertProvider } from './src/context/AlertContext';
import AlertModal from './src/components/AlertModal';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import { runMigrations } from './src/db/client';

function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await runMigrations();
      } catch (error) {
        // Silent error for UI, or handle as needed
      } finally {
        SplashScreen.hide();
      }
    };

    initializeApp();
  }, []);

  return (
    <AuthProvider>
      <AlertProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        <AppNavigator />
        <AlertModal />
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
