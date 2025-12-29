import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon, 
  CheckBadgeIcon, 
  HashtagIcon, 
  EnvelopeIcon, 
  UserIcon 
} from 'react-native-heroicons/solid';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <ScrollView className="flex-1 bg-slate-900">
      <View className="flex-1 p-6">
        {/* Header */}
        <View className="bg-slate-800 p-6 rounded-3xl border border-slate-700 mb-6 shadow-xl">
          <View className="bg-indigo-500/20 w-20 h-20 rounded-3xl items-center justify-center self-center mb-4">
            <UserCircleIcon size={50} color="#6366f1" />
          </View>
          <Text className="text-2xl font-bold text-white text-center mb-1">
            Welcome, {user?.user?.name || 'User'}!
          </Text>
          <Text className="text-slate-400 text-center font-medium">
            {user?.user?.email}
          </Text>
        </View>

        {/* User Info Card */}
        <View className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-6 shadow-sm">
          <View className="flex-row items-center mb-6">
            <Text className="text-slate-200 font-bold text-xl">Account Profile</Text>
          </View>
          
          <View className="space-y-4">
            <View className="flex-row items-center justify-between py-1">
              <View className="flex-row items-center">
                <HashtagIcon size={20} color="#94a3b8" />
                <Text className="text-slate-400 ml-3 font-medium">User ID</Text>
              </View>
              <Text className="text-white font-semibold">
                #{user?.user?.id}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between py-1">
              <View className="flex-row items-center">
                <UserIcon size={20} color="#94a3b8" />
                <Text className="text-slate-400 ml-3 font-medium">Full Name</Text>
              </View>
              <Text className="text-white font-semibold">
                {user?.user?.name}
              </Text>
            </View>
            
            <View className="flex-row items-center justify-between py-1">
              <View className="flex-row items-center">
                <EnvelopeIcon size={20} color="#94a3b8" />
                <Text className="text-slate-400 ml-3 font-medium">Email Address</Text>
              </View>
              <Text className="text-white font-semibold">
                {user?.user?.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={logout}
          className="bg-rose-500 flex-row items-center justify-center py-4 rounded-2xl shadow-lg shadow-rose-500/30"
        >
          <ArrowRightOnRectangleIcon size={24} color="white" />
          <Text className="text-white font-bold text-lg ml-3">
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="mt-8 items-center">
          <View className="bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20 flex-row items-center">
            <CheckBadgeIcon size={16} color="#10b981" />
            <Text className="text-emerald-500 text-xs font-bold uppercase tracking-widest ml-2">
              Securely Authenticated
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
