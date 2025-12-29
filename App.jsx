import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import SplashScreen from 'react-native-splash-screen';
import { db, runMigrations } from './src/db/client';
import { users } from './src/db/schema';

const StyledView = styled(View);
const StyledText = styled(Text);

function App() {
  const [dbReady, setDbReady] = useState(false);
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await runMigrations();
        await loadUsers();
        setDbReady(true);
      } catch (e) {
        console.error("DB Init Error:", e);
      } finally {
        SplashScreen.hide();
      }
    };
    init();
  }, []);

  const loadUsers = async () => {
    const allUsers = await db.select().from(users).all();
    setUserList(allUsers);
  };

  const addUser = async () => {
    if (!name || !email) return;
    setLoading(true);
    try {
      await db.insert(users).values({ name, email }).run();
      await loadUsers();
      setName('');
      setEmail('');
    } catch (e) {
      console.error("Add User Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
        <View className="flex-1">
          
          <View className="bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-700 w-full mb-6">
            <Text className="text-2xl font-bold text-white mb-4 text-center">
              Drizzle <Text className="text-sky-400">SQLite</Text>
            </Text>

            <View className="space-y-3">
              <TextInput 
                placeholder="Name"
                placeholderTextColor="#94a3b8"
                className="bg-slate-900 text-white p-4 rounded-xl border border-slate-700"
                value={name}
                onChangeText={setName}
              />
              <TextInput 
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                className="bg-slate-900 text-white p-4 rounded-xl border border-slate-700"
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
              />
              
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={addUser}
                disabled={loading || !dbReady}
                className={`py-4 rounded-xl shadow-lg ${loading || !dbReady ? 'bg-slate-700' : 'bg-sky-500'}`}
              >
                {loading ? <ActivityIndicator color="white" /> : (
                  <Text className="text-white text-center font-bold text-lg">Add User</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">
              Registered Users ({userList.length})
            </Text>

            {userList.length === 0 ? (
              <View className="bg-slate-800/30 p-8 rounded-2xl border border-dashed border-slate-700 items-center">
                <Text className="text-slate-500 italic">No users found in database</Text>
              </View>
            ) : (
              userList.map((user) => (
                <View key={user.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 mb-3 flex-row items-center">
                  <View className="bg-sky-500/20 w-10 h-10 rounded-full items-center justify-center mr-4">
                    <Text className="text-sky-400 font-bold">{user.name[0].toUpperCase()}</Text>
                  </View>
                  <View>
                    <Text className="text-white font-bold">{user.name}</Text>
                    <Text className="text-slate-400 text-xs">{user.email}</Text>
                  </View>
                </View>
              ))
            )}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
