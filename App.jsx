import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';
import { runMigrations } from './src/db/client';

function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Running database migrations...');
        await runMigrations();
        console.log('Migrations completed successfully');
      } catch (error) {
        console.error('Migration error:', error);
      } finally {
        SplashScreen.hide();
      }
    };

    initializeApp();
  }, []);

  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
