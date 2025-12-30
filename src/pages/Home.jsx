import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Bars3Icon,
  FireIcon,
  SparklesIcon
} from 'react-native-heroicons/outline';

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
          <View>
            <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
              Welcome Back
            </Text>
            <Text className="text-2xl font-black text-slate-900">Dashboard</Text>
          </View>
          <TouchableOpacity 
            className="p-2 rounded-xl bg-white shadow-sm border border-slate-100"
            onPress={() => navigation.openDrawer()}
          >
            <Bars3Icon size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View className="mx-6 bg-indigo-600 rounded-[32px] p-6 mb-8 overflow-hidden relative">
          <View className="z-10">
            <Text className="text-indigo-100 font-bold mb-2">Daily Progress</Text>
            <Text className="text-3xl font-black text-white mb-4">Keep it up! 🚀</Text>
            <View className="flex-row items-center bg-white/20 self-start px-4 py-2 rounded-full">
              <FireIcon size={20} color="white" />
              <Text className="text-white font-bold ml-2">5 Day Streak</Text>
            </View>
          </View>
          
          {/* Abstract circles */}
          <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <View className="absolute -bottom-20 -left-10 w-60 h-60 bg-white/5 rounded-full" />
        </View>

        {/* Dummy Content */}
        <View className="px-6">
          <Text className="text-xl font-bold text-slate-900 mb-4">Your Habits</Text>
          
          <View className="items-center py-10 bg-white rounded-[32px] border border-slate-50 shadow-sm">
            <View className="w-16 h-16 bg-indigo-50 rounded-full items-center justify-center mb-4">
              <SparklesIcon size={32} color="#6366f1" />
            </View>
            <Text className="text-slate-900 font-bold text-lg mb-2">No Habits Yet</Text>
            <Text className="text-slate-400 text-center px-10 leading-5">
              Start your journey today by adding your first daily habit.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
