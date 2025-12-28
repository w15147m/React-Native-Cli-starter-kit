import { View, Text } from 'react-native';
import React from 'react';
import Two from './Two';

const One = () => {
  return (
    <View className="flex-1 justify-center items-center bg-slate-900 px-6">
      <View className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full">
        <Text className="text-2xl font-bold text-white text-center mb-6">Component One</Text>
        
        <View className="space-y-4">
          <Two name="Item 1" />
          <Two name="Item 2" />
          <Two name="Item 3" />
          <Two name="Item 4" />
        </View>
      </View>
    </View>
  );
};

export default One;
