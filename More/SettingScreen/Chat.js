import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const Header = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.arrowContainer}>
                <Ionicons name="chevron-back" size={24} color={COLORS.brown} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Customer Service</Text>
            </View>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    arrowContainer: {
        position: 'absolute',
        left: 10,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.brown
    },
});

export default Header;
