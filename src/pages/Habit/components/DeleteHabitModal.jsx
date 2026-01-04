import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { ExclamationTriangleIcon } from 'react-native-heroicons/outline';
import BaseModal from '../../../common/components/BaseModal';
import { useTheme } from '../../../context/ThemeContext';

const DeleteHabitModal = ({ visible, onClose, onDeleteHabit }) => {
  const { isDarkMode } = useTheme();

  const handleDelete = () => {
    onDeleteHabit();
    onClose();
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="Delete Habit">
      <View className="items-center py-4">
        <View className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full items-center justify-center mb-4">
          <ExclamationTriangleIcon size={32} color="#ef4444" />
        </View>

        <Text className="text-slate-900 dark:text-white font-bold text-lg mb-2 text-center">
          Delete this habit?
        </Text>

        <Text className="text-slate-500 dark:text-slate-400 text-center mb-6 px-4">
          This action cannot be undone. All associated schedules, logs, and streaks will be permanently deleted.
        </Text>

        <View className="flex-row space-x-3 w-full">
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl items-center"
          >
            <Text className="text-slate-900 dark:text-white font-bold">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDelete}
            className="flex-1 bg-rose-500 p-4 rounded-2xl items-center"
          >
            <Text className="text-white font-bold">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

export default DeleteHabitModal;
