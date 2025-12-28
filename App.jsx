import React, { useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import SplashScreen from 'react-native-splash-screen';

const StyledView = styled(View);
const StyledText = styled(Text);

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1 justify-center items-center">
          
          <View className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-sm">
            <View className="bg-sky-500/20 w-20 h-20 rounded-2xl items-center justify-center self-center mb-6">
              <Text className="text-4xl">🚀</Text>
            </View>

            <Text className="text-3xl font-bold text-white text-center mb-2">
              NativeWind <Text className="text-sky-400">Ready</Text>
            </Text>
            
            <View className="h-1 w-16 bg-sky-500 rounded-full self-center mb-6" />
            
            <Text className="text-slate-400 text-center text-lg leading-relaxed mb-8">
              This project is now simplified to a single page. You can start building your app here!
            </Text>

            <TouchableOpacity 
              activeOpacity={0.7}
              className="bg-sky-500 py-4 rounded-xl shadow-lg shadow-sky-500/50"
            >
              <Text className="text-white text-center font-bold text-lg">Get Started</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-12 flex-row space-x-4">
            <View className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                RN 0.74.3
              </Text>
            </View>
            <View className="bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                v2 stable
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
