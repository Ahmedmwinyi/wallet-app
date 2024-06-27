import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const customers = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Michael Johnson', email: 'michael@example.com' },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com' },
    // ... add more customers as needed
];

const CustomerList = () => {
    const renderItem = ({ item }) => (
        <View style={styles.customerItem}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
        </View>
    );

    return (
        <FlatList
            data={customers}
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
    customerItem: {
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
    name: {
        fontSize: 16,
        color: '#333',
    },
    email: {
        fontSize: 14,
        color: '#777',
    },
});

export default CustomerList;
