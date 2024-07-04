import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS } from '../constants/theme';

const RateUsScreen = () => {
    // Function to open the app store for rating
    const openAppStore = () => {
       
        const appStoreUrl = 'https://apps.apple.com/app/your_app_id';
        Linking.openURL(appStoreUrl);
    };

    return (
        <View style={styles.container}>
            <Ionicons name="star" size={100} color={COLORS.primary} style={styles.starIcon} />
            <Text style={styles.title}>Enjoying the App?</Text>
            <Text style={styles.subtitle}>Please take a moment to rate us on the app store.</Text>
            <TouchableOpacity style={styles.rateButton} onPress={openAppStore}>
                <Text style={styles.rateButtonText}>Rate Us</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    starIcon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
    },
    rateButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    rateButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default RateUsScreen;
