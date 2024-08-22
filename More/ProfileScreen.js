import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
       
    });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sessionKey = await AsyncStorage.getItem('sessionKey');
                const mobileNumber = await AsyncStorage.getItem('mobileNumber');

                if (!sessionKey || !mobileNumber) {
                    Alert.alert('Error', 'Missing API key or mobile number');
                    return;
                }

                const response = await axios.get('http://192.168.43.254:8088/customer/view', {
                    params: {
                        key: sessionKey,
                        mobileNumber: mobileNumber
                    }
                });
                setProfileData(response.data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (field, value) => {
        setProfileData({ ...profileData, [field]: value });
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const sessionKey = await AsyncStorage.getItem('sessionKey');
            const mobileNumber = await AsyncStorage.getItem('mobileNumber');

            if (!sessionKey || !mobileNumber) {
                Alert.alert('Error', 'Missing API key or mobile number');
                return;
            }

            // Adjust the request to include `key` and `mobileNumber` as query parameters
            const response = await axios.put('http://192.168.43.254:8088/customer/update', profileData, {
                params: {
                    key: sessionKey,
                    mobileNumber: mobileNumber
                }
            });

            Alert.alert('Success', 'Profile updated successfully');
            setEditing(false);
        } catch (error) {
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                Alert.alert('Error', `Failed to update profile: ${error.response.data.error || 'Unknown error'}`);
            } else if (error.request) {
                console.error('Request data:', error.request);
                Alert.alert('Error', 'No response from the server');
            } else {
                console.error('Error message:', error.message);
                Alert.alert('Error', error.message);
            }
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Feather name="user" size={50} color={COLORS.gray} />
            </View>
            <Text style={styles.username}>{profileData.firstName} {profileData.lastName}</Text>
            <View style={styles.mobileNumber}>
                <Text>{profileData.mobileNumber}</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.option}>
                    <Text style={styles.label}>First Name:</Text>
                    {editing ? (
                        <TextInput
                            style={styles.input}
                            value={profileData.firstName}
                            onChangeText={(value) => handleInputChange('firstName', value)}
                        />
                    ) : (
                        <Text style={styles.value}>{profileData.firstName}</Text>
                    )}
                </View>

                <View style={styles.option}>
                    <Text style={styles.label}>Last Name:</Text>
                    {editing ? (
                        <TextInput
                            style={styles.input}
                            value={profileData.lastName}
                            onChangeText={(value) => handleInputChange('lastName', value)}
                        />
                    ) : (
                        <Text style={styles.value}>{profileData.lastName}</Text>
                    )}
                </View>

                <View style={styles.option}>
                    <Text style={styles.label}>Email:</Text>
                    {editing ? (
                        <TextInput
                            style={styles.input}
                            value={profileData.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                        />
                    ) : (
                        <Text style={styles.value}>{profileData.email}</Text>
                    )}
                </View>

                <View style={styles.option}>
                    <Text style={styles.label}>Wallet ID:</Text>
                    {editing ? (
                        <TextInput
                            style={styles.input}
                            value={profileData.wallet?.walletId || ''}
                            onChangeText={(value) => handleInputChange('wallet', { ...profileData.wallet, walletId: value })}
                        />
                    ) : (
                        <Text style={styles.value}>{profileData.wallet?.walletId || 'N/A'}</Text>
                    )}
                </View>
            </View>

            <View style={styles.footer}>
                {editing ? (
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        width: 70,
        height: 70,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        borderRadius: 70 / 2,
        alignSelf: 'center'
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: COLORS.brown,
        marginBottom: 10,
    },
    mobileNumber: {
        alignSelf: 'center',
        padding: 5,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 5,
        marginBottom: 20,
    },
    section: {
        marginTop: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    label: {
        fontSize: 16,
        color: COLORS.secondary1,
    },
    value: {
        fontSize: 16,
        color: COLORS.brown,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: COLORS.primary,
        paddingVertical: 5,
        fontSize: 16,
        color: COLORS.brown,
        width: '60%',
        textAlign: 'right',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default ProfileScreen;
