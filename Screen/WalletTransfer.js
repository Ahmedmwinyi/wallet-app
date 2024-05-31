import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletTransfer = ({ onTransfer, navigation }) => {
    const [targetMobileNumber, setTargetMobileNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [securityMobile, setSecurityMobile] = useState('');
    const [securityPassword, setSecurityPassword] = useState('');

    const transferFunds = async () => {
        try {
            // Assuming you have stored the sessionKey, mobileNumber, password, and role in AsyncStorage
            const sessionKey = await AsyncStorage.getItem('sessionKey');
            const mobileNumber = await AsyncStorage.getItem('mobileNumber');
            const password = await AsyncStorage.getItem('password');
            const role = await AsyncStorage.getItem('role');

            const url = `http://192.168.43.254:8088/wallet/transfer?key=${encodeURIComponent(sessionKey)}&targetMobileNumber=${encodeURIComponent(targetMobileNumber)}&amount=${encodeURIComponent(amount)}&description=${encodeURIComponent(description)}`;
            const requestBody = JSON.stringify({
                mobileNumber: mobileNumber,
                password: password,
                role: role
            });

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });

            console.log(sessionKey);
            console.log(mobileNumber)
            console.log(password)
            console.log(role)

            const data = await response.json();
            if (response.ok) {
                // Handle successful response
                console.log('Transfer successful', data);
                Alert.alert('Transfer Successful', 'Funds transferred successfully.');
                setModalVisible(false);
            } else {
                // Handle non-OK response
                console.error('Transfer failed', data);
                Alert.alert('Transfer Failed', 'Unable to transfer funds. Please try again later.');
            }
        } catch (error) {
            // Handle error
            console.error('Error transferring funds', error);
            Alert.alert('Transfer Failed', 'Unable to transfer funds. Please try again later.');
        }
    };

    const handleTransfer = () => {
        // Validate mobile number and password here
        // If validation passes, proceed with the transfer
        // Otherwise, show an error message
        if (securityMobile === 'owner_mobile' && securityPassword === 'owner_password') {
            transferFunds();
        } else {
            Alert.alert('Error', 'Invalid mobile number or password');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.header}
            >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Ionicons name="wallet-outline" size={40} color="#fff" />
                    <Text style={styles.headerText}>Wallet Transfer</Text>
                    <Text style={styles.headerSubText}>Send money to another wallet</Text>
                </View>
            </LinearGradient>
            <View style={styles.transferContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Recipient Mobile Number"
                    keyboardType="phone-pad"
                    value={targetMobileNumber}
                    onChangeText={setTargetMobileNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity style={styles.submitButton} onPress={transferFunds}>
                    <Text style={styles.submitButtonText}>Transfer</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.securityInput}
                        placeholder="Mobile Number"
                        keyboardType="phone-pad"
                        value={securityMobile}
                        onChangeText={setSecurityMobile}
                    />
                    <TextInput
                        style={styles.securityInput}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={securityPassword}
                        onChangeText={setSecurityPassword}
                    />
                    <TouchableOpacity style={styles.securityButton} onPress={handleTransfer}>
                        <Text style={styles.submitButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
    transferContainer: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    securityInput: {
        height: 50,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    securityButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default WalletTransfer;
