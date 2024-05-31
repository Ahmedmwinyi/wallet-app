import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

const CardBankScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankBalance, setBankBalance] = useState('');
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

    if (!bankName) newErrors.bankName = 'Bank name is required';
    if (!accountNumber || accountNumber.length < 10) newErrors.accountNumber = 'Valid account number is required';
    if (!cardNumber || cardNumber.length < 16) newErrors.cardNumber = 'Valid card number is required';
    if (!ifscCode || ifscCode.length !== 11) newErrors.ifscCode = 'Valid IFSC code is required';
    if (!bankBalance || isNaN(bankBalance)) newErrors.bankBalance = 'Valid bank balance is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      // Submit data to the server
      Alert.alert('Success', 'Bank details saved successfully');
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
        <Text style={styles.headerText}>Enter Your Bank Details</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Bank Name"
            placeholderTextColor="#999"
            value={bankName}
            onChangeText={setBankName}
          />
          {errors.bankName && <Text style={styles.error}>{errors.bankName}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Account Number"
            placeholderTextColor="#999"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
          />
          {errors.accountNumber && <Text style={styles.error}>{errors.accountNumber}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Card Number"
            placeholderTextColor="#999"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
          />
          {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}

          <TextInput
            style={styles.input}
            placeholder="IFSC Code"
            placeholderTextColor="#999"
            value={ifscCode}
            onChangeText={setIfscCode}
          />
          {errors.ifscCode && <Text style={styles.error}>{errors.ifscCode}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Bank Balance"
            placeholderTextColor="#999"
            value={bankBalance}
            onChangeText={setBankBalance}
            keyboardType="numeric"
          />
          {errors.bankBalance && <Text style={styles.error}>{errors.bankBalance}</Text>}

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
  input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: COLORS.brown,
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

export default CardBankScreen;
