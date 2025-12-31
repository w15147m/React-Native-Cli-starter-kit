import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BaseModal = ({ 
  visible, 
  onClose, 
  title, 
  children 
}) => {
  const panY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      panY.setValue(0);
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120 || gestureState.vy > 0.5) {
          Animated.timing(panY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(onClose);
        } else {
          Animated.spring(panY, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-black/50">
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="flex-1"
          >
            <Animated.View 
              style={{ 
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '90%',
                transform: [{ translateY: panY }]
              }}
              className="bg-white rounded-t-[40px] shadow-2xl overflow-hidden px-6 pt-2 pb-10"
            >
              {/* Drag Handle */}
              <View 
                {...panResponder.panHandlers}
                className="w-full items-center py-4"
              >
                <View className="w-12 h-1.5 bg-slate-100 rounded-full" />
              </View>
              
              {/* Header - Fixed at top of modal */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-black text-slate-900">{title}</Text>
                <TouchableOpacity 
                  onPress={onClose}
                  className="p-2 rounded-full bg-slate-100"
                >
                  <XMarkIcon size={24} color="#64748b" />
                </TouchableOpacity>
              </View>

              {/* Content Container */}
              <ScrollView 
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {children}
              </ScrollView>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BaseModal;
