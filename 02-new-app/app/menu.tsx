import { Appearance, StyleSheet, Platform, ScrollView, Text, Image, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { MENU_ITEMS } from "@/constants/menu-items";
import menuImages from "@/constants/menu-images";

export default function MenuScreen() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const styles = createStyles(theme, colorScheme);
    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

    const seperatorComponent = () => <View style={ styles.seperator } />;
    const headerComponent = () => <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: theme.text }}>Our Menu</Text>;
    const footerComponent = () => <Text style={{ fontSize: 16, fontStyle: 'italic', marginTop: 20, color: theme.text }}>* Menu items and prices are subject to change without notice.</Text>;

    return (
        <Container>
            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={ styles.contentContainer }
                ItemSeparatorComponent={ seperatorComponent }
                ListHeaderComponent={ headerComponent }
                ListFooterComponent={ footerComponent }
                ListFooterComponentStyle={ styles.footerComponent}
                ListEmptyComponent={<Text>No Items</Text>}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <View style={styles.menuTextRow}>
                            <Text style={[styles.menuItemTitle, styles.menuItemText]}>{item.title}</Text>
                            <Text style={styles.menuItemText}>{item.description}</Text>
                        </View>
                        <Image
                            source={menuImages[item.id - 1]}
                            style={styles.menuImage}
                        />
                    </View>
                )}
            />

        </Container>
    )
};

function createStyles(theme: typeof Colors.dark, colorScheme: 'light' | 'dark' | null | undefined) {
    return StyleSheet.create({
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background,
        },
        seperator: {
            height: 1,
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : '#000000',
            width: '50%',
            maxWidth: 300,
            marginHorizontal: 'auto',
            marginBottom: 10,
        },
        footerComponent: {
            marginHorizontal: 'auto',
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            maxWidth: 600,
            height: 100,
            marginBottom: 10,
            borderStyle: 'solid',
            borderColor: colorScheme === 'dark' ? 'papayawhip' : '#000000',
            borderWidth: 1,
            borderRadius: 20,
            overflow: 'hidden',
            marginHorizontal: 'auto',
        },
        menuTextRow: {
            width: '65%',
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 5,
            flexGrow: 1,
        },
        menuItemTitle: {
            fontSize: 18,
            textDecorationLine: 'underline',
        },
        menuItemText: {
            color: theme.text,
        },
        menuImage: {
            width: 100,
            height: 100,
        },
    });
}