import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const AdminComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        // Perform authentication logic here
        // For simplicity, I'll just check if the username and password are both 'admin'
        if (username === 'admin' && password === 'admin') {
            setLoggedIn(true);
        } else {
            Alert.alert('Login Failed', 'Invalid username or password');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
    };

    const renderLoggedInView = () => {
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => viewTransactionByDate()}>
                    <Text style={styles.buttonText}>View Transactions By Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => viewAllTransactionsByCustomerByDate()}>
                    <Text style={styles.buttonText}>View All Transactions By Customer By Date</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => viewAllTransactionsByCustomer()}>
                    <Text style={styles.buttonText}>View All Transactions By Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => viewAllTransactions()}>
                    <Text style={styles.buttonText}>View All Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    const viewTransactionByDate = () => {
        
    };

    const viewAllTransactionsByCustomerByDate = () => {
        
    };

    const viewAllTransactionsByCustomer = () => {
       
    };

    const viewAllTransactions = () => {
    
    };

    return (
        <View style={styles.container}>
            {loggedIn ? (
                renderLoggedInView()
            ) : (
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 300,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AdminComponent;
