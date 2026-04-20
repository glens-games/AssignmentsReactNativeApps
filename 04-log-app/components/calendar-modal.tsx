
import { useLocalStorage } from "@/data/localStorage";
import { useAppTheme } from "@/styles/theme";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from 'react-native-calendars';

export function CalendarModal({visible, onClose, onDateSelect}:
                            {visible: boolean;
                             onClose: () => void;
                             onDateSelect: (day: any) => void})
{
    const {data} = useLocalStorage();
    const {theme} = useAppTheme(data);
    
    const styles2 = StyleSheet.create({
        modalOverlay: {
            flex: 1,
            backgroundColor: '#00000088',
            justifyContent: 'center',
            padding: 20,
        },

        calendarContainer: {
            backgroundColor: theme.colors.card,
            borderRadius: 12,
            padding: 12,
        },

        closeButton: {
            marginTop: 10,
            alignItems: 'center',
        },

        closeButtonText: {
            color: theme.colors.primary,
            fontWeight: '600',
        },
    });

    return (
    <Modal visible={visible} transparent animationType="slide">
        <View style={styles2.modalOverlay}>
          <View style={styles2.calendarContainer}>
            <Calendar
              onDayPress={onDateSelect}
              theme={{
                backgroundColor: theme.colors.card,
                calendarBackground: theme.colors.card,
                dayTextColor: theme.colors.text,
              }}
            />

            <Pressable
              onPress={onClose}
              style={styles2.closeButton}
            >
              <Text style={styles2.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
}