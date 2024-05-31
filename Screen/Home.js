import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [key, setKey] = useState('');
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [totalAmountSent, setTotalAmountSent] = useState(0);
  
  useEffect(() => {
    
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      // Retrieve the authentication key from AsyncStorage
      const sessionKey = await AsyncStorage.getItem('sessionKey');
      if (!sessionKey) {
        throw new Error('Authentication key not found');
      }


      // Make the request with the retrieved authentication key
      const response = await axios.get('http://192.168.43.254:8088/wallet/balance', {
        params: {
          key: sessionKey,
        },
      });
      setBalance(response.data);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const fetchTransactions = async () => {
    try {
      const sessionKey = await AsyncStorage.getItem('sessionKey');
      if (!sessionKey) {
        throw new Error('Authentication key not found');
      }
      const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];
      const response = await axios.get('http://192.168.43.254:8088/transaction/viewall', {
        params: {
          key: sessionKey,
          date: today,
          startDate,
          endDate
        },
      });
      console.log(response.data); // Log the transactions data
      setTransactions(response.data);

      const sentTransactions = response.data.filter(transaction => transaction.type === 'Bill Payment');
      const totalAmountSent = sentTransactions.reduce((total, transaction) => total + transaction.amount, 0);
      console.log('Total amount sent from wallet:', totalAmountSent);
      setTotalAmountSent(totalAmountSent);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };


  return (
    <View style={styles.container}>
        {/* Header */}
        <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.header}>
          <Text style={styles.currencyText}>TZS</Text>
        <TouchableOpacity>
          <Text style={styles.balanceText}>{balance !== null ? ` ${balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : 'Loading...'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.balanceButton} onPress={() => alert('Balance details')}>
          <Text style={styles.balanceButtonText}>Balances</Text>
        </TouchableOpacity>
        </LinearGradient>


          {/* Area Box */}
          <View style={styles.areaBox}>
            <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate('ScanPay')}>
              <Ionicons name="scan-outline" size={24} color={COLORS.primary} />
              <Text style={styles.areaButtonText}>Scan/Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate('Payment')}>
              <Ionicons name="wallet-outline" size={24} color={COLORS.primary} />
              <Text style={styles.areaButtonText}>Bills</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate('Withdrawal')}>

              <Ionicons name="cash-outline" size={24} color={COLORS.primary} />
              <Text style={styles.areaButtonText}>Withdrawal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.areaButton} onPress={() => navigation.navigate('Transfer')}>
              <Ionicons name="swap-horizontal-outline" size={24} color={COLORS.primary} />
              <Text style={styles.areaButtonText}>Transfer</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Monthly Total Bills</Text>
          <Text style={styles.summaryValue}>${totalAmountSent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Recent Activity</Text>
          <FlatList
            data={transactions.slice(-3)} // Show the last three transactions
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            renderItem={({ item }) => (
              <View style={styles.transaction}>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionText}>{item.type}</Text>
                  <Text
                    style={[
                      styles.transactionAmount,
                      item.type === 'Transfer' ? styles.transferAmount :
                        item.type === 'Beneficiary Transaction' ? styles.transferAmount :
                          item.type === 'Bill Payment' ? styles.transferAmount :
                            item.type === 'E-Wallet Transaction' ? styles.receivedAmount : styles.receivedAmount,
                    ]}
                  >
                    {item.amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
                <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No transactions available</Text>}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flex: 1,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
  },
  currencyText: {
    fontSize: 20,
    color: COLORS.white,
  },
  balanceText: {
    fontSize: 40,
    marginTop: 8,
    color: COLORS.white,
  },
  blurredBalanceText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 8,
    color: COLORS.white,
    textShadowColor: COLORS.gray,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  balanceButton: {
    backgroundColor: COLORS.buttonBackground,
    padding: 10,
    borderRadius: 25,
    width: 150,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.buttonBorder,
    alignItems: 'center',
  },
  balanceButtonText: {
    fontSize: 16,
    color: COLORS.buttonText,
  },
  areaBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: COLORS.white,
  },
  areaButton: {
    alignItems: 'center',
  },
  areaButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.primary,
  },
  footer: {
    flex: 2,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  summaryCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    color: COLORS.brown,
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.red,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionDate: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 10,
  },
  transactionDetails: {
    flexDirection: 'column',
  },
  transactionText: {
    fontSize: 16,
    color: COLORS.brown,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sentAmount: {
    color: '#e74c3c',
  },
  receivedAmount: {
    color: '#3ecc71',
  },
  transferAmount: {
    color: COLORS.red, // Blue for transfers (example)
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
});

export default HomeScreen;
