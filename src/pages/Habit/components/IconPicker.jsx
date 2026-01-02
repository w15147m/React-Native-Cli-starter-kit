import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Icon emoji list - simple and guaranteed to work
const ICON_EMOJIS = [
  { id: 1, emoji: '💧', name: 'Water Drop', value: 'water' },
  { id: 2, emoji: '📚', name: 'Books', value: 'books' },
  { id: 3, emoji: '🏃', name: 'Running', value: 'running' },
  { id: 4, emoji: '🧘', name: 'Meditation', value: 'meditation' },
  { id: 5, emoji: '💪', name: 'Strength', value: 'strength' },
  { id: 6, emoji: '🎯', name: 'Target', value: 'target' },
  { id: 7, emoji: '⏰', name: 'Time', value: 'time' },
  { id: 8, emoji: '✍️', name: 'Writing', value: 'writing' },
  { id: 9, emoji: '🎨', name: 'Art', value: 'art' },
  { id: 10, emoji: '🎵', name: 'Music', value: 'music' },
  { id: 11, emoji: '🍎', name: 'Healthy Food', value: 'food' },
  { id: 12, emoji: '😴', name: 'Sleep', value: 'sleep' },
  { id: 13, emoji: '🔥', name: 'Fire', value: 'fire' },
  { id: 14, emoji: '⭐', name: 'Star', value: 'star' },
  { id: 15, emoji: '💡', name: 'Idea', value: 'idea' },
  { id: 16, emoji: '🌱', name: 'Growth', value: 'growth' },
  { id: 17, emoji: '🎓', name: 'Education', value: 'education' },
  { id: 18, emoji: '💻', name: 'Coding', value: 'coding' },
  { id: 19, emoji: '🏋️', name: 'Gym', value: 'gym' },
  { id: 20, emoji: '🚴', name: 'Cycling', value: 'cycling' },
  { id: 21, emoji: '🧠', name: 'Brain', value: 'brain' },
  { id: 22, emoji: '❤️', name: 'Heart', value: 'heart' },
  { id: 23, emoji: '🌟', name: 'Sparkle', value: 'sparkle' },
  { id: 24, emoji: '🎪', name: 'Fun', value: 'fun' },
];

const IconPicker = ({ selectedIcon, onSelectIcon, isDarkMode }) => {
  // Calculate width for exactly 4 icons per row
  // Container has padding, so we use 23% width for each icon (4 x 23% = 92%, leaving 8% for gaps)
  const iconWidth = '23%';
  
  return (
    <View className="mb-3">
      <Text className="text-slate-500 dark:text-slate-400 text-sm mb-2 ml-1">
        Select Icon
      </Text>
      <ScrollView 
        className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2"
        style={{ maxHeight: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between">
          {ICON_EMOJIS.map((icon) => (
            <TouchableOpacity
              key={icon.id}
              onPress={() => onSelectIcon(icon.value)}
              className={`mb-2 rounded-xl items-center justify-center ${
                selectedIcon === icon.value
                  ? 'bg-indigo-500 border-2 border-indigo-600'
                  : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700'
              }`}
              style={{ width: iconWidth, aspectRatio: 1 }}
            >
              <Text style={{ fontSize: 32 }}>{icon.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default IconPicker;
