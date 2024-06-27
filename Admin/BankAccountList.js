import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const bankAccounts = [
    { id: '1', accountNumber: '1234567890', bankName: 'Bank A', accountHolder: 'John Doe' },
    { id: '2', accountNumber: '0987654321', bankName: 'Bank B', accountHolder: 'Jane Smith' },
    { id: '3', accountNumber: '1122334455', bankName: 'Bank C', accountHolder: 'Michael Johnson' },
    { id: '4', accountNumber: '5566778899', bankName: 'Bank D', accountHolder: 'Emily Davis' },
    // ... add more bank accounts as needed
];

const BankAccountList = () => {
    const renderItem = ({ item }) => (
        <View style={styles.bankAccountItem}>
            <Text style={styles.accountNumber}>Account: {item.accountNumber}</Text>
            <Text style={styles.bankName}>Bank: {item.bankName}</Text>
            <Text style={styles.accountHolder}>Holder: {item.accountHolder}</Text>
        </View>
    );

    return (
        <FlatList
            data={bankAccounts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    bankAccountItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    accountNumber: {
        fontSize: 16,
        color: '#333',
    },
    bankName: {
        fontSize: 14,
        color: '#3498db',
    },
    accountHolder: {
        fontSize: 14,
        color: '#777',
    },
});

export default BankAccountList;
