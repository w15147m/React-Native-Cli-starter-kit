import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Keyboard
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import BaseModal from '../../../common/components/BaseModal';

import { useTheme } from '../../../context/ThemeContext';

const PasswordInput = ({ 
  name, 
  placeholder, 
  showPass, 
  setShowPass, 
  rules,
  control,
  errors,
  isDarkMode
}) => (
  <View className="mb-4">
    <Text className="text-slate-500 dark:text-slate-400 font-bold mb-2 ml-1">{placeholder}</Text>
    <View className={`flex-row items-center bg-slate-50 dark:bg-slate-800 border ${errors[name] ? 'border-rose-400 dark:border-rose-500/50 bg-rose-50 dark:bg-rose-500/5' : 'border-slate-100 dark:border-slate-700'} rounded-2xl px-4 py-3.5`}>
      <LockClosedIcon size={20} color={errors[name] ? '#f43f5e' : (isDarkMode ? '#94a3b8' : '#64748b')} />
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="flex-1 ml-3 text-slate-900 dark:text-white font-medium text-base h-full"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#64748b"
            secureTextEntry={!showPass}
          />
        )}
        name={name}
      />
      <TouchableOpacity onPress={() => setShowPass(!showPass)}>
        {showPass ? (
          <EyeSlashIcon size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
        ) : (
          <EyeIcon size={20} color={isDarkMode ? '#94a3b8' : '#64748b'} />
        )}
      </TouchableOpacity>
    </View>
    {errors[name] && <Text className="text-rose-500 dark:text-rose-400 text-xs font-bold mt-1 ml-1">{errors[name].message}</Text>}
  </View>
);

const ChangePasswordModal = ({ visible, onClose, onChangePassword }) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onChangePassword(data.oldPassword, data.newPassword);
      reset();
      onClose();
    } catch (error) {
      console.log('Change password failed in modal', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Change Password"
    >
      <PasswordInput 
        name="oldPassword" 
        placeholder="Current Password" 
        showPass={showOldPass} 
        setShowPass={setShowOldPass}
        rules={{ required: 'Current password is required' }}
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />

      <PasswordInput 
        name="newPassword" 
        placeholder="New Password" 
        showPass={showNewPass} 
        setShowPass={setShowNewPass}
        rules={{ 
          required: 'New password is required',
          minLength: { value: 6, message: 'Must be at least 6 characters' }
        }}
        control={control}
        errors={errors}
        isDarkMode={isDarkMode}
      />

      <PasswordInput 
        name="confirmPassword" 
        placeholder="Confirm New Password" 
        showPass={showConfirmPass} 
        setShowPass={setShowConfirmPass}
        rules={{ 
          required: 'Please confirm new password',
          validate: value => value === newPassword || 'Passwords do not match'
        }}
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
          {loading ? 'Updating...' : 'Update Password'}
        </Text>
      </TouchableOpacity>
    </BaseModal>
  );
};

export default ChangePasswordModal;
