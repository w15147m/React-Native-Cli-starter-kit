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

import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
          <View>
            <Text className="text-slate-400 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
              Welcome Back
            </Text>
            <Text className="text-2xl font-black text-slate-900 dark:text-white">Dashboard</Text>
          </View>
          <TouchableOpacity 
            className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
            onPress={() => navigation.openDrawer()}
          >
            <Bars3Icon size={24} color={isDarkMode ? "#f8fafc" : "#1e293b"} />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View className="mx-6 bg-indigo-600 dark:bg-indigo-500 rounded-[32px] p-6 mb-8 overflow-hidden relative shadow-lg shadow-indigo-200 dark:shadow-none">
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
          <Text className="text-xl font-bold text-slate-900 dark:text-white mb-4">Your Habits</Text>
          
          <View className="items-center py-10 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-50 dark:border-slate-800 shadow-sm">
            <View className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full items-center justify-center mb-4">
              <SparklesIcon size={32} color={isDarkMode ? "#a5b4fc" : "#6366f1"} />
            </View>
            <Text className="text-slate-900 dark:text-white font-bold text-lg mb-2">No Habits Yet</Text>
            <Text className="text-slate-400 dark:text-slate-500 text-center px-10 leading-5">
              Start your journey today by adding your first daily habit.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
