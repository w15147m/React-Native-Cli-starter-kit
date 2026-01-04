import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { XMarkIcon, CheckIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../../context/ThemeContext';

const AddHabitLogModal = ({ visible, onClose, habit, onLog }) => {
  const { isDarkMode } = useTheme();
  const [value, setValue] = useState('');
  
  useEffect(() => {
    if (visible && habit) {
      if (habit.target_value) {
          setValue(habit.target_value.toString());
      } else {
        setValue('');
      }
    }
  }, [visible, habit]);

  const handleSubmit = () => {
    if (!value) return;
    onLog(habit, parseFloat(value));
    onClose();
    setValue('');
  };

  if (!habit) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-slate-900 dark:text-white">
              Log Progress
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"
            >
              <XMarkIcon size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="mb-6">
            <Text className="text-slate-500 dark:text-slate-400 mb-2 font-medium">
              {habit.habit_type === 'time' ? 'Minutes Spent' : 'Count Value'}
            </Text>
            <View className="flex-row items-center border border-slate-200 dark:border-slate-700 rounded-xl px-4 bg-slate-50 dark:bg-slate-800">
              <TextInput
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
                autoFocus
                placeholder={habit.habit_type === 'time' ? "e.g. 30" : "e.g. 10"}
                placeholderTextColor={isDarkMode ? '#64748b' : '#94a3b8'}
                className="flex-1 py-4 text-lg font-bold text-slate-900 dark:text-white"
              />
            </View>
            {habit.target_value && (
               <Text className="text-xs text-slate-400 mt-2">
                 Target: {habit.target_value} {habit.habit_type === 'time' ? 'mins' : ''}
               </Text>
            )}
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full bg-indigo-600 p-4 rounded-xl flex-row justify-center items-center space-x-2"
          >
            <CheckIcon size={20} color="white" />
            <Text className="text-white font-bold text-lg">Save Log</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddHabitLogModal;
