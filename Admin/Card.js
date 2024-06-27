import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure expo/vector-icons is installed

const Card = ({ title, color, metric, icon, navigation, target, screenName }) => {
    return (
        <TouchableOpacity style={[styles.card, { borderColor: color }]} onPress={() => navigation.navigate(screenName)}>
            <View style={[styles.iconContainer, { borderColor: color }]}>
                <Ionicons name={icon} size={32} color={color} style={styles.icon} />
            </View>
            <Text style={[styles.cardTitle, { color }]}>{title}</Text>
            <Text style={styles.cardMetric}>{metric}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        marginBottom: 20,
        height: 180,
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardMetric: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default Card;
