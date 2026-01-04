import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Bars3Icon,
  PlusIcon
} from 'react-native-heroicons/outline';
import CreateHabitModal from './components/CreateHabitModal';
import { getUserHabits, createHabit } from '../../services/habitServices';
import { getItem } from '../../utils/storage';

import { useTheme } from '../../context/ThemeContext';

// Icon emoji mapping to get emoji from value
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

const Habits = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Load user ID and habits on mount
  useEffect(() => {
    loadUserAndHabits();
  }, []);

  const loadUserAndHabits = async () => {
    try {
      setLoading(true);
      const authInfo = await getItem('authInfo');
      if (authInfo && authInfo.user) {
        setUserId(authInfo.user.id);
        const userHabits = await getUserHabits(authInfo.user.id);
        setHabits(userHabits);
      }
    } catch (error) {
      console.error('Load habits error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHabit = async (data) => {
    try {
      if (!userId) {
        console.error('No user ID found');
        return;
      }

      const newHabit = await createHabit({
        user_id: userId,
        title: data.title,
        description: data.description,
        icon: data.icon,
        habit_type: 'boolean',
      });

      // Reload habits
      await loadUserAndHabits();
      setCreateModalVisible(false);
    } catch (error) {
      console.error('Create habit error:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="text-slate-500 dark:text-slate-400 mt-4">Loading habits...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <View className="flex-1 relative">
        {/* Header - Home Style */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
          <View>
            <Text className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">
              Welcome Back
            </Text>
            <Text className="text-2xl font-black text-slate-900 dark:text-white">Habits</Text>
          </View>
          <TouchableOpacity 
            className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
            onPress={() => navigation.openDrawer()}
          >
            <Bars3Icon size={24} color={isDarkMode ? "#f8fafc" : "#1e293b"} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {habits.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Text className="text-slate-400 dark:text-slate-500 text-lg font-medium">
                No habits yet
              </Text>
              <Text className="text-slate-400 dark:text-slate-500 text-sm mt-2">
                Tap the + button to create your first habit
              </Text>
            </View>
          ) : (
            <View className="space-y-4 pb-10">
              {habits.map((habit) => (
                <TouchableOpacity
                  key={habit.id}
                  onPress={() => {
                    // Sanitize habit object for navigation (Date objects are not serializable)
                    const serializedHabit = {
                      ...habit,
                      created_at: habit.created_at?.toISOString?.() || habit.created_at,
                      updated_at: habit.updated_at?.toISOString?.() || habit.updated_at,
                    };
                    navigation.navigate('HabitDetails', { habit: serializedHabit });
                  }}
                  className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex-row items-center"
                  activeOpacity={0.7}
                >
                  {/* Icon */}
                  <View className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 items-center justify-center mr-3">
                    <Text style={{ fontSize: 24 }}>
                      {ICON_EMOJIS[habit.icon] || '📌'}
                    </Text>
                  </View>
                  
                  {/* Content */}
                  <View className="flex-1">
                    <Text className="text-slate-900 dark:text-white font-bold text-base mb-1">
                      {habit.title}
                    </Text>
                    <Text className="text-slate-500 dark:text-slate-400 text-sm leading-5">
                      {habit.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity
          className="absolute bottom-20 right-3 w-14 h-14 bg-indigo-600 rounded-full items-center justify-center shadow-lg shadow-indigo-300 z-50"
          onPress={() => setCreateModalVisible(true)}
          activeOpacity={0.9}
        >
          <PlusIcon size={28} color="white" />
        </TouchableOpacity>

        <CreateHabitModal 
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onCreate={handleCreateHabit}
        />
      </View>
    </SafeAreaView>
  );
};

export default Habits;
