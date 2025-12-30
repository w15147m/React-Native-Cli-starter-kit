import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';

const BaseModal = ({ 
  visible, 
  onClose, 
  title, 
  children 
}) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`flex-1 bg-black/50 ${keyboardVisible ? 'pt-5' : 'pt-24'}`}>
          <View className="flex-1 bg-white rounded-t-[32px] overflow-hidden">
            {/* Header - Fixed at top of modal */}
            <View className="flex-row justify-between items-center p-6 border-b border-slate-50">
              <Text className="text-2xl font-black text-slate-900">{title}</Text>
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
                {children}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BaseModal;
