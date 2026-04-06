import { useLocalStorage } from '@/data/localStorage';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { Calendar } from "react-native-calendars";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { IndexFooter } from '@/components/index-footer';
import { IndexHeader } from '@/components/index-header';
import { createCommonStyles } from "@/styles/common";
import { theme } from '@/styles/theme';
import { SessionCard } from '@/components/session-card';
import { CalendarModal } from '@/components/calendar-modal';

export default function Index() {
  const router = useRouter();
  const {data, createSession} = useLocalStorage();

  const [searchQuery, setSearchQuery] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const styles = createCommonStyles({ colorScheme: 'light' });
  
  // sessionList is derived from data.sessions and is used for react native list rendering.
  // const sessionList = useMemo(() => {
  //   return data.sessions.map((s) => ({
  //     id: s.id,
  //     title: s.title,
  //     date: new Date(s.createdAt).toLocaleString(),
  //     itemCount: s.items.length,
  //   }));
  // }, [data.sessions]);
  
  // const styles = useMemo(
  //   () => createCommonStyles({ colorScheme: 'light' }),
  //   [theme, colorScheme]
  // );

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


  return (
    <SafeAreaProvider style={styles.container}>
      <IndexHeader />
        <FlatList
          data={data.sessions}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SessionCard session={item}
              onPress={() => handleSessionPress(item.id)}
              onLongPress={() => {}} />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No sessions yet. Create one to get started!</Text>}
          contentContainerStyle={data.sessions.length === 0 ? {flexGrow: 1, justifyContent: 'center'} : {}}
        />
      <IndexFooter onNewSession={handleNewSession}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        onCalendarPress={() => setShowCalendar(true)}
      />
      <CalendarModal visible={showCalendar} onClose={() => setShowCalendar(false)} onDateSelect={handleDateSelect} />
    </SafeAreaProvider>
  );
}
