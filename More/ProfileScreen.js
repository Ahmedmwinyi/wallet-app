import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.43.254:8088/customer/view', {
                    params: {
                        key: '',
                        mobileNumber: ''
                    }
                });
                setProfileData(response.data);
            } catch (error) {
                setError(error);
                Alert.alert('Error', 'Failed to fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    

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
                <Text>{profileData.phoneNumber}</Text>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>First Name:</Text>
                    <Text style={styles.value}>{profileData.firstName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>Last Name:</Text>
                    <Text style={styles.value}>{profileData.lastName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{profileData.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>Country:</Text>
                    <Text style={styles.value}>{profileData.country}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>State:</Text>
                    <Text style={styles.value}>{profileData.state}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>City:</Text>
                    <Text style={styles.value}>{profileData.city}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>Building Name:</Text>
                    <Text style={styles.value}>{profileData.buildingName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>Street Name:</Text>
                    <Text style={styles.value}>{profileData.streetName}</Text>
                </TouchableOpacity>
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
    icon: {
        marginRight: 10,
        color: COLORS.brown,
    },
    optionText: {
        fontSize: 16,
        color: COLORS.brown,
    },
    label: {
        fontSize: 16,
        color: COLORS.secondary1,
    },
    value: {
        fontSize: 16,
        color: COLORS.brown,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
