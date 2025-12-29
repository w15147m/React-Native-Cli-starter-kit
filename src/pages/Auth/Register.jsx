import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { register as registerService } from '../../services/authServices';
import AuthLayout from '../../components/AuthLayout';
import { EyeIcon, EyeSlashIcon, UserIcon, EnvelopeIcon, LockClosedIcon } from 'react-native-heroicons/outline';

const Register = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerService({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      
      Alert.alert('Success', 'Registration successful! Please login.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      // Error already handled by authServices
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Get Started" 
      subtitle="Build your habits Unlock  potential."
    >
      <View className="space-y-4">
        {/* Name Field */}
        <View>
          <View className="relative">
            <View className="absolute left-4 top-4 z-10">
              <UserIcon size={24} color="#94a3b8" />
            </View>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 text-slate-900 p-4 pl-12 rounded-2xl border ${
                    errors.name ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Full Name"
                  placeholderTextColor="#94a3b8"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.name && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.name.message}
            </Text>
          )}
        </View>

        {/* Email Field */}
        <View>
          <View className="relative">
            <View className="absolute left-4 top-4 z-10">
              <EnvelopeIcon size={24} color="#94a3b8" />
            </View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 text-slate-900 p-4 pl-12 rounded-2xl border ${
                    errors.email ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="You@example.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Password Field */}
        <View>
          <View className="relative">
            <View className="absolute left-4 top-4 z-10">
              <LockClosedIcon size={24} color="#94a3b8" />
            </View>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 text-slate-900 p-4 pl-12 pr-12 rounded-2xl border ${
                    errors.password ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Create a password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <EyeSlashIcon size={24} color="#6d28d9" />
              ) : (
                <EyeIcon size={24} color="#94a3b8" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className={`py-4 rounded-2xl mt-2 ${
            loading ? 'bg-indigo-400' : 'bg-[#6d28d9]'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              Continue with Email
            </Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-slate-500 text-base">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-[#6d28d9] font-bold text-base">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default Register;
