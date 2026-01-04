import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarIcon,
  ChartBarIcon,
  FireIcon,
} from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';
import { useAlert } from '../../context/AlertContext';
import EditHabitModal from './components/EditHabitModal';
import DeleteHabitModal from './components/DeleteHabitModal';
import { updateHabit, deleteHabit } from '../../services/habitServices';

// Icon emoji mapping
const ICON_EMOJIS = {
  water: '💧', books: '📚', running: '🏃', meditation: '🧘', strength: '💪',
  target: '🎯', time: '⏰', writing: '✍️', art: '🎨', music: '🎵',
  food: '🍎', sleep: '😴', fire: '🔥', star: '⭐', idea: '💡',
  growth: '🌱', education: '🎓', coding: '💻', gym: '🏋️', cycling: '🚴',
  brain: '🧠', heart: '❤️', sparkle: '🌟', fun: '🎪', sun: '🌞',
  moon: '🌙', coffee: '☕', salad: '🥗', walking: '🚶', movie: '🎬',
  phone: '📱', gaming: '🎮', home: '🏠', travel: '✈️', photography: '📷',
  singing: '🎤', pizza: '🍕', swimming: '🏊', soccer: '⚽', tennis: '🎾',
  puzzle: '🧩', piano: '🎹', guitar: '🎸', earth: '🌍', rainbow: '🌈',
  bell: '🔔', notes: '📝', calendar: '🗓️', money: '💰', gift: '🎁',
  flower: '🌺', clover: '🍀', butterfly: '🦋', dog: '🐕', cat: '🐱',
  wave: '🌊', mountain: '⛰️', beach: '🏖️', cake: '🎂', dessert: '🍰',
};

const HabitDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { habit } = route.params;
  const { isDarkMode } = useTheme();
  const { showAlert, showToast } = useAlert();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(habit);

  const handleUpdateHabit = async (data) => {
    try {
      const updated = await updateHabit(currentHabit.id, {
        title: data.title,
        description: data.description,
        icon: data.icon,
        habit_type: data.habit_type,
        target_value: data.target_value,
      });
      
      // Serialize for state and future navigation
      const serializedUpdated = {
        ...updated,
        created_at: updated.created_at?.toISOString?.() || updated.created_at,
        updated_at: updated.updated_at?.toISOString?.() || updated.updated_at,
      };
      
      setCurrentHabit(serializedUpdated);
      showToast('Habit updated successfully!', 'success');
      setEditModalVisible(false);
    } catch (error) {
      showAlert('Error', 'Failed to update habit.', 'error');
    }
  };

  const handleDeleteHabit = async () => {
    try {
      await deleteHabit(currentHabit.id);
      showToast('Habit deleted successfully!', 'success');
      navigation.goBack();
    } catch (error) {
      showAlert('Error', 'Failed to delete habit.', 'error');
    }
  };

  const handleDeletePress = () => {
    setDeleteModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex-row items-center px-6 pt-4 mb-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 mr-3"
          >
            <ChevronLeftIcon size={22} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
          </TouchableOpacity>
          <Text className="text-2xl font-black text-slate-900 dark:text-white flex-1">
            Habit Details
          </Text>
        </View>

        {/* Habit Card */}
        <View className="mx-6 bg-white dark:bg-slate-900 rounded-[28px] p-6 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800 mb-6">
          <View className="items-center mb-6">
            <View className="w-20 h-20 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 items-center justify-center mb-4">
              <Text style={{ fontSize: 40 }}>
                {ICON_EMOJIS[currentHabit.icon] || '📌'}
              </Text>
            </View>
            <Text className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">
              {currentHabit.title}
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 text-center leading-5 mb-4">
              {currentHabit.description}
            </Text>
          </View>

          {/* Stats Row */}
          <View className="flex-row justify-between space-x-3 mt-2">
            {/* Type Card */}
            <View className="flex-1 bg-slate-50 dark:bg-black/20 p-3 rounded-2xl items-center border border-slate-100 dark:border-white/5">
              <View className="bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-full mb-2">
                <ChartBarIcon size={16} color={isDarkMode ? '#a5b4fc' : '#6366f1'} />
              </View>
              <Text className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Type</Text>
              <Text className="text-slate-900 dark:text-white font-bold capitalize text-sm">
                {currentHabit.habit_type || 'Boolean'}
              </Text>
            </View>

            {/* Target Card */}
            <View className="flex-1 bg-slate-50 dark:bg-black/20 p-3 rounded-2xl items-center border border-slate-100 dark:border-white/5">
              <View className="bg-emerald-100 dark:bg-emerald-500/20 p-2 rounded-full mb-2">
                <FireIcon size={16} color={isDarkMode ? '#6ee7b7' : '#10b981'} />
              </View>
              <Text className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Target</Text>
              <Text className="text-slate-900 dark:text-white font-bold text-sm">
                {currentHabit.target_value ? currentHabit.target_value : 'N/A'}
              </Text>
            </View>

            {/* Status Card */}
            <View className="flex-1 bg-slate-50 dark:bg-black/20 p-3 rounded-2xl items-center border border-slate-100 dark:border-white/5">
              <View className={`p-2 rounded-full mb-2 ${currentHabit.is_active ? 'bg-green-100 dark:bg-green-500/20' : 'bg-rose-100 dark:bg-rose-500/20'}`}>
                <CalendarIcon size={16} color={currentHabit.is_active ? (isDarkMode ? '#86efac' : '#22c55e') : (isDarkMode ? '#fda4af' : '#f43f5e')} />
              </View>
              <Text className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Status</Text>
              <Text className={`font-bold text-sm ${currentHabit.is_active ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {currentHabit.is_active ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions Row */}
        <View className="flex-row justify-between px-6 mb-8 space-x-3">
          <TouchableOpacity
            onPress={() => setEditModalVisible(true)}
            className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm items-center justify-center space-y-2"
          >
            <View className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-full items-center justify-center">
              <PencilSquareIcon size={20} color={isDarkMode ? '#a5b4fc' : '#6366f1'} />
            </View>
            <Text className="text-slate-900 dark:text-slate-200 font-bold text-xs text-center">
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('HabitSchedules', { habit: currentHabit })}
            className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm items-center justify-center space-y-2"
          >
            <View className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full items-center justify-center">
              <CalendarIcon size={20} color={isDarkMode ? '#93c5fd' : '#3b82f6'} />
            </View>
            <Text className="text-slate-900 dark:text-slate-200 font-bold text-xs text-center">
              Schedules
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeletePress}
            className="flex-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm items-center justify-center space-y-2"
          >
            <View className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-full items-center justify-center">
              <TrashIcon size={20} color="#ef4444" />
            </View>
            <Text className="text-slate-900 dark:text-rose-400 font-bold text-xs text-center">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <EditHabitModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        habit={currentHabit}
        onUpdateHabit={handleUpdateHabit}
      />

      <DeleteHabitModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDeleteHabit={handleDeleteHabit}
      />
    </SafeAreaView>
  );
};

export default HabitDetails;
