import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { UserIcon, EnvelopeIcon } from 'react-native-heroicons/outline';
import BaseModal from '../../../common/components/BaseModal';
import ImageUploader from '../../../common/components/ImageUploader';

const EditProfileModal = ({ 
  visible, 
  onClose, 
  user, 
  onUpdateProfile 
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      await onUpdateProfile({
        ...data,
        profile_image: selectedImage
      });
      onClose();
    } catch (error) {
      console.log('Update profile failed', error);
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
          <Text className="text-slate-500 font-bold mb-2 ml-1">Full Name</Text>
          <View className={`flex-row items-center bg-slate-50 border ${errors.name ? 'border-rose-400 bg-rose-50' : 'border-slate-100'} rounded-2xl px-4 py-3.5`}>
            <UserIcon size={20} color={errors.name ? '#f43f5e' : '#64748b'} />
            <Controller
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="flex-1 ml-3 text-slate-900 font-medium text-base h-full"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your full name"
                  placeholderTextColor="#94a3b8"
                />
              )}
              name="name"
            />
          </View>
          {errors.name && <Text className="text-rose-500 text-xs font-bold mt-1 ml-1">{errors.name.message}</Text>}
        </View>

        {/* Email Input */}
        <View>
          <Text className="text-slate-500 font-bold mb-2 ml-1">Email Address</Text>
          <View className={`flex-row items-center bg-slate-50 border ${errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-100'} rounded-2xl px-4 py-3.5`}>
            <EnvelopeIcon size={20} color={errors.email ? '#f43f5e' : '#64748b'} />
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
                  className="flex-1 ml-3 text-slate-900 font-medium text-base h-full"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
          </View>
          {errors.email && <Text className="text-rose-500 text-xs font-bold mt-1 ml-1">{errors.email.message}</Text>}
        </View>

        <TouchableOpacity 
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className={`mt-4 p-4 rounded-2xl items-center shadow-lg shadow-indigo-200 ${loading ? 'bg-indigo-400' : 'bg-indigo-600'}`}
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
