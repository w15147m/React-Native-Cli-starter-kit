import React from 'react';
import { View, Text, ScrollView, Dimensions, Platform, Image } from 'react-native';

const { height } = Dimensions.get('window');

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <View className="flex-1 bg-slate-100">
      {/* Background Decorative Grid */}
      <View style={{ height: height * 0.4 }} className="bg-slate-200 justify-center items-center overflow-hidden">
        <View className="flex-row flex-wrap justify-center opacity-40">
          {/* Mocking the avatar grid from reference image */}
          {Array(12).fill(0).map((_, i) => (
            <View 
              key={i} 
              className="w-20 h-20 m-2 rounded-2xl"
              style={{ 
                backgroundColor: ['#e9d5ff', '#fed7aa', '#fbcfe8', '#ccfbf1', '#dcfce7', '#d9f99d'][i % 6] 
              }} 
            />
          ))}
        </View>
        <View className="absolute inset-0 bg-slate-200/20" />
      </View>

      {/* Form Bottom Sheet Container */}
      <View 
        className="flex-1 bg-white rounded-t-[40px] -mt-20 px-8 pt-8 shadow-2xl"
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 20 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {/* Handle bar */}
          <View className="w-12 h-1.5 bg-slate-200 rounded-full self-center mb-8" />
          
          <Text className="text-3xl font-bold text-slate-900 mb-2">
            {title}
          </Text>
          <Text className="text-slate-500 text-lg mb-8 leading-6">
            {subtitle}
          </Text>

          {children}

          {/* Footer Branding */}
          <View className="mt-8 mb-12 items-center">
            <Text className="text-slate-400 text-xs">
              By continuing, you agree to Ascend's <Text className="text-slate-900 font-bold">Terms of Use</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AuthLayout;
