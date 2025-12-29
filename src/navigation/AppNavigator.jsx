import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

// Auth Screens
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Main Screens
import Home from '../pages/Home';
import Statistics from '../pages/Statistics';
import Profile from '../pages/Profile';
import SplashScreen from '../pages/SplashScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View 
      className="bg-white h-24 rounded-t-[40px] flex-row items-center px-8 shadow-2xl border-t border-slate-50 absolute bottom-0 left-0 right-0"
      style={{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 30,
        paddingBottom: 10
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const Icon = isFocused ? options.tabBarIconActive : options.tabBarIcon;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            className={`flex-1 items-center justify-center ${isFocused ? 'bg-indigo-50/80 rounded-xl py-1.5 px-2' : ''}`}
            style={isFocused ? { maxWidth: 80 } : {}}
          >
            <Icon size={24} color={isFocused ? '#6366f1' : '#94a3b8'} />
            <Text className={`text-[9px] font-bold mt-1 ${isFocused ? 'text-indigo-600' : 'text-slate-400'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

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
        name="Profile" 
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

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  const [showSplash, setShowSplash] = React.useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (loading) {
    return (
      <View className="flex-1 bg-[#F8FAFC] justify-center items-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Tabs" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
