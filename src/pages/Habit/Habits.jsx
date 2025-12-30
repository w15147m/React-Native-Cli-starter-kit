import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  TextInput 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  Bars3Icon,
  CheckCircleIcon,
  PlusIcon
} from 'react-native-heroicons/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from 'react-native-heroicons/solid';
import CreateHabitModal from './components/CreateHabitModal';

const dummyHabits = [
  { id: 1, title: 'Drink Water', description: 'Stay hydrated by drinking at least 6-8 glasses of water daily.' },
  { id: 2, title: 'Read a Book', description: 'Spend at least 10 minutes reading to feed your mind daily.' },
  { id: 3, title: 'Walk', description: 'Go for a short walk to boost your mood and energy.' },
  { id: 4, title: 'Breathe Deeply', description: 'Take a moment to relax and reset with mindful, deep breaths.' },
  { id: 5, title: 'Focus', description: 'Train your mind to stay present and eliminate distractions.' },
  { id: 6, title: 'Study or Working', description: 'Build a consistent study or work routine to stay productive and focused.' },
];

const Habits = () => {
  const navigation = useNavigation();
  const [selectedHabitId, setSelectedHabitId] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const handleCreateHabit = async (data) => {
    console.log('New Habit Data:', data);
    // TODO: Implement actual database creation
  };

  const handleSave = () => {
    if (selectedHabitId) {
      console.log('Saved Habit ID:', selectedHabitId);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <View className="flex-1 relative">
        {/* Header - Home Style */}
        <View className="flex-row justify-between items-center px-6 pt-4 mb-6">
          <View>
            <Text className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
              Welcome Back
            </Text>
            <Text className="text-2xl font-black text-slate-900">Habits</Text>
          </View>
          <TouchableOpacity 
            className="p-2 rounded-xl bg-white shadow-sm border border-slate-100"
            onPress={() => navigation.openDrawer()}
          >
            <Bars3Icon size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="space-y-4 pb-10">
            {dummyHabits.map((habit) => (
              <TouchableOpacity
                key={habit.id}
                onPress={() => setSelectedHabitId(habit.id)}
                className={`bg-white p-4 rounded-2xl border ${selectedHabitId === habit.id ? 'border-indigo-600 bg-indigo-50/10' : 'border-slate-100'} shadow-sm flex-row items-center justify-between`}
              >
                <View className="flex-1 pr-4">
                  <Text className="text-slate-900 font-bold text-base mb-1">{habit.title}</Text>
                  <Text className="text-slate-500 text-sm leading-5">{habit.description}</Text>
                </View>
                <View>
                  {selectedHabitId === habit.id ? (
                    <CheckCircleIconSolid size={28} color="#4f46e5" />
                  ) : (
                    <View className="w-7 h-7 rounded-full border-2 border-slate-200" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
