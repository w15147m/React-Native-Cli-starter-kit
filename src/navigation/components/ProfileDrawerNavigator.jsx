import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ProfileDrawer from './ProfileDrawer';

const Drawer = createDrawerNavigator();

const ProfileDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ProfileDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right', // Drawer opens from the right side
        drawerType: 'front',
        drawerStyle: {
          width: '80%',
        },
        swipeEnabled: false, // Disable swipe to prevent accidental openings on Home/Stats
      }}
    >
      <Drawer.Screen name="TabsRoot" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default ProfileDrawerNavigator;
