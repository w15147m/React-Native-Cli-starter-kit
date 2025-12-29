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
import { login as loginService } from '../../services/authServices';
import AuthLayout from '../../components/AuthLayout';

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginService(data.email, data.password);
      await login(response);
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      // Error already handled by authServices
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back!" 
      subtitle="Continue your habit journey and unlock new badges."
    >
      <View className="space-y-4">
        {/* Email Field */}
        <View>
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
                className={`bg-slate-50 text-slate-900 p-4 rounded-2xl border ${
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
          {errors.email && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Password Field */}
        <View>
          <View className="relative">
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Password must be at least 3 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-slate-50 text-slate-900 p-4 pr-12 rounded-2xl border ${
                    errors.password ? 'border-red-500' : 'border-slate-200'
                  }`}
                  placeholder="Enter your password"
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
              <Text className="text-xl">{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Login Button */}
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
              Log In with Email
            </Text>
          )}
        </TouchableOpacity>

        {/* Register Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-slate-500 text-base">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-[#6d28d9] font-bold text-base">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default Login;
