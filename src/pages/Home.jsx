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
  HomeIcon,
  ChartBarIcon,
  UserCircleIcon
} from 'react-native-heroicons/outline';
import { UserCircleIcon as UserCircleIconSolid } from 'react-native-heroicons/solid';

const { width } = Dimensions.get('window');

const Home = () => {
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
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-6 mb-8">
          <Text className="text-2xl font-black text-slate-900">Profile</Text>
          <TouchableOpacity 
            onPress={logout}
            className="p-2 rounded-xl bg-white shadow-sm border border-slate-100"
          >
            <Cog6ToothIcon size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* User Card */}
        <View className="mx-6 bg-white rounded-[32px] p-5 flex-row items-center shadow-xl shadow-slate-200/50 border border-slate-50 mb-6">
          <View className="w-16 h-16 bg-emerald-100 rounded-[22px] items-center justify-center">
            <UserIcon size={32} color="#10b981" />
          </View>
          <View className="flex-1 ml-4">
            <Text className="text-xl font-bold text-slate-900">
              {user?.user?.name || 'User Name'}
            </Text>
            <Text className="text-slate-400 font-medium">
              @{user?.user?.name?.toLowerCase().replace(/\s/g, '') || 'username'}
            </Text>
          </View>
          <TouchableOpacity className="p-2">
            <PencilSquareIcon size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View className="flex-row mx-6 mb-8">
          {stats.map((stat, index) => (
            <View 
              key={index} 
              className={`flex-1 bg-white rounded-[24px] p-5 shadow-lg shadow-slate-200/40 border border-slate-50 ${index === 0 ? 'mr-3' : 'ml-3'}`}
            >
              <Text className="text-2xl font-black text-slate-900 mb-1">{stat.value}</Text>
              <Text className="text-slate-400 text-xs font-bold leading-4 pr-2">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Achievements Section */}
        <View className="px-6 mb-4">
          <Text className="text-xl font-bold text-slate-900 mb-6">Achievements</Text>
          
          <View className="items-center py-8">
            <Image 
              source={require('../assets/3D-Icon/Bunny-small.png')}
              style={{ width: 140, height: 140 }}
              resizeMode="contain"
            />
            <Text className="text-lg font-bold text-slate-900 mt-4 mb-2">
              Your journey starts here.
            </Text>
            <Text className="text-slate-400 text-center px-10 leading-5 font-medium mb-8">
              Complete your daily habits to unlock badges and track your growth.
            </Text>
            
            <TouchableOpacity className="bg-indigo-600 px-10 py-4 rounded-2xl shadow-xl shadow-indigo-200">
              <Text className="text-white font-bold text-lg">Add Habit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Persistent Bottom Nav (Mocked) */}
      <View 
        className="absolute bottom-6 left-6 right-6 bg-white h-20 rounded-[30px] flex-row items-center px-4 shadow-2xl border border-slate-50"
        style={{ 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 20
        }}
      >
        <TouchableOpacity className="flex-1 items-center justify-center">
          <HomeIcon size={26} color="#94a3b8" />
          <Text className="text-[10px] text-slate-400 font-bold mt-1">Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-1 items-center justify-center">
          <ChartBarIcon size={26} color="#94a3b8" />
          <Text className="text-[10px] text-slate-400 font-bold mt-1">Statistics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-1 items-center justify-center bg-indigo-50/50 rounded-2xl py-2">
          <UserCircleIconSolid size={26} color="#6366f1" />
          <Text className="text-[10px] text-indigo-600 font-bold mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
