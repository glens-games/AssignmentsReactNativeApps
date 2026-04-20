import { useLocalStorage } from '@/data/localStorage';
import { useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CalendarModal } from '@/components/calendar-modal';
import { IndexFooter } from '@/components/index-footer';
import { SessionCard } from '@/components/session-card';
import { createCommonStyles } from "@/styles/common";
import { useAppTheme } from '@/styles/theme';

export default function Index() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const {data, createSession, deleteSession} = useLocalStorage();
  const {theme} = useAppTheme(data);
  const common = createCommonStyles(theme);

  const handleNewSession = () => {
    const session = createSession();
    router.push({pathname: '/session/[id]', params: {id: session.id}});
  };

  const handleSessionPress = (sessionId: string) => {
    router.push({pathname: '/session/[id]', params: {id: sessionId}});
  };

  const handleDateSelect = (day: any) => {
    const formatted = new Date(day.timestamp).toLocaleDateString();
    setSearchQuery(formatted);
    setShowCalendar(false);
  };

  const handleDeleteSession = (id: string) => {
    deleteSession(id);
  };

  return (
    <SafeAreaView style={common.container}>
      <FlatList
        data={data.sessions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SessionCard session={item}
            onPress={() => handleSessionPress(item.id)}
            onDelete={() => handleDeleteSession(item.id)} />
        )}
        ListEmptyComponent={<Text style={common.emptyText}>No sessions yet. Create one to get started!</Text>}
        contentContainerStyle={data.sessions.length === 0 ? {flexGrow: 1, justifyContent: 'center'} : {}}
      />
      <IndexFooter onNewSession={handleNewSession}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        onCalendarPress={() => setShowCalendar(true)}
      />
      <StatusBar style={'dark'} />
      <CalendarModal visible={showCalendar} onClose={() => setShowCalendar(false)} onDateSelect={handleDateSelect} />
    </SafeAreaView>
  );
}
