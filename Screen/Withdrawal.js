import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the header icon
import { COLORS } from '../constants/theme'; // Import your theme colors
import { LinearGradient } from 'expo-linear-gradient';

const Withdrawal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState('');

    const handleWithdraw = () => {
        // Add your withdrawal logic here
        console.log(`Withdraw ${withdrawalAmount} to registered mobile number.`);
        setModalVisible(false);
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
                    <Text style={styles.headerText}>Withdraw Money</Text>
                    <Text style={styles.headerSubText}>Fast and Secure Withdrawals</Text>
                </View>
            </LinearGradient>

            <TouchableOpacity
                style={styles.withdrawButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.withdrawButtonText}>Withdraw to Mobile Number</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                placeholder="Withdrawal Amount"
                                keyboardType="numeric"
                                value={withdrawalAmount}
                                onChangeText={setWithdrawalAmount}
                            />
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleWithdraw}
                            >
                                <Text style={styles.submitButtonText}>Withdraw</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
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
    withdrawButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginTop: 20,
    },
    withdrawButtonText: {
        color: COLORS.brown,
        fontSize: 18,
        fontWeight: 'bold',
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
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxHeight: '50%',
    },
    closeText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'right',
        marginBottom: 20,
    },
    submitButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Withdrawal;
