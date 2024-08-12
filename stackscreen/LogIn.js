import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../stackscreen/Button';
import { COLORS } from '../constants/theme';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Customer');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://192.168.43.254:8088/customer/login', {
                mobileNumber: mobileNumber,
                password: password,
                role: "Customer"
            });

            const sessionKey = response.data.key;

            // Store user data separately in AsyncStorage
            await AsyncStorage.multiSet([
                ['sessionKey', sessionKey],
                ['mobileNumber', mobileNumber],
                ['password', password],
                ['role', "Customer"]
            ]);

            Alert.alert('Login Successful', 'You have successfully logged in!');

            navigation.navigate('BottomTab');
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid credentials or an error occurred.');
            console.error(error);
        }
    };

    const handleAdminSignIn = async () => {
        try {
            const response = await axios.post('http://192.168.43.254:8088/admin/login', {
                mobileNumber: mobileNumber,
                password: password,
                role: "Admin"
            });

            const sessionKey = response.data.key;

            await AsyncStorage.multiSet([
                ['sessionKey', sessionKey],
                ['mobileNumber', mobileNumber],
                ['password', password],
                ['role', "Customer"]
            ]);

            Alert.alert('Login Successful', 'You have successfully logged in as an System Admin!');

            navigation.navigate('Dashboard');
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid credentials or an error occurred.');
            console.error(error);
        }
    };

    const handleLogin = async () => {
        setIsLoading(true);
        if (role === 'Customer') {
            await handleSignIn();
        } else if (role === 'Admin') {
            await handleAdminSignIn();
        }
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.mainHeader}>Hey, Welcome Back!</Text>
                <Text style={styles.subHeader}>Hello again, you've been missed!!</Text>
            </View>
            <View style={styles.footer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    keyboardType="phone-pad"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                {/* <View style={styles.roleSelection}>
                    <TouchableOpacity
                        style={[styles.roleButton, role === 'Customer' && styles.selectedRoleButton]}
                        onPress={() => setRole('Customer')}
                    >
                        <Text style={styles.roleButtonText}>Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.roleButton, role === 'Admin' && styles.selectedRoleButton]}
                        onPress={() => setRole('Admin')}
                    >
                        <Text style={styles.roleButtonText}>Admin</Text>
                    </TouchableOpacity>
                </View> */}
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    <Button
                        onPress={handleLogin}
                        title="Log In"
                        filled
                        style={styles.button}
                    />
                )}
                <Button
                    title="Sign Up"
                    onPress={() => navigation.navigate("SignUp")}
                    style={styles.button}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainHeader: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    subHeader: {
        fontSize: 18,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
    },
    footer: {
        flex: 2,
        paddingHorizontal: 20,
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
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    roleSelection: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    roleButton: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginHorizontal: 10,
    },
    selectedRoleButton: {
        backgroundColor: COLORS.primary,
    },
    roleButtonText: {
        color: COLORS.primary,
    },
});

export default Login;
