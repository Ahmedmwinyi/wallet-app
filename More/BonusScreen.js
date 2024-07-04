import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const BonusScreen = () => {
    // data for bonus offers
    const bonusOffers = [
        { id: '1', title: 'Welcome Bonus', description: 'Get a bonus when you sign up!' },
        { id: '2', title: 'Refer a Friend', description: 'Refer a friend and earn bonus points!' },
        { id: '3', title: 'Daily Check-in', description: 'Check in daily to receive bonus rewards!' },
    ];

    const renderBonusItem = ({ item }) => (
        <View style={styles.bonusItem}>
            <Ionicons name="gift" size={30} color={COLORS.primary} style={styles.icon} />
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bonus Offers</Text>
            <FlatList
                data={bonusOffers}
                renderItem={renderBonusItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.bonusList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.primary,
        textAlign: 'center',
    },
    bonusList: {
        flexGrow: 1,
    },
    bonusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    icon: {
        marginRight: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    description: {
        fontSize: 16,
        color: COLORS.gray,
    },
});

export default BonusScreen;
