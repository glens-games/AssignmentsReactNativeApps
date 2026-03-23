import {FlatList, Pressable, SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import {useLocalStorage} from '../data/localStorage';
import {useState} from 'react';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  headerRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12},
  headerTitle: {fontSize: 18, fontWeight: '700'},
  newSessionBtn: {paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#007AFF', borderRadius: 6},
  newSessionBtnText: {color: '#fff', fontWeight: '600'},
  sessionRow: {paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd'},
  sessionTitle: {fontSize: 16, fontWeight: '600', marginBottom: 4},
  sessionDate: {fontSize: 12, color: '#666'},
  sessionItemCount: {fontSize: 12, color: '#999', marginTop: 4},
  emptyText: {textAlign: 'center', color: '#999', marginTop: 32, fontSize: 14},
  viewTabs: {flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#ddd'},
  tabBtn: {paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, borderRadius: 4},
  tabBtnActive: {backgroundColor: '#ddd'},
  tabBtnText: {fontSize: 12, fontWeight: '500'},
  calendarPlaceholder: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  calendarPlaceholderText: {color: '#999'},
});

type ViewMode = 'list' | 'calendar';

export default function Index() {
  const router = useRouter();
  const {data, createSession} = useLocalStorage();
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleNewSession = () => {
    const session = createSession();
    router.push({pathname: '/session/[id]', params: {id: session.id}});
  };

  const handleSessionPress = (sessionId: string) => {
    router.push({pathname: '/session/[id]', params: {id: sessionId}});
  };

  const sessionList = data.sessions.map(s => ({
    id: s.id,
    title: s.title,
    date: new Date(s.createdAt).toLocaleString(),
    itemCount: s.items.length,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Log Sessions</Text>
        <Pressable style={styles.newSessionBtn} onPress={handleNewSession}>
          <Text style={styles.newSessionBtnText}>New Session</Text>
        </Pressable>
      </View>

      <View style={styles.viewTabs}>
        <Pressable
          style={[styles.tabBtn, viewMode === 'list' && styles.tabBtnActive]}
          onPress={() => setViewMode('list')}
        >
          <Text style={styles.tabBtnText}>List</Text>
        </Pressable>
        <Pressable
          style={[styles.tabBtn, viewMode === 'calendar' && styles.tabBtnActive]}
          onPress={() => setViewMode('calendar')}
        >
          <Text style={styles.tabBtnText}>Calendar</Text>
        </Pressable>
      </View>

      {viewMode === 'list' ? (
        <FlatList
          data={sessionList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Pressable style={styles.sessionRow} onPress={() => handleSessionPress(item.id)}>
              <Text style={styles.sessionTitle}>{item.title}</Text>
              <Text style={styles.sessionDate}>{item.date}</Text>
              <Text style={styles.sessionItemCount}>{item.itemCount} log items</Text>
            </Pressable>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No sessions yet. Create one to get started!</Text>}
          contentContainerStyle={sessionList.length === 0 ? {flexGrow: 1, justifyContent: 'center'} : {}}
        />
      ) : (
        <View style={styles.calendarPlaceholder}>
          <Text style={styles.calendarPlaceholderText}>Calendar view (coming soon)</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
