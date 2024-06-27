import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import Button from '../../stackscreen/Button';

// Sample transaction data (replace with actual data source)
const transactionData = [
    { id: 1, customerMobile: '1234567890', date: '2024-06-24', amount: 100 },
    { id: 2, customerMobile: '9876543210', date: '2024-06-23', amount: 200 },
    // Add more transaction objects as needed
];

const Transactions = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'day', 'week', 'month', 'year'

    // Function to filter transactions by customer mobile number
    const filterByCustomerMobile = () => {
        if (!searchQuery.trim()) {
            setFilteredTransactions([]);
            return;
        }

        const filtered = transactionData.filter(transaction =>
            transaction.customerMobile.includes(searchQuery.trim())
        );
        applyDateFilter(filtered);
    };

    // Function to apply date filter
    const applyDateFilter = (data) => {
        let filtered = data;

        switch (filter) {
            case 'day':
                filtered = filtered.filter(transaction => isSameDay(transaction.date));
                break;
            case 'week':
                filtered = filtered.filter(transaction => isSameWeek(transaction.date));
                break;
            case 'month':
                filtered = filtered.filter(transaction => isSameMonth(transaction.date));
                break;
            case 'year':
                filtered = filtered.filter(transaction => isSameYear(transaction.date));
                break;
            default:
                break;
        }

        setFilteredTransactions(filtered);
    };

    // Date comparison functions
    const isSameDay = (date) => {
        // Implement logic to check if transaction date is within the same day
        // Example: Compare date with current date or selected date range
        return true; // Replace with your logic
    };

    const isSameWeek = (date) => {
        // Implement logic to check if transaction date is within the same week
        return true; // Replace with your logic
    };

    const isSameMonth = (date) => {
        // Implement logic to check if transaction date is within the same month
        return true; // Replace with your logic
    };

    const isSameYear = (date) => {
        // Implement logic to check if transaction date is within the same year
        return true; // Replace with your logic
    };

    // Function to view all transactions
    const viewAllTransactions = () => {
        setFilteredTransactions(transactionData);
    };

    const renderItem = ({ item }) => (
        <View style={styles.transactionItem}>
            <Text>Customer Mobile: {item.customerMobile}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Amount: ${item.amount}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => { }}>
                    <Text style={styles.backButtonText}>{'Back'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transactions</Text>
                <View style={{ width: 60 }} />
            </View>

            {/* Search input */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by customer mobile"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    onBlur={filterByCustomerMobile}
                />
                <Button title="Search" onPress={filterByCustomerMobile} />
            </View>

            {/* Date filter buttons */}
            <View style={styles.filterContainer}>
                <Button filled title="Day" onPress={() => setFilter('day')} />
                <Button filled title="Week" onPress={() => setFilter('week')} />
                <Button filled title="Month" onPress={() => setFilter('month')} />
                <Button title="Year" onPress={() => setFilter('year')} />
                <Button title="View All" onPress={viewAllTransactions} />
            </View>

            {/* Transaction list */}
            <View style={styles.transactionListContainer}>
                <FlatList
                    data={filteredTransactions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text>No transactions found</Text>}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        height: 80,
        marginTop: 30,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: 'blue', // Example color, you can customize this
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 18
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    transactionListContainer: {
        flex: 1,
    },
    transactionItem: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default Transactions;
