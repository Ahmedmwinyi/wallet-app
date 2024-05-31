import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, FlatList } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const bills = [
    { id: '1', name: 'Electricity', icon: 'bulb' },
    { id: '2', name: 'Water', icon: 'water' },
    { id: '3', name: 'Internet', icon: 'wifi' },
    { id: '4', name: 'Cable TV', icon: 'tv' },
    { id: '5', name: 'Gas', icon: 'flame' },
    { id: '6', name: 'Rent', icon: 'home' },
    { id: '7', name: 'Phone', icon: 'call' },
    { id: '8', name: 'Insurance', icon: 'shield' },
    { id: '9', name: 'Credit Card', icon: 'card' },
    { id: '10', name: 'Loan', icon: 'cash' },
    { id: '11', name: 'Education', icon: 'school' },
    { id: '12', name: 'Medical', icon: 'medkit' },
    { id: '13', name: 'Entertainment', icon: 'musical-notes' },
    { id: '14', name: 'Shopping', icon: 'cart' },
    { id: '15', name: 'Travel', icon: 'airplane' },
    { id: '16', name: 'Food', icon: 'restaurant' },
    { id: '17', name: 'Subscriptions', icon: 'newspaper' },
    { id: '18', name: 'Charity', icon: 'heart' },
    { id: '19', name: 'Taxes', icon: 'calculator' },
    { id: '20', name: 'Miscellaneous', icon: 'options' },
];

const Payment = () => {
    const [selectedBill, setSelectedBill] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const renderForm = () => {
        switch (selectedBill) {
            case 'Electricity':
                return (
                    <View>
                        <TextInput style={styles.input} placeholder="Electricity Account Number" />
                        <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" />
                    </View>
                );
            case 'Water':
                return (
                    <View>
                        <TextInput style={styles.input} placeholder="Water Account Number" />
                        <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" />
                    </View>
                );
            case 'Internet':
                return (
                    <View>
                        <TextInput style={styles.input} placeholder="Internet Account Number" />
                        <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" />
                    </View>
                );
            case 'Cable TV':
                return (
                    <View>
                        <TextInput style={styles.input} placeholder="Cable TV Account Number" />
                        <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" />
                    </View>
                );
            // Add more cases for other bill types
            default:
                return null;
        }
    };

    const renderBillOption = ({ item }) => (
        <TouchableOpacity
            style={styles.billOption}
            onPress={() => {
                setSelectedBill(item.name);
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
                            <TouchableOpacity style={styles.submitButton} onPress={() => { /* Add your payment logic here */ }}>
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

export default Payment;
