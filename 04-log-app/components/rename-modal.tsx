import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export function RenameModal({visible, setVisible, renameText, setRenameText}:{
                             visible: boolean;
                             setVisible: (open: boolean) => void;
                             renameText: string;
                             setRenameText: (text: string) => void;})
{
  const [renameCopy, setRenameCopy] = useState("");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Rename Session</Text>
          <TextInput
            value={renameCopy}
            onChangeText={setRenameCopy}
            placeholder="Session name"
            autoFocus
            returnKeyType="done"
            style={styles.input}
          />
          <View style={styles.footer}>            
            <Pressable
              onPress={() => setVisible(false)}
              style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
            >
              <Text>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setRenameText(renameCopy);
                setVisible(false);
              }}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            >
              <Text style={styles.primaryText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  dialog: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  outlineButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
  },

  primaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#2563EB",
    borderRadius: 8,
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.8,
  },
});