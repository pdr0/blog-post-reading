import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

// Define the UserType
export type UserType = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};

// UserCard Component
const UserCard: React.FC<{ user: UserType }> = ({ user }) => {
    const openMap = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.avatar}><Text style={styles.avatarText}>{user.name.charAt(0)}</Text></View>
                <View>
                    <Text style={styles.title}>{user.name}</Text>
                    <Text style={styles.subtitle}>@{user.username}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}><Text style={styles.label}>Email:</Text> {user.email}</Text>
                <Text style={styles.text}><Text style={styles.label}>Phone:</Text> {user.phone}</Text>
                <Text style={styles.text}><Text style={styles.label}>Website:</Text> {user.website}</Text>
                <Text style={styles.text}><Text style={styles.label}>Company:</Text> {user.company.name}</Text>
                <Text style={styles.text}><Text style={styles.label}>Catchphrase:</Text> {user.company.catchPhrase}</Text>
                <Text style={styles.text}><Text style={styles.label}>Business:</Text> {user.company.bs}</Text>
                <Text style={styles.text}><Text style={styles.label}>Address:</Text> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</Text>
                <TouchableOpacity onPress={openMap}>
                    <Text style={[styles.text, styles.mapLink]}>Open in Maps</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    content: {
        marginTop: 5,
    },
    text: {
        fontSize: 14,
        marginVertical: 2,
    },
    label: {
        fontWeight: 'bold',
    },
    mapLink: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 5,
    }
});

export default UserCard;
