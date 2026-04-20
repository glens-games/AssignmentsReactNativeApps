import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalStorage } from '@/data/localStorage';
import { RenameModal } from '@/components/rename-modal';

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
  buttonBar: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logButton: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    height: 48,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logButtonPressed: {
    backgroundColor: '#005BBB',
  },
  logButtonText: {color: '#fff', fontWeight: '700', fontSize: 16},
  iconButton: {
    height: 40,
    width: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default function SessionScreen() {
  const {id} = useLocalSearchParams();
  const router = useRouter();
  const {data, setSessionName, addItemToSession, deleteItem, getTypeById} = useLocalStorage();

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

  const [showRenameModal, setShowRenameModal] = useState(false);

  const handlePrevType = () => {
  }

  const handleNextType = () => {
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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={44} />
            <Text style={styles.emptyText}>
              No log items yet.{"\n"}
              Tap the button below to record a timestamp.
            </Text>
          </View>
        }
        contentContainerStyle={logItems.length === 0 ? {flexGrow: 1, justifyContent: 'center'} : {}}
        style={styles.logItemsContainer}
      />

      <View style={styles.buttonBar}>        
        {/* Previous type */}
        <Pressable onPress={handlePrevType} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={20} color="#374151" />
        </Pressable>

        {/* LOG button */}
        <Pressable
          onPress={handleLog}
          style={({ pressed }) => [styles.logButton, pressed && styles.logButtonPressed]}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text
            style={styles.logButtonText}
            numberOfLines={1}
          >
            {currentType?.name || 'LOG'}
          </Text>
        </Pressable>

        {/* Next type */}
        <Pressable onPress={handleNextType} style={styles.iconButton}>
          <Ionicons name="chevron-forward" size={20} color="#374151" />
        </Pressable>
      </View>
      <RenameModal
        visible={showRenameModal}
        setVisible={() => setShowRenameModal(false)}
        renameText={session.title}
        setRenameText={(text) => setSessionName(session.id, text)} />
    </SafeAreaView>
  );
}
