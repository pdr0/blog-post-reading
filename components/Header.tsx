import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Header = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {Platform.OS === 'web' ? (
                    <Link href="/" asChild>
                        <a style={{ display: 'flex' }}>
                            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                        </a>
                    </Link>
                ) : (
                    <Link href="/" asChild>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                        </TouchableOpacity>
                    </Link>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
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
