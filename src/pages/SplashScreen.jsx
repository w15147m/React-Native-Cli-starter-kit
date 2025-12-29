import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StatusBar, Platform } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-[#6d28d9] justify-center items-center">
      <StatusBar hidden />
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className="items-center"
      >
        <Text
          style={{ fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' }}
          className="text-7xl font-black text-white tracking-tighter"
        >
          Ascend
        </Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
