import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useCounterStore } from '../zustand/store';

const Two = ({ name = "Item" }) => {
    const { count, increment, decrement } = useCounterStore();
    
    return (
        <View className="bg-slate-700/50 p-4 rounded-xl flex-row items-center justify-between mb-3 border border-slate-600">
            <View>
                <Text className="text-slate-400 text-xs font-bold uppercase tracking-tighter">{name}</Text>
                <Text className="text-white text-xl font-bold">Count: {count}</Text>
            </View>
            
            <View className="flex-row space-x-2">
                <TouchableOpacity 
                    onPress={decrement}
                    className="bg-slate-600 w-10 h-10 rounded-full items-center justify-center active:bg-slate-500"
                >
                    <Text className="text-white text-xl font-bold">-</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={increment}
                    className="bg-sky-500 w-10 h-10 rounded-full items-center justify-center active:bg-sky-400"
                >
                    <Text className="text-white text-xl font-bold">+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Two;
