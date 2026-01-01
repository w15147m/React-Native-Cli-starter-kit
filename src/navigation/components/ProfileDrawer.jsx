import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AuthContext } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { SunIcon, MoonIcon, UserIcon, ArrowLeftOnRectangleIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';

const ProfileDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);
  const { showAlert, showToast } = useAlert();
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const handleLogout = () => {
    showAlert(
      'Logout',
      'Are you sure you want to log out?',
      'info',
      () => logout(),
      'Logout'
    );
  };

  const handleDeleteAccount = () => {
    showAlert(
      'Delete Account',
      'This action is permanent. Are you sure you want to delete your account?',
      'error',
      () => {
        // Implementation for delete account would go here
        showToast('Delete account request sent', 'info');
      },
      'Delete'
    );
  };

  const handleEditProfile = () => {
    props.navigation.navigate('TabsRoot', { screen: 'ProfileTab' });
  };

  return (
    <View key={`drawer-${theme}`} style={{ flex: 1 }} className="bg-white dark:bg-slate-900">
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Flat Header Section */}
        <View className="px-6 pt-14 pb-8 border-b border-slate-50 dark:border-slate-800 flex-row items-center">
          <View className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl items-center justify-center border border-slate-100 dark:border-slate-700 overflow-hidden mr-4">
            {user?.user?.profile_image ? (
              <Image 
                source={{ uri: user.user.profile_image }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <UserIcon size={24} color={isDarkMode ? "#818cf8" : "#6366f1"} />
            )}
          </View>
          <View className="flex-1">
            <Text className="text-xl font-black text-slate-900 dark:text-white leading-tight">
              {user?.user?.name || 'User Name'}
            </Text>
            <Text className="text-slate-400 font-bold text-xs mt-0.5">
              {user?.user?.email || 'user@example.com'}
            </Text>
          </View>
        </View>

        {/* Flat Menu Items */}
        <View className="mt-6 px-2 space-y-1">
          <TouchableOpacity 
            onPress={handleEditProfile}
            activeOpacity={0.5}
            className="flex-row items-center px-4 py-4 rounded-2xl"
          >
            <View className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl items-center justify-center mr-4">
              <UserIcon size={20} color={isDarkMode ? "#a5b4fc" : "#6366f1"} />
            </View>
            <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base">My Profile</Text>
            <ChevronRightIcon size={16} color="#94a3b8" />
          </TouchableOpacity>

          {/* Theme Toggle */}
          <View className="flex-row items-center px-5 py-4">
            <View className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl items-center justify-center mr-4">
              {isDarkMode ? (
                <MoonIcon size={20} color="#fbbf24" />
              ) : (
                <SunIcon size={20} color="#f59e0b" />
              )}
            </View>
            <Text className="flex-1 text-slate-700 dark:text-slate-200 font-bold text-base">
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <TouchableOpacity 
              onPress={toggleTheme}
              activeOpacity={0.8}
              className={`w-12 h-6 rounded-full px-1 justify-center ${isDarkMode ? 'bg-indigo-600 items-end' : 'bg-slate-200 items-start'}`}
            >
              <View className="w-4 h-4 bg-white rounded-full shadow-sm" />
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>

      {/* Minimal Footer Logout */}
      <View className="px-6 py-6 border-t border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900">
        <TouchableOpacity 
          onPress={handleLogout}
          activeOpacity={0.5}
          className="flex-row items-center py-2"
        >
          <View className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-xl items-center justify-center mr-4">
            <ArrowLeftOnRectangleIcon size={20} color="#f43f5e" />
          </View>
          <Text className="text-rose-600 dark:text-rose-400 font-bold text-base">Logout Account</Text>
        </TouchableOpacity>
        
        <View className="mt-6">
          <Text className="text-slate-300 dark:text-slate-600 text-[10px] font-black uppercase tracking-[2px] text-center">
            VERSION 1.0.2 • PREMIUM
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileDrawer;
