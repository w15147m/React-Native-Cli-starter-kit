import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  ChartBarSquareIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  Bars3Icon
} from 'react-native-heroicons/outline';

const { width } = Dimensions.get('window');

import { useTheme } from '../context/ThemeContext';

const Statistics = () => {
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
        <View className="px-6 pt-4 mb-8 flex-row justify-between items-start">
          <View>
            <Text className="text-2xl font-black text-slate-900 dark:text-white">Statistics</Text>
            <Text className="text-slate-400 dark:text-slate-500 font-medium text-sm mt-1">Track your consistency</Text>
          </View>
          <TouchableOpacity 
            className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
            onPress={() => navigation.openDrawer()}
          >
            <Bars3Icon size={24} color={isDarkMode ? "#f8fafc" : "#1e293b"} />
          </TouchableOpacity>
        </View>

        {/* Dummy Chart Placeholder */}
        <View className="mx-6 bg-white dark:bg-slate-900 rounded-[32px] p-6 mb-8 border border-slate-50 dark:border-slate-800 shadow-sm items-center justify-center h-64">
          <ChartBarSquareIcon size={48} color={isDarkMode ? "#334155" : "#e2e8f0"} />
          <Text className="text-slate-300 dark:text-slate-600 font-bold mt-4">Growth Chart Placeholder</Text>
        </View>

        {/* Info Rows */}
        <View className="px-6 space-y-4">
          <View className="bg-white dark:bg-slate-900 p-5 rounded-[24px] flex-row items-center border border-slate-50 dark:border-slate-800 shadow-sm">
            <View className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-full items-center justify-center">
              <ArrowUpIcon size={20} color="#10b981" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-slate-900 dark:text-white font-bold">Best Day</Text>
              <Text className="text-slate-400 dark:text-slate-500 text-xs">Monday (All habits completed)</Text>
            </View>
            <Text className="text-slate-900 dark:text-emerald-400 font-black text-xl">100%</Text>
          </View>

          <View className="bg-white dark:bg-slate-900 p-5 rounded-[24px] flex-row items-center border border-slate-50 dark:border-slate-800 shadow-sm">
            <View className="w-10 h-10 bg-rose-100 dark:bg-rose-900/20 rounded-full items-center justify-center">
              <ArrowDownIcon size={20} color="#ef4444" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-slate-900 dark:text-white font-bold">Weakest Day</Text>
              <Text className="text-slate-400 dark:text-slate-500 text-xs">Friday (2 habits missed)</Text>
            </View>
            <Text className="text-slate-900 dark:text-rose-400 font-black text-xl">40%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Statistics;
