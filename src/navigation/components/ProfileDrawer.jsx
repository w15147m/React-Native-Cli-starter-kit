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
        {/* Drawer Header / User Info */}
        <View className="bg-indigo-600 px-6 py-8 pb-10 rounded-b-[40px] mb-6 shadow-xl">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-white/20 rounded-[22px] items-center justify-center border border-white/30 overflow-hidden">
              {user?.user?.profile_image ? (
                <Image 
                  source={{ uri: user.user.profile_image }} 
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <UserIcon size={32} color="white" />
              )}
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-xl font-bold text-white mb-0.5" numberOfLines={1}>
                {user?.user?.name || 'User Name'}
              </Text>
              <Text className="text-indigo-100 font-medium text-xs" numberOfLines={1}>
                {user?.user?.email || 'user@example.com'}
              </Text>
            </View>
          </View>
        </View>

        {/* Custom Drawer Items */}
        <View className="px-4 space-y-2">
          <TouchableOpacity 
            onPress={handleEditProfile}
            className="flex-row items-center p-4 rounded-2xl bg-indigo-50 border border-indigo-100"
          >
            <UserIcon size={22} color="#6366f1" />
            <Text className="flex-1 text-slate-900 font-bold ml-4">Profile</Text>
            <ChevronRightIcon size={18} color="#6366f1" />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Footer / Logout */}
      <View className="p-6 border-t border-slate-100">
        <TouchableOpacity 
          onPress={handleLogout}
          className="flex-row items-center p-4 rounded-2xl bg-slate-900 shadow-lg"
        >
          <ArrowLeftOnRectangleIcon size={22} color="white" />
          <Text className="text-white font-bold ml-4">Logout</Text>
        </TouchableOpacity>
        
        <Text className="text-center text-slate-300 text-[10px] mt-4 font-bold uppercase tracking-widest">
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
};

export default ProfileDrawer;
