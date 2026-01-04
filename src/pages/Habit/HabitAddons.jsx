import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  Switch,
  ActivityIndicator,
  TextInput,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  ChevronLeftIcon, 
  PlusIcon, 
  TrashIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon
} from 'react-native-heroicons/outline';
import { useTheme } from '../../context/ThemeContext';
import { useAlert } from '../../context/AlertContext';
import BaseModal from '../../common/components/BaseModal';
import { 
  getHabitSchedules, 
  createHabitSchedule, 
  deleteHabitSchedule,
  getHabitLogs,
  createHabitLog,
  deleteHabitLog,
  getHabitStreak,
  updateHabitStreak
} from '../../services/habitServices';

// ==========================================
// SHARED COMPONENTS
// ==========================================

const Header = ({ title, onBack }) => {
  const { isDarkMode } = useTheme();
  return (
    <View className="flex-row items-center px-6 pt-4 mb-6">
      <TouchableOpacity
        onPress={onBack}
        className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 mr-3"
      >
        <ChevronLeftIcon size={22} color={isDarkMode ? '#f8fafc' : '#1e293b'} />
      </TouchableOpacity>
      <Text className="text-2xl font-black text-slate-900 dark:text-white flex-1">
        {title}
      </Text>
    </View>
  );
};

const EmptyState = ({ message, icon: Icon }) => {
  const { isDarkMode } = useTheme();
  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center mb-4">
        <Icon size={32} color={isDarkMode ? '#94a3b8' : '#64748b'} />
      </View>
      <Text className="text-slate-500 dark:text-slate-400 text-center">
        {message}
      </Text>
    </View>
  );
};

// ==========================================
// SCHEDULES SCREEN
// ==========================================

