import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SparklesIcon, DocumentTextIcon } from 'react-native-heroicons/outline';
import BaseModal from '../../../common/components/BaseModal';
import IconPicker from './IconPicker';
import { useTheme } from '../../../context/ThemeContext';

const FormInput = ({
  name,
  placeholder,
  icon: Icon,
  control,
  errors,
  rules,
  multiline = false,
  isDarkMode,
}) => (
  <View className="mb-3">
    <View className="relative">
      <View className="absolute left-4 top-3 z-10">
        <Icon size={24} color={isDarkMode ? '#94a3b8' : '#64748b'} />
      </View>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 rounded-2xl border ${
              errors[name] ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
            } ${multiline ? 'h-24' : ''}`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#64748b"
            keyboardAppearance={isDarkMode ? 'dark' : 'light'}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
          />
        )}
        name={name}
      />
    </View>
    {errors[name] && (
      <Text className="text-red-500 text-sm mt-1 ml-2">
        {errors[name].message}
      </Text>
    )}
  </View>
);

const EditHabitModal = ({ visible, onClose, habit, onUpdateHabit }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(habit?.icon || '');
  const [habitType, setHabitType] = useState(habit?.habit_type || 'boolean');
  const [targetValue, setTargetValue] = useState(habit?.target_value?.toString() || '');

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: habit?.title || '',
      description: habit?.description || '',
    },
  });

  useEffect(() => {
    if (habit) {
      reset({
        title: habit.title,
        description: habit.description,
      });
      setSelectedIcon(habit.icon);
      setHabitType(habit.habit_type || 'boolean');
      setTargetValue(habit.target_value?.toString() || '');
    }
  }, [habit, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onUpdateHabit({ 
        ...data, 
        icon: selectedIcon,
        habit_type: habitType,
        target_value: (habitType === 'count' || habitType === 'time') ? parseInt(targetValue) : null
      });
      reset();
      setSelectedIcon('');
      onClose();
    } catch (error) {
      console.log('Update habit failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal visible={visible} onClose={onClose} title="Edit Habit">
      <FormInput
        name="title"
        placeholder="Habit Title"
        icon={SparklesIcon}
        rules={{ required: 'Habit title is required' }}
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />

      <FormInput
        name="description"
        placeholder="Description"
        icon={DocumentTextIcon}
        control={control}
        errors={errors}
        multiline={true}
        isDarkMode={isDarkMode}
      />

      {/* Habit Type Selector */}
      <View className="mb-4">
        <Text className="text-slate-900 dark:text-white font-bold mb-2 ml-1">Habit Type</Text>
        <View className="flex-row space-x-2">
          {[
            { id: 'boolean', label: 'Yes/No' },
            { id: 'count', label: 'Numeric' },
            { id: 'time', label: 'Timer' }
          ].map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setHabitType(type.id)}
              className={`flex-1 p-3 rounded-xl border ${
                habitType === type.id 
                  ? 'bg-indigo-600 border-indigo-600' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <Text className={`text-center font-bold ${
                habitType === type.id ? 'text-white' : 'text-slate-900 dark:text-white'
              }`}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Target Value Input (Conditional) */}
      {(habitType === 'count' || habitType === 'time') && (
        <View className="mb-4">
          <Text className="text-slate-900 dark:text-white font-bold mb-2 ml-1">
            {habitType === 'count' ? 'Target Value (e.g. 10 reps)' : 'Target Minutes (e.g. 30)'}
          </Text>
          <View className="relative">
             <View className="absolute left-4 top-3 z-10">
               {/* No View wrapper needed for simple icon if not already wrapped elsewhere, 
                   but FormInput used it. Here we reuse the structure or import TagIcon if available */}
               {/* Note: TagIcon was not imported in EditHabitModal originally. 
                   I need to make sure it is imported or use another icon.
                   Checking import... It was only SparklesIcon and DocumentTextIcon.
                   I will add TagIcon import in a separate call or just use a generic icon view for now if import is tricky
                   Actually I can't change import in this block easily since it is at top.
                   I'll assume I can add it or just use SparklesIcon as placeholder or no icon.
                   Better: I'll use DocumentTextIcon again or just text.
                   Wait, I should check libraries. 
                   I will use the same structure but without the icon if I didn't import it.
                   Actually, let's fix imports first or assume user has it.
                   The prompt said "modify EditHabitModal".
                   I'll use DocumentTextIcon for now to be safe, or just no icon.
                   Let's check imports again.
               */}
               <DocumentTextIcon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
             </View>
             <TextInput
              onChangeText={setTargetValue}
              value={targetValue}
              placeholder={habitType === 'count' ? "Target Value" : "Target Minutes"}
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              className={`bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 pl-12 rounded-2xl border border-slate-200 dark:border-slate-800`}
            />
          </View>
        </View>
      )}

      <IconPicker
        selectedIcon={selectedIcon}
        onSelectIcon={setSelectedIcon}
        isDarkMode={isDarkMode}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        className={`mt-4 p-4 rounded-2xl items-center shadow-lg ${
          loading ? 'bg-indigo-400' : 'bg-indigo-600 shadow-indigo-200 dark:shadow-none'
        }`}
      >
        <Text className="text-white font-bold text-lg">
          {loading ? 'Updating...' : 'Update Habit'}
        </Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export default EditHabitModal;
