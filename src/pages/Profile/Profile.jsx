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
  Cog6ToothIcon,
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
  const { user, logout, changePassword, updateProfile } = useContext(AuthContext);
  const { showAlert } = useAlert();
  const navigation = useNavigation();
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const stats = [
    { label: 'Total Completed Habit', value: '0' },
    { label: 'Experience Points (XP)', value: '0' },
  ];

  const handleUpdateProfile = async (data) => {
    try {
      await updateProfile(data);
      showAlert('Success', 'Profile updated successfully!', 'success');
    } catch (error) {
      showAlert('Error', 'Failed to update profile.', 'error');
    }
  };

  const handleDeleteAccountConfirm = async () => {
    // Logic for actual deletion would be here or in context
     showAlert('Info', 'Delete account request sent', 'info');
  };

  const handleDeleteAccountPress = () => {
    setDeleteModalVisible(true);
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      await changePassword(oldPassword, newPassword);
      showAlert('Success', 'Password changed successfully! Please login again.', 'success', () => {
         logout();
      });
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
            <Cog6ToothIcon size={22} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* User Card */}
        <View className="mx-6 bg-white rounded-[28px] p-4 flex-row items-center shadow-lg shadow-slate-200/50 border border-slate-50 mb-4">
          <View className="w-14 h-14 bg-emerald-100 rounded-[20px] items-center justify-center">
            <UserIcon size={28} color="#10b981" />
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

        {/* Stats Grid */}
        <View className="flex-row mx-6 mb-6">
          {stats.map((stat, index) => (
            <View 
              key={index} 
              className={`flex-1 bg-white rounded-[22px] p-4 shadow-md shadow-slate-200/40 border border-slate-50 ${index === 0 ? 'mr-3' : 'ml-3'}`}
            >
              <Text className="text-xl font-black text-slate-900 mb-0.5">{stat.value}</Text>
              <Text className="text-slate-400 text-[10px] font-bold leading-3 pr-2">
                {stat.label}
              </Text>
            </View>
          ))}
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
            
            <TouchableOpacity className="bg-indigo-600 px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-200">
              <Text className="text-white font-bold text-base">Add Habit</Text>
            </TouchableOpacity>
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
