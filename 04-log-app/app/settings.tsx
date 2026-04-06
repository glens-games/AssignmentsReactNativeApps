import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/styles/theme';
import { useLocalStorage } from '@/data/localStorage';

export default function SettingsScreen() {
    const router = useRouter();

    const { data, setOptions } = useLocalStorage();
    const isDarkMode = data.options.darkMode;

    const [undoWithShake, setUndoWithShake] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      <ScrollView contentContainerStyle={styles.content}>

        <Section title="Appearance">
          <SettingsRow
            label="Dark Mode"
            description="Switch to a darker color scheme that's easier on your eyes in low light."
            right={
                <Switch
                value={data.options.darkMode}
                onValueChange={(value) => setOptions({ darkMode: value })}
                />
            }
            showSeparator={false}
          />
        </Section>

        <Section title="General">
          <SettingsRow
            label="Undo with Shake"
            description="Shake your device to undo recent actions and edits."
            right={
              <Switch
                value={undoWithShake}
                onValueChange={setUndoWithShake}
              />
            }
            showSeparator={false}
          />
        </Section>

        <Section title="About">
          <SettingsRow
            label="Version"
            right={<Text style={styles.muted}>1.0.0</Text>}
          />
          <SettingsRow
            label="Terms of Service"
            right={<Text style={styles.muted}>›</Text>}
            showSeparator={false}
          />
        </Section>

        <Section title="The Developer">
          <SettingsRow
            label="Check out my site!"
            right={<Text style={styles.muted}>›</Text>}
          />
          <SettingsRow
            label="Show me your support!"
            right={<Text style={styles.muted}>›</Text>}
            showSeparator={false}
          />
        </Section>

      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function SettingsRow({
  label,
  description,
  right,
  showSeparator = true,
}: {
  label: string;
  description?: string;
  right?: React.ReactNode;
  showSeparator?: boolean;
}) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <View style={styles.rowTop}>
          <Text style={styles.rowLabel}>{label}</Text>
          {right}
        </View>

        {description && (
          <Text style={styles.rowDescription}>{description}</Text>
        )}
      </View>

      {showSeparator && <View style={styles.separator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },

  backButton: {
    fontSize: 20,
    color: theme.colors.primary,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },

  content: {
    padding: 16,
    gap: 20,
  },

  section: {
    gap: 8,
  },

  sectionTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: theme.colors.muted,
  },

  sectionCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },

  row: {
    padding: 14,
  },

  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.text,
  },

  rowDescription: {
    marginTop: 4,
    fontSize: 13,
    color: theme.colors.muted,
  },

  separator: {
    marginTop: 12,
    height: 1,
    backgroundColor: theme.colors.border,
  },

  muted: {
    color: theme.colors.muted,
  },
});