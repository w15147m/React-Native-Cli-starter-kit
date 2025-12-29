import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  HomeIcon, 
  ChartBarIcon, 
  UserCircleIcon 
} from 'react-native-heroicons/outline';
import { 
  HomeIcon as HomeIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  UserCircleIcon as UserCircleIconSolid 
} from 'react-native-heroicons/solid';

// Custom Components & Pages
import CustomTabBar from './CustomTabBar';
import Home from '../../pages/Home';
import Statistics from '../../pages/Statistics';
import Profile from '../../pages/Profile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="MainHome" 
        component={Home} 
        options={{ 
          title: 'Home',
          tabBarIcon: (props) => <HomeIcon {...props} />,
          tabBarIconActive: (props) => <HomeIconSolid {...props} />
        }} 
      />
      <Tab.Screen 
        name="Statistics" 
        component={Statistics} 
        options={{ 
          title: 'Statistics',
          tabBarIcon: (props) => <ChartBarIcon {...props} />,
          tabBarIconActive: (props) => <ChartBarIconSolid {...props} />
        }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={Profile} 
        options={{ 
          title: 'Profile',
          tabBarIcon: (props) => <UserCircleIcon {...props} />,
          tabBarIconActive: (props) => <UserCircleIconSolid {...props} />
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
