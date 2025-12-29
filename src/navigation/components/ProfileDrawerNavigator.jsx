import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../../pages/Profile';
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
      }}
    >
      <Drawer.Screen name="ProfileMain" component={Profile} />
    </Drawer.Navigator>
  );
};

export default ProfileDrawerNavigator;
