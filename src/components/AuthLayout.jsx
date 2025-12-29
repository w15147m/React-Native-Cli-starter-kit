import React from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';

const { height } = Dimensions.get('window');

// Requiring icons with cleaned filenames (no spaces)
const icons = [
  require('../assets/3D-Icon/Rocket-small.png'),
  require('../assets/3D-Icon/Calender-small.png'),
  require('../assets/3D-Icon/Clock-small.png'),
  require('../assets/3D-Icon/Target-small.png'),
  require('../assets/3D-Icon/Brief_case_bag-small.png'),
  require('../assets/3D-Icon/Credit_Card-small.png'),
  require('../assets/3D-Icon/Folder-small.png'),
  require('../assets/3D-Icon/Magnifying_Glass-small.png'),
  require('../assets/3D-Icon/Smartphone-small.png'),
  require('../assets/3D-Icon/Safe_Box-small.png'),
  require('../assets/3D-Icon/Coin_Bag-small.png'),
  require('../assets/3D-Icon/Desktop_computer_graph-small.png'),
  require('../assets/3D-Icon/Bill_Printers-small.png'),
  require('../assets/3D-Icon/Draf_Note-small.png'),
  require('../assets/3D-Icon/Mail_Bill_Payment-small.png'),
  require('../assets/3D-Icon/Money_Coin-small.png'),
  require('../assets/3D-Icon/Note_Calculator-small.png'),
  require('../assets/3D-Icon/Projector-small.png'),
  require('../assets/3D-Icon/Rolls_of_Paper-small.png'),
  require('../assets/3D-Icon/Speaker-small.png'),
];

// Aesthetic background colors from the reference
const bgColors = ['#fbcfe8', '#e9d5ff', '#fed7aa', '#ccfbf1', '#dcfce7', '#d9f99d'];

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Background Decorative Grid */}
      <View style={{ height: height * 0.48 }} className="bg-slate-50 justify-center items-center overflow-hidden">
        <View className="flex-row flex-wrap justify-center items-center px-2">
          {icons.map((source, i) => (
            <View 
              key={i} 
              className="w-[100px] h-[100px] m-1 rounded-[24px] items-center justify-center shadow-sm"
              style={{ 
                backgroundColor: bgColors[i % bgColors.length]
              }} 
            >
              <Image 
                source={source} 
                style={{ width: 70, height: 70 }} 
                resizeMode="contain"
                fadeDuration={0}
              />
            </View>
          ))}
        </View>
        
        {/* Subtle overlay to fade out the top characters */}
        <View className="absolute inset-0 bg-slate-50/10" />
      </View>

      {/* Form Bottom Sheet Container */}
      <View 
        className="flex-1 bg-white rounded-t-[40px] -mt-20 px-8 pt-8 shadow-2xl"
        style={{ 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: -10 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 20, 
          elevation: 25 
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
          {/* Handle bar */}
          <View className="w-12 h-1.5 bg-slate-100 rounded-full self-center mb-8" />
          
          <Text className="text-3xl font-bold text-slate-900 mb-2">
            {title}
          </Text>
          <Text className="text-slate-500 text-lg mb-8 leading-6">
            {subtitle}
          </Text>

          {children}

          {/* Footer Branding */}
          <View className="mt-8 mb-12 items-center">
            <Text className="text-slate-400 text-xs text-center leading-5 px-4">
              By continuing, you agree to Ascend's {' '}
              <Text className="text-slate-900 font-bold">Terms of Use</Text> and {' '}
              <Text className="text-slate-900 font-bold">Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AuthLayout;
