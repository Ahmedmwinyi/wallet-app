import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal, FlatList } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const CurrencyExchange = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('TZS');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [rates, setRates] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currencyListVisible, setCurrencyListVisible] = useState(false);
    const [currentCurrencySelection, setCurrentCurrencySelection] = useState('from');
    const [currencies, setCurrencies] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchExchangeRates();
        fetchCurrencies();
    }, []);

    const fetchExchangeRates = async () => {
        try {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            setRates(response.data.rates);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch exchange rates');
        }
    };

    const fetchCurrencies = async () => {
        try {
            const response = await axios.get('https://openexchangerates.org/api/currencies.json');
            const currencyData = response.data;
            const currencyList = Object.keys(currencyData).map((code) => ({
                code,
                name: currencyData[code]
            }));
            setCurrencies(currencyList);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch currency list');
        }
    };

    const handleCurrencyChange = (currency) => {
        if (currentCurrencySelection === 'from') {
            setFromCurrency(currency);
        } else {
            setToCurrency(currency);
        }
        setCurrencyListVisible(false);
    };

    const convertCurrency = () => {
        if (!amount || isNaN(amount)) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        const rate = rates[toCurrency] / rates[fromCurrency];
        const result = amount * rate;
        setConvertedAmount(result.toFixed(2));
    };

    const filteredCurrencies = currencies.filter(currency =>
        currency.code.toLowerCase().includes(searchText.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.header}>
                <Text style={styles.headerText}>Currency Exchange</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter amount"
                        placeholderTextColor="#999"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>From</Text>
                    <TouchableOpacity
                        style={styles.currencySelector}
                        onPress={() => {
                            setCurrencyListVisible(true);
                            setCurrentCurrencySelection('from');
                        }}
                    >
                        <Text style={styles.currencySelectorText}>{fromCurrency}</Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>To</Text>
                    <TouchableOpacity
                        style={styles.currencySelector}
                        onPress={() => {
                            setCurrencyListVisible(true);
                            setCurrentCurrencySelection('to');
                        }}
                    >
                        <Text style={styles.currencySelectorText}>{toCurrency}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={convertCurrency}>
                        <Text style={styles.submitButtonText}>Convert</Text>
                    </TouchableOpacity>

                    {convertedAmount && (
                        <Text style={styles.resultText}>
                            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                        </Text>
                    )}
                </View>

                <Modal
                    visible={currencyListVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setCurrencyListVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search currency"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                            <FlatList
                                data={filteredCurrencies}
                                keyExtractor={(item) => item.code}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.currencyItem}
                                        onPress={() => handleCurrencyChange(item.code)}
                                    >
                                        <Text style={styles.currencyItemText}>{item.code} - {item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setCurrencyListVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 26,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 45,
    },
    headerText: {
        fontSize: 24,
        color: "#fff",
        fontWeight: 'bold',
    },
    scrollViewContent: {
        padding: 20,
    },
    formContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: COLORS.brown,
        marginBottom: 10,
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
    currencySelector: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    currencySelectorText: {
        color: '#000',
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
    resultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.brown,
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        height: 700,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: COLORS.brown,
    },
    currencyItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    currencyItemText: {
        fontSize: 18,
        color: COLORS.brown,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CurrencyExchange;
