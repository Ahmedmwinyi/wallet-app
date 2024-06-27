import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import Button from '../../stackscreen/Button';

const Customer = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Example customer data
    const customers = [
        {
            id: 1, name: 'John Doe', email: 'john.doe@example.com', mobile: '123-456-7890', firstName: 'John', lastName: 'Doe',
            address: { streetName: 'Main St', buildingName: 'Building A', city: 'Anytown', state: 'State X', country: 'USA' }
        },
        {
            id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', mobile: '098-765-4321', firstName: 'Jane', lastName: 'Smith',
            address: { streetName: 'Oak St', buildingName: 'Building B', city: 'Sometown', state: 'State Y', country: 'USA' }
        },
        // Add more customers as needed
    ];

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalCustomers = filteredCustomers.length;

    const handleCustomerPress = (customer) => {
        setSelectedCustomer(customer);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.customerItem} onPress={() => handleCustomerPress(item)}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.customerEmail}>{item.email}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Customers</Text>
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

            {/* Customer list section */}
            <View style={styles.customerListContainer}>
                <View style={styles.customerListHeader}>
                    <Text style={styles.customerListTitle}>Customers</Text>
                    <Text style={styles.customerCount}>{totalCustomers}</Text>
                </View>
                <FlatList
                    data={filteredCustomers}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.emptyListText}>No customers found</Text>
                        </View>
                    }
                />
            </View>

            {/* Modal view for customer details */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedCustomer && (
                            <>
                                <Text style={styles.modalTitle}>{selectedCustomer.name}</Text>
                                <View style={styles.table}>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Mobile Number</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.mobile}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>First Name</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.firstName}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Last Name</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.lastName}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Email</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.email}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Street Name</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.address.streetName}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Building Name</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.address.buildingName}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>City</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.address.city}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>State</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.address.state}</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>Country</Text>
                                        <Text style={styles.tableCell}>{selectedCustomer.address.country}</Text>
                                    </View>
                                </View>
                            </>
                        )}
                        <Button title="Close" style={styles.button} onPress={() => setModalVisible(false)} />
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
    customerListContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    customerListHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    customerListTitle: {
        fontSize: 19,
        color: COLORS.brown,
        marginBottom: 5,
    },
    customerCount: {
        fontSize: 18,
        color: COLORS.brown,
        marginBottom: 5,
    },
    customerItem: {
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
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.brown,
    },
    customerEmail: {
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
        height: "70%"
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
        height: "10%",
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
    button: {
        height: 50,
        width: "100%",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30,
       
    },
});

export default Customer;
