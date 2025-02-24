import React from 'react';
import { Image, StyleSheet, SafeAreaView, Platform, Pressable, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

const Header = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.header}>
                <Link href="/" asChild>
                    {Platform.OS === 'web' ? (
                        <a style={{ display: 'flex' }}>
                            <Image testID="header-logo" source={require('../assets/images/logo.png')} style={styles.logo} />
                        </a>
                    ) : (
                        <Pressable>
                            <Image testID="header-logo" source={require('../assets/images/logo.png')} style={styles.logo} />
                        </Pressable>
                    )}
                </Link>
            </ThemedView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logo: {
        width: 322,
        height: 75,
        marginRight: 10,
    },
});

export default Header;
