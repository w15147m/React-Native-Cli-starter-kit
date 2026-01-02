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
  <View className="mb-3">
    <View className="relative">
      <View className="absolute left-4 top-3 z-10">
        <Icon size={24} color={isDarkMode ? "#94a3b8" : "#64748b"} />
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
