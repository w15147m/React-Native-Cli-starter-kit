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
  InformationCircleIcon,
  ClipboardDocumentListIcon
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

  const handleToggleStatus = async () => {
    try {
      const updatedHabit = await updateHabit(currentHabit.id, {
        is_active: !currentHabit.is_active
      });
      setCurrentHabit(updatedHabit);
      showToast(updatedHabit.is_active ? 'Habit resumed' : 'Habit paused', 'success');
    } catch (error) {
      console.error('Toggle status error:', error);
      showToast('Failed to update status', 'error');
    }
  };

  return (
    <View className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        bounces={false}
      >
        {/* Super Header Card (No Back Button) */}
        <View className="bg-white dark:bg-slate-900 rounded-b-[40px] pt-12 pb-8 px-6 shadow-lg shadow-slate-200/50 dark:shadow-none z-10">
          
          {/* Main Content Row */}
          <View className="flex-row items-center mb-6">
            <View className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 items-center justify-center mr-4">
              <Text style={{ fontSize: 32 }}>
                {ICON_EMOJIS[currentHabit.icon] || '📌'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {currentHabit.title}
              </Text>
              
              <View className="flex-row items-center space-x-3">
                 {/* Target Badge */}
                 <View className="flex-row items-center bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                    <FireIcon size={12} color={isDarkMode ? '#94a3b8' : '#64748b'} style={{ marginRight: 4 }} />
                    <Text className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">
                      {currentHabit.habit_type === 'time' && currentHabit.target_value 
                        ? `${currentHabit.target_value}m` 
                        : currentHabit.habit_type === 'count' && currentHabit.target_value 
                          ? `${currentHabit.target_value}x` 
                          : 'Daily'}
                    </Text>
                 </View>
                 
                 {/* Status Badge */}
                 <View className={`px-2 py-1 rounded-md ${currentHabit.is_active ? 'bg-green-100 dark:bg-green-500/20' : 'bg-rose-100 dark:bg-rose-500/20'}`}>
                    <Text className={`text-xs font-bold ${currentHabit.is_active ? 'text-green-700 dark:text-green-400' : 'text-rose-700 dark:text-rose-400'}`}>
                        {currentHabit.is_active ? 'Active' : 'Paused'}
                    </Text>
                 </View>
              </View>
            </View>
          </View>

          {/* Integrated Control Bar */}
          <View className="flex-row items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
             {/* Status Switcher */}
             <TouchableOpacity 
                onPress={handleToggleStatus}
                className="flex-row items-center"
             >
                <View className={`w-12 h-7 rounded-full mr-3 items-start justify-center px-1 ${currentHabit.is_active ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    <View className={`w-5 h-5 bg-white rounded-full shadow-sm ${currentHabit.is_active ? 'self-end' : 'self-start'}`} />
                </View>
                <Text className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    {currentHabit.is_active ? 'Running' : 'Stopped'}
                </Text>
             </TouchableOpacity>

             {/* Action Icons */}
             <View className="flex-row space-x-1">
                <TouchableOpacity
                  onPress={() => setEditModalVisible(true)}
                  className="p-2 rounded-full active:bg-slate-100 dark:active:bg-slate-800"
                >
                  <PencilSquareIcon size={22} color={isDarkMode ? '#94a3b8' : '#64748b'} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('HabitSchedules', { habit: currentHabit })}
                  className="p-2 rounded-full active:bg-slate-100 dark:active:bg-slate-800"
                >
                  <CalendarIcon size={22} color={isDarkMode ? '#94a3b8' : '#64748b'} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDeletePress}
                  className="p-2 rounded-full active:bg-rose-50 dark:active:bg-rose-900/20"
                >
                  <TrashIcon size={22} color="#f43f5e" />
                </TouchableOpacity>
             </View>
          </View>
        </View>

        {/* Habit Overview Card */}
        <View className="mx-6 mt-2 bg-white dark:bg-slate-900 rounded-[28px] p-5 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800">
            <View className="flex-row items-center mb-4">
                <Text className="text-lg font-bold text-slate-900 dark:text-white mr-2">
                    Habit Overview
                </Text>
                <InformationCircleIcon size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
            </View>

            <View className="flex-row bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <TouchableOpacity
                    onPress={() => navigation.navigate('HabitLogs', { habit: currentHabit })}
                    className="flex-1 py-3 rounded-lg bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 mr-1 flex-row items-center justify-center space-x-2"
                >
                    <ClipboardDocumentListIcon size={18} color={isDarkMode ? '#fdba74' : '#f97316'} />
                    <Text className="font-bold text-slate-900 dark:text-white text-sm">Logs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('HabitStreaks', { habit: currentHabit })}
                    className="flex-1 py-3 rounded-lg bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 ml-1 flex-row items-center justify-center space-x-2"
                >
                    <ChartBarIcon size={18} color={isDarkMode ? '#d8b4fe' : '#a855f7'} />
                    <Text className="font-bold text-slate-900 dark:text-white text-sm">Streaks</Text>
                </TouchableOpacity>
            </View>
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
    </View>
  );
};

export default HabitDetails;
