import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { UserIcon, EnvelopeIcon } from 'react-native-heroicons/outline';
import { useAlert } from '../../../context/AlertContext';
import BaseModal from '../../../common/components/BaseModal';
import ImageUploader from '../../../common/components/ImageUploader';

import { useTheme } from '../../../context/ThemeContext';

const EditProfileModal = ({ 
  visible, 
  onClose, 
  user, 
  onUpdateProfile 
}) => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { showToast } = useAlert();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
    }
  });

  useEffect(() => {
    if (user?.user && visible) {
      setValue('name', user.user.name || '');
      setValue('email', user.user.email || '');
      setSelectedImage(user.user.profile_image || null);
    }
  }, [user, visible, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Actually call the update function passed as prop
      await onUpdateProfile({ ...data, profile_image: selectedImage });
      onClose();
    } catch (error) {
      console.log('Update profile failed', error);
      showToast(error.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Edit Profile"
    >
      <View className="space-y-6">
        {/* Profile Image */}
        <View className="items-center mb-2">
          <ImageUploader
            imageUri={selectedImage}
            onImageSelected={setSelectedImage}
            size={100}
          />
        </View>

        {/* Name Input */}
        <View>
          <Text className="text-slate-500 dark:text-slate-400 font-bold mb-2 ml-1">Full Name</Text>
          <View className={`flex-row items-center bg-slate-50 dark:bg-slate-800 border ${errors.name ? 'border-rose-400 dark:border-rose-500/50 bg-rose-50 dark:bg-rose-500/5' : 'border-slate-100 dark:border-slate-700'} rounded-2xl px-4 py-3.5`}>
            <UserIcon size={20} color={errors.name ? '#f43f5e' : (isDarkMode ? '#94a3b8' : '#64748b')} />
            <Controller
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 ml-3 text-slate-900 dark:text-white font-medium text-base h-full"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your full name"
                  placeholderTextColor="#64748b"
                />
              )}
              name="name"
            />
          </View>
          {errors.name && <Text className="text-rose-500 dark:text-rose-400 text-xs font-bold mt-1 ml-1">{errors.name.message}</Text>}
        </View>

        {/* Email Input */}
        <View>
          <Text className="text-slate-500 dark:text-slate-400 font-bold mb-2 ml-1">Email Address</Text>
          <View className={`flex-row items-center bg-slate-50 dark:bg-slate-800 border ${errors.email ? 'border-rose-400 dark:border-rose-500/50 bg-rose-50 dark:bg-rose-500/5' : 'border-slate-100 dark:border-slate-700'} rounded-2xl px-4 py-3.5`}>
            <EnvelopeIcon size={20} color={errors.email ? '#f43f5e' : (isDarkMode ? '#94a3b8' : '#64748b')} />
            <Controller
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 ml-3 text-slate-900 dark:text-white font-medium text-base h-full"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email"
                  placeholderTextColor="#64748b"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
          </View>
          {errors.email && <Text className="text-rose-500 dark:text-rose-400 text-xs font-bold mt-1 ml-1">{errors.email.message}</Text>}
        </View>

        <TouchableOpacity 
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className={`mt-4 p-4 rounded-2xl items-center shadow-lg ${loading ? 'bg-indigo-400' : 'bg-indigo-600 shadow-indigo-200 dark:shadow-none'}`}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

export default EditProfileModal;
