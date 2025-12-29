import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <ScrollView className="flex-1 bg-slate-900">
      <View className="flex-1 p-6">
        {/* Header */}
        <View className="bg-slate-800 p-6 rounded-3xl border border-slate-700 mb-6">
          <View className="bg-sky-500/20 w-16 h-16 rounded-2xl items-center justify-center self-center mb-4">
            <Text className="text-3xl">👋</Text>
          </View>
          <Text className="text-2xl font-bold text-white text-center mb-2">
            Welcome, {user?.user?.name || 'User'}!
          </Text>
          <Text className="text-slate-400 text-center">
            {user?.user?.email}
          </Text>
        </View>

        {/* User Info Card */}
        <View className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mb-6">
          <Text className="text-slate-300 font-bold mb-4 text-lg">
            Account Details
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between py-2 border-b border-slate-700">
              <Text className="text-slate-400">User ID</Text>
              <Text className="text-white font-medium">
                #{user?.user?.id}
              </Text>
            </View>
            
            <View className="flex-row justify-between py-2 border-b border-slate-700">
              <Text className="text-slate-400">Name</Text>
              <Text className="text-white font-medium">
                {user?.user?.name}
              </Text>
            </View>
            
            <View className="flex-row justify-between py-2">
              <Text className="text-slate-400">Email</Text>
              <Text className="text-white font-medium">
                {user?.user?.email}
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={logout}
          className="bg-red-500 py-4 rounded-xl"
        >
          <Text className="text-white text-center font-bold text-lg">
            Logout
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="mt-8 items-center">
          <View className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
            <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Authenticated ✓
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
