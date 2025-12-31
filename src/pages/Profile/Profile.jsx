import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Image,
  SafeAreaView
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { useNavigation } from '@react-navigation/native';
import { 
  Bars3Icon,
  PencilSquareIcon,
  UserIcon,
  LockClosedIcon,
  TrashIcon,
  ChevronRightIcon
} from 'react-native-heroicons/outline';
import ChangePasswordModal from './components/ChangePasswordModal';
import EditProfileModal from './components/EditProfileModal';
import DeleteAccountModal from './components/DeleteAccountModal';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const { user, logout, changePassword, updateProfile, deleteUser } = useContext(AuthContext);
  const { showAlert, showToast } = useAlert();
  const navigation = useNavigation();
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);


  const handleUpdateProfile = async (data) => {
    try {
      await updateProfile(data);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showAlert('Error', 'Failed to update profile.', 'error');
    }
  };

  const handleDeleteAccountConfirm = async () => {
    try {
      // Actually delete the user
      await deleteUser();
      
      // Show confirmation alert with toast after
      showAlert('Info', 'Delete account request sent', 'error', () => {
        showToast('Account deleted successfully', 'success');
      }, 'Confirm Delete');
    } catch (error) {
      showToast(error.message || 'Failed to delete account', 'error');
    }
  };

  const handleDeleteAccountPress = () => {
    setDeleteModalVisible(true);
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      await changePassword(oldPassword, newPassword);
      showToast('Password changed successfully! Please login again.', 'success');
      // Delay logout slightly to let user see the toast, or just logout immediately
      // If we logout immediately, toast might disappear if it's part of the authorized context that gets unmounted?
      // Actually Toast is in App.jsx which is above AuthNavigator? No, AuthProvider wraps AppNavigator.
      // If user logs out, we switch to AuthStack.
      // Let's keep the logout logic. 
      setTimeout(() => logout(), 1000); // Small delay to show toast
    } catch (error) {
      showAlert('Error', error.message, 'error');
      throw error;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-4">
          <Text className="text-2xl font-black text-slate-900">Profile</Text>
          <TouchableOpacity 
            onPress={() => navigation.openDrawer()}
            className="p-2 rounded-xl bg-white shadow-sm border border-slate-100"
          >
            <Bars3Icon size={22} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* User Card */}
        <View className="mx-6 bg-white rounded-[28px] p-4 flex-row items-center shadow-lg shadow-slate-200/50 border border-slate-50 mb-4">
          <View className="w-14 h-14 bg-emerald-100 rounded-[20px] items-center justify-center overflow-hidden">
            {user?.user?.profile_image ? (
              <Image 
                source={{ uri: user.user.profile_image }} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <UserIcon size={28} color="#10b981" />
            )}
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-lg font-bold text-slate-900">
              {user?.user?.name || 'User Name'}
            </Text>
            <Text className="text-slate-400 text-sm font-medium">
              @{user?.user?.name?.toLowerCase().replace(/\s/g, '') || 'username'}
            </Text>
          </View>
        </View>

        {/* Actions Row */}
        <View className="flex-row justify-between px-6 mb-8 space-x-3">
          <TouchableOpacity 
            onPress={() => setEditModalVisible(true)}
            className="flex-1 bg-white p-4 rounded-2xl border border-slate-50 shadow-sm items-center justify-center space-y-2"
          >
            <View className="w-10 h-10 bg-indigo-50 rounded-full items-center justify-center">
              <PencilSquareIcon size={20} color="#6366f1" />
            </View>
            <Text className="text-slate-900 font-bold text-xs text-center">Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPasswordModalVisible(true)}
            className="flex-1 bg-white p-4 rounded-2xl border border-slate-50 shadow-sm items-center justify-center space-y-2"
          >
            <View className="w-10 h-10 bg-indigo-50 rounded-full items-center justify-center">
              <LockClosedIcon size={20} color="#6366f1" />
            </View>
            <Text className="text-slate-900 font-bold text-xs text-center">Password</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleDeleteAccountPress}
            className="flex-1 bg-white p-4 rounded-2xl border border-slate-50 shadow-sm items-center justify-center space-y-2"
          >
            <View className="w-10 h-10 bg-rose-50 rounded-full items-center justify-center">
              <TrashIcon size={20} color="#ef4444" />
            </View>
            <Text className="text-slate-900 font-bold text-xs text-center">Delete</Text>
          </TouchableOpacity>
        </View>



        {/* Achievements Section */}
        <View className="px-6 mb-2">
          <Text className="text-lg font-bold text-slate-900 mb-4">Achievements</Text>
          
          <View className="items-center py-4">
            <Image 
              source={require('../../assets/3D-Icon/Bunny-small.png')}
              style={{ width: 110, height: 110 }}
              resizeMode="contain"
            />
            <Text className="text-base font-bold text-slate-900 mt-2 mb-1">
              Your journey starts here.
            </Text>
            <Text className="text-slate-400 text-center px-10 text-xs leading-4 font-medium mb-6">
              Complete your daily habits to unlock badges and track your growth.
            </Text>
            
          </View>
        </View>
        
        <EditProfileModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          user={user}
          onUpdateProfile={handleUpdateProfile}
        />

        <ChangePasswordModal 
          visible={passwordModalVisible}
          onClose={() => setPasswordModalVisible(false)}
          onChangePassword={handleChangePassword}
        />

        <DeleteAccountModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onDeleteAccount={handleDeleteAccountConfirm}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
