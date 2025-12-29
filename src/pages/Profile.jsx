import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  Image,
  SafeAreaView
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { 
  Cog6ToothIcon,
  PencilSquareIcon,
  UserIcon,
} from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const { user, logout } = useContext(AuthContext);

  const stats = [
    { label: 'Total Completed Habit', value: '0' },
    { label: 'Experience Points (XP)', value: '0' },
  ];

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
            onPress={logout}
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
          <TouchableOpacity className="p-2">
            <PencilSquareIcon size={22} color="#6366f1" />
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
              source={require('../assets/3D-Icon/Bunny-small.png')}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
