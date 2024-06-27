import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const BankList = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);

    // Example bank data
    const banks = [
        {
            id: 1, name: 'Bank of America', branch: 'Main Branch', address: { streetName: 'Main St', buildingName: 'Building A', city: 'Anytown', state: 'State X', country: 'USA' }
        },
        {
            id: 2, name: 'Chase Bank', branch: 'Downtown Branch', address: { streetName: 'Oak St', buildingName: 'Building B', city: 'Sometown', state: 'State Y', country: 'USA' }
        },
        // Add more banks as needed
    ];

    const filteredBanks = banks.filter(bank =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalBanks = filteredBanks.length;

    const handleBankPress = (bank) => {
        setSelectedBank(bank);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.bankItem} onPress={() => handleBankPress(item)}>
            <Text style={styles.bankName}>{item.name}</Text>
            <Text style={styles.bankBranch}>{item.branch}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Banks</Text>
            </View>

            {/* Search input section */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
            </View>

            {/* Bank list section */}
            <View style={styles.bankListContainer}>
                <View style={styles.bankListHeader}>
                    <Text style={styles.bankListTitle}>Banks</Text>
                    <Text style={styles.bankCount}>{totalBanks}</Text>
                </View>
                <FlatList
                    data={filteredBanks}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.emptyListText}>No banks found</Text>
                        </View>
                    }
                />
            </View>

            {/* Modal view for bank details */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedBank && (
                            <>
                                <Text style={styles.modalTitle}>{selectedBank.name}</Text>
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Account No:</Text>
                                        <Text style={styles.tableCell}>{selectedBank.branch}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Street Name</Text>
                                        <Text style={styles.tableCell}>{selectedBank.address.streetName}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Building Name</Text>
                                        <Text style={styles.tableCell}>{selectedBank.address.buildingName}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>City</Text>
                                        <Text style={styles.tableCell}>{selectedBank.address.city}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>State</Text>
                                        <Text style={styles.tableCell}>{selectedBank.address.state}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Country</Text>
                                        <Text style={styles.tableCell}>{selectedBank.address.country}</Text>
                                    </View>
                                </View>
                            </>
                        )}
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
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
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    searchInput: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    bankListContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    bankListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    bankListTitle: {
        fontSize: 19,
        color: COLORS.brown,
        marginBottom: 5,
    },
    bankCount: {
        fontSize: 18,
        color: COLORS.brown,
        marginBottom: 5,
    },
    bankItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    bankName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.brown,
    },
    bankBranch: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    emptyListContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListText: {
        fontSize: 16,
        color: '#999',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    table: {
        width: '100%',
        marginVertical: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeader: {
        fontWeight: 'bold',
        color: COLORS.brown,
    },
    tableCell: {
        color: '#666',
    },
});

export default BankList;
