import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bills = [
    { id: '1', name: 'Electricity', icon: 'bulb', billNumber: 'ELEC1234', consumer: 'ZECO' },
    { id: '2', name: 'Water', icon: 'water', billNumber: 'WATR1234', consumer: 'ZAWA' },
    { id: '3', name: 'Internet', icon: 'wifi', billNumber: 'NET1234', consumer: 'Zanlink' },
    { id: '4', name: 'Cable TV', icon: 'tv', billNumber: 'TV1234', consumer: 'Zanzibar Cable' },
    { id: '5', name: 'Gas', icon: 'flame', billNumber: 'GAS1234', consumer: 'ORYX Gas' },
    { id: '6', name: 'Rent', icon: 'home', billNumber: 'RENT1234', consumer: 'Mall' },
    { id: '7', name: 'Phone', icon: 'call', billNumber: 'PHN1234', consumer: 'Zantel' },
    { id: '8', name: 'Insurance', icon: 'shield', billNumber: 'INS1234', consumer: 'ZIC' },
    { id: '9', name: 'Credit Card', icon: 'card', billNumber: 'CARD1234', consumer: 'MasterCard' },
    { id: '10', name: 'Loan', icon: 'cash', billNumber: 'LOAN1234', consumer: 'ZHELB' },
    { id: '11', name: 'Education', icon: 'school', billNumber: 'EDU1234', consumer: 'SUZA' },
    { id: '12', name: 'Medical', icon: 'medkit', billNumber: 'MED1234', consumer: 'Mnazi Mmoja Hospital' },
    { id: '13', name: 'Entertainment', icon: 'musical-notes', billNumber: 'ENT1234', consumer: 'Kariakoo' },
    { id: '14', name: 'Shopping', icon: 'cart', billNumber: 'SHOP1234', consumer: 'Michenzani Mall' },
    { id: '15', name: 'Travel', icon: 'airplane', billNumber: 'TRVL1234', consumer: 'Azam Marine' },
    { id: '16', name: 'Food', icon: 'restaurant', billNumber: 'FOOD1234', consumer: 'ZFDA' },
    { id: '17', name: 'Subscriptions', icon: 'newspaper', billNumber: 'SUBS1234', consumer: 'NetFlix' },
    { id: '18', name: 'Charity', icon: 'heart', billNumber: 'CHAR1234', consumer: 'Watoto Yatima' },
    { id: '19', name: 'Taxes', icon: 'calculator', billNumber: 'TAX1234', consumer: 'ZRA' },
    { id: '20', name: 'Miscellaneous', icon: 'options', billNumber: 'MISC1234', consumer: 'Other' },
];

const Payment = () => {
    const [selectedBill, setSelectedBill] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [consumerNo, setConsumerNo] = useState('');
    const [billType, setBillType] = useState('');
    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState('');

    const payBill = async () => {
        const sessionKey = await AsyncStorage.getItem('sessionKey');
        const url = 'http://192.168.43.254:8088/bill/payment?key=';
        const key = sessionKey; // Replace with your actual key

        const billData = {
            consumerNo,
            billType,
            amount: parseFloat(amount),
            receiver,
            paymentDateTime: new Date().toISOString(), // Or format as per your backend requirements
        };

        try {
            const response = await fetch(url + key, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });

            if (!response.ok) {
                throw new Error('Failed to pay bill');
            }

            // Handle success, e.g., show confirmation message or navigate to a success screen
            console.log('Bill paid successfully');
        } catch (error) {
            console.error('Error paying bill:', error.message);
            // Handle error, e.g., show error message to user
        } finally {
            setModalVisible(false); // Close modal regardless of success or failure
        }
    };

    const renderForm = () => (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Consumer Number"
                value={consumerNo}
                onChangeText={setConsumerNo}
            />
            <TextInput
                style={styles.input}
                placeholder="Bill Type"
                value={billType}
                onChangeText={setBillType}
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
                placeholder="Receiver"
                value={receiver}
                onChangeText={setReceiver}
            />
        </View>
    );

    const renderBillOption = ({ item }) => (
        <TouchableOpacity
            style={styles.billOption}
            onPress={() => {
                setSelectedBill(item.name);
                setBillType(item.name);
                setConsumerNo(item.billNumber);
                setReceiver(item.consumer)
                setModalVisible(true);
            }}
        >
            <Ionicons name={item.icon} size={30} color='#DDDDDD' />
            <Text style={styles.billOptionText}>{item.name}</Text>
        </TouchableOpacity>
    );

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
                    <Ionicons name="cash-outline" size={40} color="#fff" />
                    <Text style={styles.headerText}>Pay Bills</Text>
                    <Text style={styles.headerSubText}>Convenient and Fast Payments</Text>
                </View>
            </LinearGradient>

            <FlatList
                data={bills}
                renderItem={renderBillOption}
                keyExtractor={item => item.id}
                numColumns={4}
                contentContainerStyle={styles.billGrid}
            />

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
                            {renderForm()}
                            <TouchableOpacity style={styles.submitButton} onPress={payBill}>
                                <Text style={styles.submitButtonText}>Pay</Text>
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
    billGrid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    billOption: {
        width: '23%', // Adjust the width for better spacing
        aspectRatio: 1,
        margin: '1%',
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 88
    },
    billOptionText: {
        color: '#DDDDDD',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5, // Add space between icon and text
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#f5f5f5',
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

export default Payment;
