import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook for navigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LogoutScreen = () => {
    const [sessionKey, setSessionKey] = useState('');
    const navigation = useNavigation(); // Initialize navigation

    useEffect(() => {
        const getSessionKey = async () => {
            const key = await AsyncStorage.getItem('sessionKey');
            if (key) {
                setSessionKey(key);
            }
        };

        getSessionKey();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`http://192.168.43.254:8088/customer/logout?key=${sessionKey}`);
            await AsyncStorage.removeItem('sessionKey');
            Alert.alert('Logout Successful', 'You have successfully logged out!');
            navigation.navigate('LogIn')
        } catch (error) {
            Alert.alert('Logout Failed', 'An error occurred while logging out.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Are you sure you want to log out?</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LogoutScreen;
