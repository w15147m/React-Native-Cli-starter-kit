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
  const [selectedTimeRange, setSelectedTimeRange] = useState('Week');

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
        <View className="bg-white dark:bg-slate-900 rounded-b-[16px] pt-6 pb-8 px-6 shadow-lg shadow-slate-200/50 dark:shadow-none z-10">
          
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
              
              <View className="flex-row items-center mb-1">
                 {/* Target Info (No BG) */}
                 <View className="flex-row items-center">
                    <FireIcon size={14} color={isDarkMode ? '#94a3b8' : '#64748b'} style={{ marginRight: 6 }} />
                    <Text className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      {currentHabit.habit_type === 'time' && currentHabit.target_value 
                        ? `${currentHabit.target_value}m` 
                        : currentHabit.habit_type === 'count' && currentHabit.target_value 
                          ? `${currentHabit.target_value}x` 
                          : 'Daily'}
                    </Text>
                 </View>
              </View>

              <Text className="text-slate-400 dark:text-slate-500 leading-4 text-xs" numberOfLines={2}>
                {currentHabit.description}
              </Text>
            </View>
          </View>

          {/* Integrated Control Bar */}
          <View className="flex-row items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
             {/* Status Button (Pill) */}
             <TouchableOpacity 
                onPress={handleToggleStatus}
                className={`flex-row items-center px-4 py-2.5 rounded-xl border ${
                    currentHabit.is_active 
                        ? 'bg-green-50 border-green-200 dark:bg-emerald-500/10 dark:border-emerald-500/20' 
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                }`}
             >
                <View className={`w-2 h-2 rounded-full mr-2.5 ${currentHabit.is_active ? 'bg-green-500 dark:bg-emerald-400' : 'bg-slate-400'}`} />
                <Text className={`font-bold text-sm ${currentHabit.is_active ? 'text-green-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    {currentHabit.is_active ? 'Active' : 'Paused'}
                </Text>
             </TouchableOpacity>

             {/* Action Icons */}
             <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={() => setEditModalVisible(true)}
                  className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 items-center justify-center"
                >
                  <PencilSquareIcon size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('HabitSchedules', { habit: currentHabit })}
                  className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 items-center justify-center"
                >
                  <CalendarIcon size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleDeletePress}
                  className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 items-center justify-center"
                >
                  <TrashIcon size={20} color="#f43f5e" />
                </TouchableOpacity>
             </View>
          </View>
        </View>

        {/* Habit Overview Card */}
        <View className="mx-4 mt-2 bg-white dark:bg-slate-900 rounded-[16px] p-5 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800">
            <View className="flex-row items-center mb-4">
                <Text className="text-lg font-bold text-slate-900 dark:text-white mr-2">
                    Habit Overview
                </Text>
                <InformationCircleIcon size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
            </View>

            {/* Time Range Tabs */}
            <View className="flex-row bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {['Day', 'Week', 'Month', 'Year'].map((range) => (
                    <TouchableOpacity
                        key={range}
                        onPress={() => setSelectedTimeRange(range)}
                        className={`flex-1 py-2 rounded-lg items-center justify-center ${
                            selectedTimeRange === range 
                                ? 'bg-white dark:bg-slate-700 shadow-sm' 
                                : 'bg-transparent'
                        }`}
                    >
                        <Text className={`font-bold text-sm ${
                            selectedTimeRange === range
                                ? 'text-slate-900 dark:text-white'
                                : 'text-slate-400 dark:text-slate-500'
                        }`}>
                            {range}
                        </Text>
                    </TouchableOpacity>
                ))}
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
