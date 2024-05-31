import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../stackscreen/Button';
import { COLORS } from '../constants/theme';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://192.168.43.254:8088/customer/login', {
                mobileNumber: mobileNumber,
                password: password,
                role: "Customer"
            });

            const sessionKey = response.data.key;

            // Store each piece of user data separately in AsyncStorage
            await AsyncStorage.multiSet([
                ['sessionKey', sessionKey],
                ['mobileNumber', mobileNumber],
                ['password', password],
                ['role', "Customer"]
            ]);

            Alert.alert('Login Successful', 'You have successfully logged in!');

            // Navigate to the next screen if login is successful
            navigation.navigate('BottomTab'); // Assuming you have a Home screen
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid credentials or an error occurred.');
            console.error(error);
        }
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
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    <Button
                        onPress={handleSignIn}
                        title="Log In"
                        filled
                        style={styles.button}
                    />
                )}
                <Button
                    title="Sign Up"
                    onPress={() => navigation.navigate("BottomTab")}
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
});

export default Login;