const AddScheduleModal = ({ visible, onClose, onAdd }) => {
  const { isDarkMode } = useTheme();
  const [frequency, setFrequency] = useState('daily');
  const [selectedDays, setSelectedDays] = useState([]);
  
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = () => {
    onAdd({
      frequency,
      days: frequency === 'weekly' ? selectedDays : [],
      start_date: new Date(),
    });
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="Add Schedule">
      <View className="mb-6">
        <Text className="text-slate-900 dark:text-white font-bold mb-3">Frequency</Text>
        <View className="flex-row space-x-3 mb-4">
          {['daily', 'weekly'].map((freq) => (
            <TouchableOpacity
              key={freq}
              onPress={() => setFrequency(freq)}
              className={`flex-1 p-3 rounded-xl border ${
                frequency === freq 
                  ? 'bg-indigo-600 border-indigo-600' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <Text className={`text-center font-bold ${
                frequency === freq ? 'text-white' : 'text-slate-900 dark:text-white'
              }`}>
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {frequency === 'weekly' && (
          <View>
            <Text className="text-slate-900 dark:text-white font-bold mb-3">Days</Text>
            <View className="flex-row flex-wrap gap-2">
              {DAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => toggleDay(day)}
                  className={`w-10 h-10 rounded-full items-center justify-center border ${
                    selectedDays.includes(day)
                      ? 'bg-indigo-600 border-indigo-600'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <Text className={`font-medium ${
                    selectedDays.includes(day) ? 'text-white' : 'text-slate-900 dark:text-white'
                  }`}>
                    {day.charAt(0)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-indigo-600 p-4 rounded-2xl items-center shadow-lg shadow-indigo-200 dark:shadow-none"
      >
        <Text className="text-white font-bold text-lg">Add Schedule</Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export const HabitSchedules = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { habit } = route.params || {};
  const { isDarkMode } = useTheme();
  const { showToast } = useAlert();
  
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadSchedules();
  }, [habit?.id]);

  const loadSchedules = async () => {
    try {
      if (habit?.id) {
        const data = await getHabitSchedules(habit.id);
        setSchedules(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSchedule = async (data) => {
    try {
      await createHabitSchedule({ ...data, habit_id: habit.id });
      showToast('Schedule added', 'success');
      loadSchedules();
    } catch (error) {
      showToast('Failed to add schedule', 'error');
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await deleteHabitSchedule(id);
      showToast('Schedule deleted', 'success');
      loadSchedules();
    } catch (error) {
      showToast('Failed to delete schedule', 'error');
    }
  };

  if (loading) return <View className="flex-1 bg-[#F8FAFC] dark:bg-slate-950" />;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="Schedules" onBack={() => navigation.goBack()} />
      
      <View className="flex-1 px-6">
        <FlatList
          data={schedules}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <EmptyState message="No schedules set. Add one to start tracking!" icon={CalendarDaysIcon} />
          }
          renderItem={({ item }) => (
            <View className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-3 flex-row items-center justify-between">
              <View>
                <Text className="text-slate-900 dark:text-white font-bold text-lg capitalize mb-1">
                  {item.frequency}
                </Text>
                {item.frequency === 'weekly' && item?.days && (
                  <Text className="text-slate-500 dark:text-slate-400">
                    {item.days.join(', ')}
                  </Text>
                )}
                <Text className="text-slate-400 text-xs mt-1">
                   Started: {new Date(item.start_date).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleDeleteSchedule(item.id)}
                className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-xl"
              >
                <TrashIcon size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-10 right-6 w-14 h-14 bg-indigo-600 rounded-full items-center justify-center shadow-lg shadow-indigo-300 z-50"
      >
        <PlusIcon size={28} color="white" />
      </TouchableOpacity>

      <AddScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddSchedule}
      />
    </SafeAreaView>
  );
};

// ==========================================
// LOGS SCREEN
// ==========================================

const AddLogModal = ({ visible, onClose, onAdd }) => {
  const { isDarkMode } = useTheme();
  const [completed, setCompleted] = useState(true);
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onAdd({
      is_completed: completed,
      value: value ? parseInt(value) : null,
      log_date: new Date(),
    });
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="Add Log">
      <View className="mb-6">
        <View className="flex-row items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-4">
          <Text className="text-slate-900 dark:text-white font-bold">Completed</Text>
          <Switch 
            value={completed} 
            onValueChange={setCompleted}
            trackColor={{ false: '#767577', true: '#818cf8' }}
            thumbColor={completed ? '#4f46e5' : '#f4f3f4'} 
          />
        </View>

        <View>
          <Text className="text-slate-900 dark:text-white font-bold mb-2">Value (Optional)</Text>
          <TextInput 
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            placeholder="e.g. 5 (for 5 times/minutes)"
            placeholderTextColor="#94a3b8"
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-indigo-600 p-4 rounded-2xl items-center shadow-lg"
      >
        <Text className="text-white font-bold text-lg">Save Log</Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export const HabitLogs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { habit } = route.params || {};
  const { isDarkMode } = useTheme();
  const { showToast } = useAlert();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadLogs();
  }, [habit?.id]);

  const loadLogs = async () => {
    try {
      if (habit?.id) {
        const data = await getHabitLogs(habit.id);
        setLogs(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLog = async (data) => {
    try {
      await createHabitLog({ ...data, habit_id: habit.id });
      showToast('Log added', 'success');
      loadLogs();
    } catch (error) {
      showToast('Failed to add log', 'error');
    }
  };

  const handleDeleteLog = async (id) => {
    try {
      await deleteHabitLog(id);
      showToast('Log deleted', 'success');
      loadLogs();
    } catch (error) {
      showToast('Failed to delete log', 'error');
    }
  };

  if (loading) return <View className="flex-1 bg-[#F8FAFC] dark:bg-slate-950" />;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="Activity Logs" onBack={() => navigation.goBack()} />

      <View className="flex-1 px-6">
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <EmptyState message="No activity logs yet." icon={ClockIcon} />
          }
          renderItem={({ item }) => (
            <View className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-3 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                  item.is_completed ? 'bg-green-100 dark:bg-green-900/20' : 'bg-rose-100 dark:bg-rose-900/20'
                }`}>
                  {item.is_completed ? (
                    <CheckCircleIcon size={20} color="#16a34a" />
                  ) : (
                    <XMarkIcon size={20} color="#ef4444" />
                  )}
                </View>
                <View>
                  <Text className="text-slate-900 dark:text-white font-bold">
                    {new Date(item.log_date).toLocaleDateString()}
                  </Text>
                  <Text className="text-slate-500 dark:text-slate-400 text-xs">
                    {new Date(item.log_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-center">
                {item.value && (
                  <Text className="text-slate-900 dark:text-white font-bold mr-4">
                    {item.value}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => handleDeleteLog(item.id)}
                  className="p-2"
                >
                  <TrashIcon size={18} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-10 right-6 w-14 h-14 bg-indigo-600 rounded-full items-center justify-center shadow-lg shadow-indigo-300 z-50"
      >
        <PlusIcon size={28} color="white" />
      </TouchableOpacity>

      <AddLogModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddLog}
      />
    </SafeAreaView>
  );
};

// ==========================================
// STREAKS SCREEN
// ==========================================

export const HabitStreaks = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { habit } = route.params || {};
  const { isDarkMode } = useTheme();
  const { showToast } = useAlert();

  const [streakData, setStreakData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  
  const [currentStreak, setCurrentStreak] = useState('0');
  const [longestStreak, setLongestStreak] = useState('0');

  useEffect(() => {
    loadStreak();
  }, [habit?.id]);

  const loadStreak = async () => {
    try {
      if (habit?.id) {
        const data = await getHabitStreak(habit.id);
        setStreakData(data || { current_streak: 0, longest_streak: 0 });
        setCurrentStreak(data?.current_streak?.toString() || '0');
        setLongestStreak(data?.longest_streak?.toString() || '0');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateHabitStreak(habit.id, {
        current_streak: parseInt(currentStreak) || 0,
        longest_streak: parseInt(longestStreak) || 0,
      });
      showToast('Streak updated', 'success');
      setEditing(false);
      loadStreak();
    } catch (error) {
      showToast('Failed to update streak', 'error');
    }
  };

  if (loading) return <View className="flex-1 bg-[#F8FAFC] dark:bg-slate-950" />;

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] dark:bg-slate-950">
      <Header title="Streaks" onBack={() => navigation.goBack()} />

      <ScrollView className="flex-1 px-6">
        <View className="flex-row space-x-4 mb-6">
          <View className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-sm items-center">
            <View className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full items-center justify-center mb-3">
              <Text className="text-2xl">🔥</Text>
            </View>
            <Text className="text-4xl font-black text-slate-900 dark:text-white mb-1">
              {streakData?.current_streak || 0}
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">
              Current
            </Text>
          </View>

          <View className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-[28px] border border-slate-100 dark:border-slate-800 shadow-sm items-center">
            <View className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full items-center justify-center mb-3">
              <Text className="text-2xl">🏆</Text>
            </View>
            <Text className="text-4xl font-black text-slate-900 dark:text-white mb-1">
              {streakData?.longest_streak || 0}
            </Text>
            <Text className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">
              Longest
            </Text>
          </View>
        </View>

        {editing ? (
          <View className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6">
            <Text className="text-lg font-bold text-slate-900 dark:text-white mb-4">Edit Streaks</Text>
            
            <View className="mb-4">
              <Text className="text-slate-500 dark:text-slate-400 mb-2">Current Streak</Text>
              <TextInput
                value={currentStreak}
                onChangeText={setCurrentStreak}
                keyboardType="numeric"
                className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-slate-900 dark:text-white font-bold"
              />
            </View>

            <View className="mb-6">
              <Text className="text-slate-500 dark:text-slate-400 mb-2">Longest Streak</Text>
              <TextInput
                value={longestStreak}
                onChangeText={setLongestStreak}
                keyboardType="numeric"
                className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-slate-900 dark:text-white font-bold"
              />
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity 
                onPress={() => setEditing(false)}
                className="flex-1 bg-slate-100 dark:bg-slate-800 p-4 rounded-xl items-center"
              >
                <Text className="text-slate-900 dark:text-white font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleSave}
                className="flex-1 bg-indigo-600 p-4 rounded-xl items-center"
              >
                <Text className="text-white font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setEditing(true)}
            className="bg-indigo-600 p-4 rounded-2xl items-center shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            <Text className="text-white font-bold text-lg">Edit Streaks</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
