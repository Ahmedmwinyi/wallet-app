import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const AdminHeader = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
                <Ionicons name="menu" size={30} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <View style={styles.placeholder} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        height: 80,
        marginTop: 20
    },
    menuButton: {
        padding: 10,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    placeholder: {
        width: 40
    },
});

export default AdminHeader;
