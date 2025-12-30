import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { XMarkIcon, SparklesIcon, DocumentTextIcon, TagIcon } from 'react-native-heroicons/outline';

const FormInput = ({ 
  name, 
  placeholder, 
  icon: Icon,
  control,
  errors,
  rules,
  multiline = false
}) => (
  <View className="mb-4">
    <Text className="text-slate-500 font-bold mb-2 ml-1">{placeholder}</Text>
    <View className={`flex-row items-start bg-slate-50 border ${errors[name] ? 'border-rose-400 bg-rose-50' : 'border-slate-100'} rounded-2xl px-4 py-3.5`}>
      <View className="mt-1">
        <Icon size={20} color={errors[name] ? '#f43f5e' : '#64748b'} />
      </View>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`flex-1 ml-3 text-slate-900 font-medium text-base ${multiline ? 'h-24' : 'h-full'}`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#94a3b8"
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
          />
        )}
        name={name}
      />
    </View>
    {errors[name] && <Text className="text-rose-500 text-xs font-bold mt-1 ml-1">{errors[name].message}</Text>}
  </View>
);

const CreateHabitModal = ({ visible, onClose, onCreate }) => {
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-black/50 pt-24">
          <View className="flex-1 bg-white rounded-t-[32px] overflow-hidden">
            {/* Header - Fixed at top of modal */}
            <View className="flex-row justify-between items-center p-6 border-b border-slate-50">
              <Text className="text-2xl font-black text-slate-900">New Habit</Text>
              <TouchableOpacity 
                onPress={onClose}
                className="p-2 rounded-full bg-slate-100"
              >
                <XMarkIcon size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {/* Content Container with Keyboard Handling */}
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              className="flex-1"
            >
              <ScrollView 
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
              >
                <FormInput 
                  name="title" 
                  placeholder="Habit Title" 
                  icon={SparklesIcon}
                  rules={{ required: 'Habit title is required' }}
                  control={control}
                  errors={errors}
                />

                <FormInput 
                  name="description" 
                  placeholder="Description" 
                  icon={DocumentTextIcon}
                  control={control}
                  errors={errors}
                  multiline={true}
                />

                <FormInput 
                  name="icon" 
                  placeholder="Icon Name (e.g. fire, book)" 
                  icon={TagIcon}
                  control={control}
                  errors={errors}
                />

                <TouchableOpacity 
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                  className={`mt-4 p-4 rounded-2xl items-center shadow-lg shadow-indigo-200 ${loading ? 'bg-indigo-400' : 'bg-indigo-600'}`}
                >
                  <Text className="text-white font-bold text-lg">
                    {loading ? 'Creating...' : 'Create Habit'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateHabitModal;
