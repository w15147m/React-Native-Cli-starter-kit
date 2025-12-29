import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  StatusBar, 
  Image, 
  Dimensions,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const rocketAnim = useRef(new Animated.Value(100)).current;
  const rocketRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations for a premium feel
    Animated.sequence([
      // First, fade in the background elements and the rocket
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(rocketAnim, {
          toValue: 0,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      // Then, slide the text up slightly
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtle rocket floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rocketRotate, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rocketRotate, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rocketRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-5deg', '5deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Decorative background circles */}
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            { translateY: rocketAnim },
            { rotate: rotate }
          ],
        }}
        className="mb-8"
      >
        <Image 
          source={require('../assets/3D-Icon/Rocket-small.png')}
          style={{ width: 180, height: 180 }}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="items-center"
      >
        <Text className="text-white text-6xl font-black tracking-tighter shadow-2xl">
          ascend
        </Text>
        <View className="h-1.5 w-12 bg-indigo-400/50 rounded-full mt-4" />
        <Text className="text-indigo-200/60 mt-4 font-medium tracking-widest uppercase text-[10px]">
          Level Up Your Life
        </Text>
      </Animated.View>

      {/* Subtle bottom text */}
      <View className="absolute bottom-12 items-center w-full">
        <Text className="text-indigo-300/30 text-[10px] uppercase font-bold tracking-[4px]">
          v 1.0.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6d28d9', // Brand Purple
    justifyContent: 'center',
    itemsCenter: 'center',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: '#4c1d95', // Deeper base purple
    justifyContent: 'center',
    alignItems: 'center',
  },
  topCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#7c3aed',
    opacity: 0.3,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#5b21b6',
    opacity: 0.4,
  }
});

export default SplashScreen;
