import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  HomeIcon, 
  ChartBarIcon, 
  ClipboardDocumentListIcon
} from 'react-native-heroicons/outline';
import { 
  HomeIcon as HomeIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid
} from 'react-native-heroicons/solid';

// Custom Components & Pages
import CustomTabBar from './CustomTabBar';
import Home from '../../pages/Home';
import Statistics from '../../pages/Statistics';
import Habits from '../../pages/Habit/Habits';

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
        name="Habits" 
        component={Habits} 
        options={{ 
          title: 'Habits',
          tabBarIcon: (props) => <ClipboardDocumentListIcon {...props} />, 
          tabBarIconActive: (props) => <ClipboardDocumentListIconSolid {...props} />
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
