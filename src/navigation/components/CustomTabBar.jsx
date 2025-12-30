import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View 
      className="bg-white p-2 rounded-t-[30px] flex-row items-center px-8 shadow-2xl border-t border-slate-50 absolute bottom-0 left-0 right-0"
      style={{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 30,
        paddingBottom: 10
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        
        // Hide tab if specific option is set
        if (options.tabBarItemStyle?.display === 'none') return null;

        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
             navigation.navigate(route.name);
          }
        };

        const Icon = isFocused ? options.tabBarIconActive : options.tabBarIcon;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            className={`flex-1 items-center justify-center ${isFocused ? 'bg-indigo-50/80 rounded-xl py-1.5 px-2' : ''}`}
            style={isFocused ? { maxWidth: 80 } : {}}
          >
            <Icon size={24} color={isFocused ? '#6366f1' : '#94a3b8'} />
            <Text className={`text-[9px] font-bold mt-1 ${isFocused ? 'text-indigo-600' : 'text-slate-400'}`}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
