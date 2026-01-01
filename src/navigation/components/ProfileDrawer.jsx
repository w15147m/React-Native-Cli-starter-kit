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
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';

const ProfileDrawer = (props) => {
  const { user, logout } = useContext(AuthContext);
  const { showAlert, showToast } = useAlert();

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
    <View style={{ flex: 1 }} className="bg-white">
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Flat Header Section */}
        <View className="px-6 pt-8 pb- border-b border-slate-50 flex-row items-center">
          <View className="w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 overflow-hidden mr-4">
            {user?.user?.profile_image ? (
              <Image 
                source={{ uri: user.user.profile_image }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <UserIcon size={24} color="#6366f1" />
            )}
          </View>
          <View className="flex-1">
            <Text className="text-xl font-black text-slate-900 leading-tight">
              {user?.user?.name || 'User Name'}
            </Text>
            <Text className="text-slate-400 font-bold text-xs mt-0.5">
              {user?.user?.email || 'user@example.com'}
            </Text>
          </View>
        </View>

        {/* Flat Menu Items */}
        <View className="mt-6 px-2">
          <TouchableOpacity 
            onPress={handleEditProfile}
            activeOpacity={0.5}
            className="flex-row items-center px-4 py-4 rounded-2xl"
          >
            <View className="w-9 h-9 bg-indigo-50 rounded-xl items-center justify-center mr-4">
              <UserIcon size={18} color="#6366f1" />
            </View>
            <Text className="flex-1 text-slate-700 font-bold text-base">My Profile</Text>
            <ChevronRightIcon size={16} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Minimal Footer Logout */}
      <View className="px-6 py-6 border-t border-slate-50">
        <TouchableOpacity 
          onPress={handleLogout}
          activeOpacity={0.5}
          className="flex-row items-center py-2"
        >
          <View className="w-9 h-9 bg-rose-50 rounded-xl items-center justify-center mr-4">
            <ArrowLeftOnRectangleIcon size={18} color="#f43f5e" />
          </View>
          <Text className="text-rose-600 font-bold text-base">Logout Account</Text>
        </TouchableOpacity>
        
        <View className="mt-6">
          <Text className="text-slate-300 text-[10px] font-black uppercase tracking-[2px] text-center">
            VERSION 1.0.2 • PREMIUM
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileDrawer;
