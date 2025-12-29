import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { login as loginService } from '../../services/authServices';

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  
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
      // Navigation will be handled by AppNavigator based on auth state
    } catch (error) {
      // Error already handled by authServices
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-900"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1"
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="mb-8">
            <View className="bg-sky-500/20 w-20 h-20 rounded-2xl items-center justify-center self-center mb-6">
              <Text className="text-4xl">🔐</Text>
            </View>
            <Text className="text-3xl font-bold text-white text-center mb-2">
              Welcome Back
            </Text>
            <Text className="text-slate-400 text-center">
              Sign in to continue
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* Email Field */}
            <View>
              <Text className="text-slate-300 mb-2 font-medium">Email</Text>
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
                    className={`bg-slate-800 text-white p-4 rounded-xl border ${
                      errors.email ? 'border-red-500' : 'border-slate-700'
                    }`}
                    placeholder="Enter your email"
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
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Password Field */}
            <View>
              <Text className="text-slate-300 mb-2 font-medium">Password</Text>
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
                    className={`bg-slate-800 text-white p-4 rounded-xl border ${
                      errors.password ? 'border-red-500' : 'border-slate-700'
                    }`}
                    placeholder="Enter your password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              className={`py-4 rounded-xl mt-4 ${
                loading ? 'bg-slate-700' : 'bg-sky-500'
              }`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-bold text-lg">
                  Login
                </Text>
              )}
            </TouchableOpacity>

            {/* Register Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-slate-400">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-sky-400 font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
