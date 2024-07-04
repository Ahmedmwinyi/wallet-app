import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import Button from './Button';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const SignUp = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstNameValid, setFirstNameValid] = useState(null);
    const [lastNameValid, setLastNameValid] = useState(null);
    const [emailValid, setEmailValid] = useState(null);
    const [mobileNumberValid, setMobileNumberValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);

    const validateFirstName = (name) => {
        setFirstName(name);
        setFirstNameValid(name.trim() !== '');
    };

    const validateLastName = (name) => {
        setLastName(name);
        setLastNameValid(name.trim() !== '');
    };

    const validateEmail = (email) => {
        setEmail(email);
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
        setEmailValid(emailRegex.test(email));
    };

    const validateMobileNumber = (number) => {
        setMobileNumber(number);
        setMobileNumberValid(/^\d{10}$/.test(number));
    };

    const validatePassword = (password) => {
        setPassword(password);
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{6,12}$/;
        setPasswordValid(passwordRegex.test(password));
    };

    const validateForm = () => {
        if (!firstNameValid || !lastNameValid || !emailValid || !mobileNumberValid || !passwordValid) {
            Alert.alert('Invalid Input', 'Please ensure all fields are filled out correctly.');
            return false;
        }
        return true;
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const passwordVisibilityIcon = isPasswordVisible ? 'eye-off' : 'eye';

    const handleSignUp = () => {
        if (validateForm()) {
            setIsLoading(true);
            fetch('http://192.168.43.254:8088/customer/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    mobileNumber,
                    password,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setIsLoading(false);
                    Alert.alert('Success', 'Account created successfully!');
                    navigation.navigate("LogIn");
            
                })
                .catch(error => {
                    setIsLoading(false);
                    console.error('Error:', error);
                    Alert.alert('Error', 'An error occurred. Please try again.');
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.mainHeader}>Create Account</Text>
                <Text style={styles.subHeader}>Connect with your friends</Text>
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View>
                )}
            </View>
            <View style={styles.footer}>
                <TextInput
                    style={[
                        styles.input,
                        firstNameValid === false ? styles.invalidInput : firstNameValid ? styles.validInput : {},
                    ]}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={validateFirstName}
                />
                <TextInput
                    style={[
                        styles.input,
                        lastNameValid === false ? styles.invalidInput : lastNameValid ? styles.validInput : {},
                    ]}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={validateLastName}
                />
                <TextInput
                    style={[
                        styles.input,
                        emailValid === false ? styles.invalidInput : emailValid ? styles.validInput : {},
                    ]}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={validateEmail}
                />
                <TextInput
                    style={[
                        styles.input,
                        mobileNumberValid === false ? styles.invalidInput : mobileNumberValid ? styles.validInput : {},
                    ]}
                    placeholder="Mobile Number"
                    keyboardType="phone-pad"
                    value={mobileNumber}
                    onChangeText={validateMobileNumber}
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            styles.passwordInput,
                            passwordValid === false ? styles.invalidInput : passwordValid ? styles.validInput : {},
                        ]}
                        placeholder="Password"
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={validatePassword}
                    />
                    <Ionicons
                        name={passwordVisibilityIcon}
                        size={24}
                        color="gray"
                        onPress={togglePasswordVisibility}
                        style={styles.eyeIcon}
                    />
                </View>

                <Button
                    title="Sign Up"
                    filled
                    style={styles.button}
                    onPress={handleSignUp}
                />
                <Button
                    title="Log In"
                    onPress={() => navigation.navigate("LogIn")}
                    style={styles.button}
                />
            </View>
            
        </View>
    );
};;

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
        borderWidth: 2,
        borderColor: '#ccc',
    },
    invalidInput: {
        borderColor: 'red',
    },
    validInput: {
        borderColor: 'green',
    },
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 12
    },
});

export default SignUp;
