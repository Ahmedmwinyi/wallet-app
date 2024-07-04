import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Transfer = ({navigation}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [targetMobileNumber, setTargetMobileNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const transferFunds = async () => {
        try {
            // Retrieve sessionKey and individual user data pieces from AsyncStorage
            const sessionKey = await AsyncStorage.getItem('sessionKey');
            const mobileNumber = await AsyncStorage.getItem('mobileNumber');
            const password = await AsyncStorage.getItem('password');
            const role = await AsyncStorage.getItem('role');

            console.log('sessionKey:', sessionKey);
            console.log('mobileNumber:', mobileNumber);
            console.log('password:', password);
            console.log('role:', role);

            // Check if sessionKey and user data are found
            if (sessionKey && mobileNumber && password && role) {
                // Construct the URL with query parameters
                const url = `http://192.168.43.254:8088/wallet/transfer?key=${encodeURIComponent(sessionKey)}&targetMobileNumber=${encodeURIComponent(targetMobileNumber)}&amount=${encodeURIComponent(amount)}&description=${encodeURIComponent(description)}`;

                // Create the request body with user data
                const requestBody = JSON.stringify({
                    user: {
                        mobileNumber: mobileNumber,
                        password: password,
                        role: role
                    }
                });

                // Make the API request using fetch
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: requestBody,
                });

                const data = await response.json();
                if (response.ok) {
                    
                    console.log('Transfer successful', data);
                    Alert.alert('Transfer Successful', 'Funds transferred successfully.');
                    setModalVisible(false);
                } else {
                    
                    console.error('Transfer failed', data);
                    Alert.alert('Transfer Failed', 'Unable to transfer funds. Please try again later.');
                }
            } else {
                // Handle case when sessionKey or user data is missing or incomplete
                console.error('Error transferring funds: sessionKey or user data is missing or incomplete');
                Alert.alert('Transfer Failed', 'Unable to transfer funds. Session key or user data is missing or incomplete.');
            }
        } catch (error) {
            // Handle error
            console.error('Error transferring funds', error);
            Alert.alert('Transfer Failed', 'Unable to transfer funds. Please try again later.');
        }
    };


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.header}
            >
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Ionicons name="wallet-outline" size={40} color="#fff" />
                    <Text style={styles.headerText}>Transfer Money</Text>
                    <Text style={styles.headerSubText}>Secure and Fast Transfers</Text>
                </View>
            </LinearGradient>
            {/* Area Box */}
            <View style={styles.areaBox}>
                <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate('WalletTransfer')}>
                    <Ionicons name="wallet-outline" size={24} color={COLORS.primary} />
                    <Text style={styles.areaButtonText}>To Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate('BankTransfer')}>

                    <FontAwesome name="bank" size={24} color={COLORS.primary} />
                    <Text style={styles.areaButtonText}>To Bank</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate('MobileNumberTransfer')}>
                    <FontAwesome name="mobile-phone" size={24} color={COLORS.primary} />
                    <Text style={styles.areaButtonText}>To Mobile Number</Text>
                </TouchableOpacity>
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
    header: {
        height: 200,
        width: "110%",
        right: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    headerContent: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    headerSubText: {
        fontSize: 16,
        color: '#fff',
    },
    option: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius        : 10,
        borderTopRightRadius: 10,
        maxHeight: '50%',
    },
    closeText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'right',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    submitButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    areaBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: COLORS.white,
        bottom: 18,
        width: 420,
        right: 15
    },
    areaButton: {
        alignItems: 'center',
    },
    areaButtonText: {
        marginTop: 8,
        fontSize: 14,
        color: COLORS.primary,
    },
});

export default Transfer;
