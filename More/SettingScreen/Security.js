import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const Security = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons name="lock-closed-outline" size={35} style={styles.lockIcon} />
            </View>
            <Text style={styles.header}>Security</Text>
            <TouchableOpacity style={styles.option}>
                <Ionicons name="key-outline" size={20} style={styles.icon} />
                <Text style={styles.optionText}>Change Password</Text>
                <Ionicons name="chevron-forward-outline" size={20} style={styles.chevronIcon} />
            </TouchableOpacity>
            <View style={styles.lastLoginContainer}>
                <Text style={styles.lastLoginHeader}>Last Login</Text>
                <View style={styles.lastLoginDetails}>
                    <Text style={styles.lastLoginText}>Date: 2024-05-18</Text>
                    <Text style={styles.lastLoginText}>Time: 14:30</Text>
                    <Text style={styles.lastLoginText}>IP Address: 192.168.1.1</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 30,
        width: 70,
        height: 70,
        color: COLORS.brown,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        borderRadius: 70 / 2,
        alignSelf: 'center'
    },
    lockIcon: {
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    icon: {
        marginRight: 10,
        color: COLORS.brown
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.brown
    },
    chevronIcon: {
        color: '#ccc',
    },
    lastLoginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    lastLoginHeader: {
        fontSize: 18,
        flex: 1,
        color: COLORS.brown,
        bottom: 35
    },
    lastLoginDetails: {
        flex: 2,
    },
    lastLoginText: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'right',
        color: COLORS.brown
    },
});

export default Security;
