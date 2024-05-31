import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';
import Button from '../stackscreen/Button'

export default function History() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [totalAmountSent, setTotalAmountSent] = useState(0);
  const [totalAmountSents, setTotalAmountSents] = useState(0);


  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const sessionKey = await AsyncStorage.getItem('sessionKey');
      if (!sessionKey) {
        throw new Error('Authentication key not found');
      }

      const response = await axios.get('http://192.168.43.254:8088/transaction/viewall', {
        params: {
          key: sessionKey,
        },
      });

      setTransactions(response.data);
      
      const sentTransactions = response.data.filter(transaction => transaction.type === 'Top-Up');
      const totalAmountSent = sentTransactions.reduce((total, transaction) => total + transaction.amount, 0);
      console.log('Total amount sent from wallet:', totalAmountSent);
      setTotalAmountSent(totalAmountSent);

      const receiveTransaction = response.data.filter(transaction => transaction.type !== 'Top-Up');
      const totalAmountSents = receiveTransaction.reduce((total, transaction) => total + transaction.amount, 0);
      console.log('Total amount sent from wallet:', totalAmountSents);
      setTotalAmountSents(totalAmountSents);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };


  const handleTransactionPress = (item) => {
    setSelectedTransaction(item);
    setModalVisible(true);
  };

  const onRefresh = async () => {
  setRefreshing(true);
  await fetchTransactions(); // Call your fetchTransactions function or any other data fetching logic
  setRefreshing(false);
};


  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.header}>
        <Text style={styles.username}>Hello</Text>
        <TouchableOpacity style={styles.buttonUser}>
          <Ionicons name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.balanceBox}>
        <View>
          <Text style={styles.itemTitle}>Revenue</Text>
          <View style={styles.content}>
            <Text style={styles.currencySymbol}>$</Text>
            <Text style={styles.balance}>{totalAmountSent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.itemTitle}>Expenses</Text>
          <View style={styles.content}>
            <Text style={styles.currencySymbol}>$</Text>
            <Text style={styles.expenses}>{totalAmountSents.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.title}>Last Transactions</Text>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          data={transactions}
          keyExtractor={(item, index) => {
            if (item.id !== undefined) {
              return String(item.id);
            } else {
              return String(index); // Use index as fallback if id is missing
            }
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              progressBackgroundColor="#ffffff"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.transactionItem} onPress={() => handleTransactionPress(item)}>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionLabel}>{item.receiver}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={[styles.transactionValue, item.type === 'Top-Up' ? styles.incomeValue : styles.expenseValue]}>
                {item.amount}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {selectedTransaction && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Transaction Details</Text>
              <Text style={styles.modalText}>Label: {selectedTransaction.label}</Text>
              <Text style={styles.modalText}>Date: {selectedTransaction.date}</Text>
              <Text style={styles.modalText}>Value: {selectedTransaction.value}</Text>
              <Text style={styles.modalText}>Description: {selectedTransaction.description}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: COLORS.brown,
    fontWeight: 'bold',
  },
  buttonUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44 / 2,
  },
  balanceBox: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#964B00', // Example brown color
    backgroundColor: "#fff", // Example gray color
    justifyContent: "space-between",
    paddingStart: 18,
    paddingEnd: 18,
    marginStart: 0,
    marginEnd: 0,
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 20,
    color: COLORS.brown
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    color: "#dadada",
    marginRight: 6,
  },
  balance: {
    fontSize: 22,
    color: '#3ecc71',
  },
  expenses: {
    fontSize: 22,
    color: '#e74c3c',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
    color: COLORS.brown
  },
  listContainer: {
    flex: 1,
    maxHeight:
      510,
    backgroundColor: '#f5f5f5'
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  transactionDetails: {
    flexDirection: 'column',
  },
  transactionLabel: {
    fontSize: 16,
    color: COLORS.brown
  },
  transactionDate: {
    fontSize: 14,
    color: '#999',
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseValue: {
    color: '#e74c3c',
  },
  incomeValue: {
    color: '#3ecc71',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    height: 400
  },
  modalTitle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.brown,
    marginBottom: 20
  },
  modalText: {
    flex: 1,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: COLORS.brown
  }
});