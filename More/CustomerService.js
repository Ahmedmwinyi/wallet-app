import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

const issues = [
    { id: 1, label: 'Unable to log in' },
    { id: 2, label: 'Transaction failed' },
    { id: 3, label: 'Incorrect balance' },
    { id: 4, label: 'Issue with card linking' },
    { id: 5, label: 'Others' },
];

const CustomerService = () => {
    const [firstName, setFirstName] = useState('');
    const [selectedIssue, setSelectedIssue] = useState('');
    const [comments, setComments] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchFirstName = async () => {
            try {
                const mobileNumber = await AsyncStorage.getItem('mobileNumber');
                if (mobileNumber) {
                    const response = await axios.get('http://192.168.43.254:8088/customer/firstname', {
                        params: { mobileNumber }
                    });
                    setFirstName(response.data);
                }
            } catch (error) {
                console.error('There was an error fetching the first name!', error);
            }
        };

        fetchFirstName();
    }, []);

    const validateFields = () => {
        const newErrors = {};

        if (!selectedIssue) newErrors.selectedIssue = 'Please select an issue';
        if (!comments) newErrors.comments = 'Please provide additional comments';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            Alert.alert('Success', 'Your issue has been submitted successfully');
            // Reset form fields
            setSelectedIssue('');
            setComments('');
            setErrors({});
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.header}>
                <Text style={styles.username}>Hello, {firstName}</Text>
                <TouchableOpacity style={styles.buttonUser}>
                    <Ionicons name="person" size={24} color="#fff" />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.headerText}>Report an Issue</Text>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Select Issue</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedIssue}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedIssue(itemValue)}
                        >
                            <Picker.Item label="Select an issue" value="" />
                            {issues.map(issue => (
                                <Picker.Item key={issue.id} label={issue.label} value={issue.label} />
                            ))}
                        </Picker>
                    </View>
                    {errors.selectedIssue && <Text style={styles.error}>{errors.selectedIssue}</Text>}

                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Additional Comments"
                        placeholderTextColor="#999"
                        value={comments}
                        onChangeText={setComments}
                        multiline
                        numberOfLines={4}
                    />
                    {errors.comments && <Text style={styles.error}>{errors.comments}</Text>}

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 26,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 45,
    },
    username: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold',
    },
    buttonUser: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44 / 2,
    },
    scrollViewContent: {
        padding: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.brown,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: COLORS.gray,
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 20,
        width: 400,
        alignSelf: 'center'
    },
    formContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: COLORS.brown,
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: COLORS.brown,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    error: {
        color: 'red',
        marginBottom: 5,
    },
    submitButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomerService;
