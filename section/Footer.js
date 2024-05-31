import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

const Footer = ({ navigation }) => {
    return (
        <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.footer}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home" size={24} color="#fff" />
                <Text style={styles.navLabel}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person" size={24} color="#fff" />
                <Text style={styles.navLabel}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddTransaction')}>
                <Ionicons name="add" size={36} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Notifications')}>
                <Ionicons name="notifications" size={24} color="#fff" />
                <Text style={styles.navLabel}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings" size={24} color="#fff" />
                <Text style={styles.navLabel}>Settings</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navLabel: {
        fontSize: 12,
        color: '#fff',
        marginTop: 2,
    },
    fab: {
        width: 56,
        height: 56,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginTop: -30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default Footer;
