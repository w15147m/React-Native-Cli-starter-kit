import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  Keyboard
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SparklesIcon, DocumentTextIcon, TagIcon } from 'react-native-heroicons/outline';
import BaseModal from '../../../common/components/BaseModal';

import { useTheme } from '../../../context/ThemeContext';

const FormInput = ({ 
  name, 
  placeholder, 
  icon: Icon,
  control,
  errors,
  rules,
  multiline = false,
  isDarkMode
}) => (
  <View className="mb-4">
    <Text className="text-slate-500 dark:text-slate-400 font-bold mb-2 ml-1">{placeholder}</Text>
    <View className={`flex-row items-start bg-slate-50 dark:bg-slate-800 border ${errors[name] ? 'border-rose-400 dark:border-rose-500/50 bg-rose-50 dark:bg-rose-500/5' : 'border-slate-100 dark:border-slate-700'} rounded-2xl px-4 py-3.5`}>
      <View className="mt-1">
        <Icon size={20} color={errors[name] ? '#f43f5e' : (isDarkMode ? '#94a3b8' : '#64748b')} />
      </View>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`flex-1 ml-3 text-slate-900 dark:text-white font-medium text-base ${multiline ? 'h-24' : 'h-full'}`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#64748b"
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
          />
        )}
        name={name}
      />
    </View>
    {errors[name] && <Text className="text-rose-500 dark:text-rose-400 text-xs font-bold mt-1 ml-1">{errors[name].message}</Text>}
  </View>
);

const CreateHabitModal = ({ visible, onClose, onCreate }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      icon: '',
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onCreate(data);
      reset();
      onClose();
    } catch (error) {
      console.log('Create habit failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="New Habit"
    >
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

      <FormInput 
        name="icon" 
        placeholder="Icon Name (e.g. fire, book)" 
        icon={TagIcon}
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />

      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        className={`mt-4 p-4 rounded-2xl items-center shadow-lg ${loading ? 'bg-indigo-400' : 'bg-indigo-600 shadow-indigo-200 dark:shadow-none'}`}
      >
        <Text className="text-white font-bold text-lg">
          {loading ? 'Creating...' : 'Create Habit'}
        </Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export default CreateHabitModal;
