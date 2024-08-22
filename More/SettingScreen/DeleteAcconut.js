import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/theme';

const DeleteAccount = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const sessionKey = await AsyncStorage.getItem('sessionKey');
            const mobileNumber = await AsyncStorage.getItem('mobileNumber');

            if (!sessionKey || !mobileNumber) {
                Alert.alert('Error', 'Missing API key or mobile number');
                return;
            }

            // Confirm the delete action with the user
            Alert.alert(
                'Confirm Deletion',
                'Are you sure you want to delete your account? This action cannot be undone.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            try {
                                // Send a request to delete the account
                                await axios.delete('http://192.168.43.254:8088/customer/delete', {
                                    params: {
                                        key: sessionKey,
                                        mobileNumber: mobileNumber
                                    }
                                });

                                // Clear AsyncStorage and notify the user
                                await AsyncStorage.removeItem('sessionKey');
                                await AsyncStorage.removeItem('mobileNumber');
                                Alert.alert('Success', 'Your account has been deleted successfully.');
                                navigation.navigate('SignUp')
                            } catch (error) {
                                Alert.alert('Error', 'Failed to delete account.');
                            } finally {
                                setLoading(false);
                            }
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch session data.');
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Delete Account</Text>
            <TouchableOpacity style={styles.button} onPress={handleDelete} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Delete My Account</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.brown,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DeleteAccount;
