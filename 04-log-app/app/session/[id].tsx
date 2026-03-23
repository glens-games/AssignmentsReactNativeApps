import {FlatList, Pressable, SafeAreaView, Text, View, StyleSheet, GestureResponderEvent} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useLocalStorage} from '../../data/localStorage';
import {useState, useMemo} from 'react';
import {Ionicons} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {fontSize: 18, fontWeight: '700', flex: 1},
  backBtn: {paddingRight: 12},
  logItemsContainer: {flex: 1},
  logItemRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  logItemTimestamp: {fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 4},
  logItemTime: {fontSize: 12, color: '#666'},
  logItemType: {fontSize: 14, fontWeight: '500', marginBottom: 2},
  logItemContent: {flex: 1},
  logItemDeleteBtn: {paddingHorizontal: 8},
  emptyText: {textAlign: 'center', color: '#999', marginTop: 32, fontSize: 14},
  buttonBar: {borderTopWidth: 1, borderTopColor: '#ddd', paddingVertical: 12, paddingHorizontal: 16},
  logButton: {width: '100%', paddingVertical: 16, borderRadius: 8, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center'},
  logButtonText: {color: '#fff', fontWeight: '700', fontSize: 16},
});

export default function SessionScreen() {
  const {id} = useLocalSearchParams();
  const router = useRouter();
  const {data, addItemToSession, deleteItem, getTypeById} = useLocalStorage();

  const session = useMemo(() => data.sessions.find(s => s.id === id), [data.sessions, id]);
  const [currentTypeId, setCurrentTypeId] = useState<string>('log');

  if (!session) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </Pressable>
          <Text style={styles.headerTitle}>Session Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleLog = () => {
    addItemToSession(session.id, currentTypeId);

    // if this type toggles to another, switch the button type
    const currentType = getTypeById(currentTypeId);
    if (currentType?.togglesToId) {
      setCurrentTypeId(currentType.togglesToId);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    deleteItem(session.id, itemId);
  };

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'}),
    };
  };

  const currentType = getTypeById(currentTypeId);
  const logItems = [...session.items].reverse(); // show newest at top

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </Pressable>
        <Text style={styles.headerTitle}>{session.title}</Text>
      </View>

      <FlatList
        data={logItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const type = getTypeById(item.typeId);
          const {date, time} = formatTimestamp(item.timestamp);
          return (
            <View style={styles.logItemRow}>
              <View style={styles.logItemContent}>
                <Text style={styles.logItemType}>{type?.name || '?'}</Text>
                <Text style={styles.logItemTimestamp}>{date}</Text>
                <Text style={styles.logItemTime}>{time}</Text>
                {item.gps && <Text style={{fontSize: 10, color: '#999', marginTop: 2}}>📍 {item.gps.lat.toFixed(4)}, {item.gps.lon.toFixed(4)}</Text>}
              </View>
              <Pressable style={styles.logItemDeleteBtn} onPress={() => handleDeleteItem(item.id)}>
                <Ionicons name="trash" size={20} color="#FF3B30" />
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>No log items yet</Text>}
        contentContainerStyle={logItems.length === 0 ? {flexGrow: 1, justifyContent: 'center'} : {}}
        style={styles.logItemsContainer}
      />

      <View style={styles.buttonBar}>
        <Pressable style={styles.logButton} onPress={handleLog}>
          <Text style={styles.logButtonText}>{currentType?.name || 'LOG'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
