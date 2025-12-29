import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';
import AuthIconsGrid from './AuthIconsGrid';

const { height } = Dimensions.get('window');

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Background Decorative Grid from Separate Component */}
          <AuthIconsGrid />

          {/* Form Bottom Sheet Container */}
          <View 
            className="flex-1 bg-white rounded-t-[40px] -mt-20 px-8 pt-8 shadow-2xl pb-10 overflow-hidden"
            style={{ 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: -10 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 20, 
              elevation: 25,
              minHeight: height * 0.6
            }}
          >
            {/* Subtle Decorative Circles inside the card */}
            <View style={styles.cardCircle1} />
            <View style={styles.cardCircle2} />

            {/* Handle bar */}
            <View className="w-12 h-1.5 bg-slate-100 rounded-full self-center mb-8 z-10" />
            
            <Text className="text-3xl font-bold text-slate-900 mb-2 z-10">
              {title}
            </Text>
            <Text className="text-slate-500 text-lg mb-8 leading-6 z-10">
              {subtitle}
            </Text>

            <View className="z-10 flex-1">
              {children}
            </View>

            {/* Footer Branding */}
            <View className="mt-auto items-center z-10">
              <Text className="text-slate-400 text-xs text-center ">
                <Text className="text-slate-900 font-bold">Terms of Use</Text> and {' '}
                <Text className="text-slate-900 font-bold">Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardCircle1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f5f3ff', // Very light violet
    zIndex: 0,
  },
  cardCircle2: {
    position: 'absolute',
    bottom: 40,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0fdfa', // Very light teal
    zIndex: 0,
  }
});

export default AuthLayout;
