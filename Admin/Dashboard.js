import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import AdminHeader from './AdminHeader';
import Card from './Card';


const data = [
  { id: '1', title: 'Customers', color: '#3498db', metric: '120', icon: 'people', screenName: 'Customer' },
  { id: '2', title: 'Bank Accounts', color: '#e74c3c', metric: '45', icon: 'card', screenName: 'BankList' },
  { id: '3', title: 'Transactions', color: '#2ecc71', metric: '98', icon: 'swap-horizontal', screenName: 'Transactions' },
  { id: '4', title: 'Reports', color: '#f39c12', metric: '5', icon: 'document', screenName: 'Report' },
  { id: '5', title: 'Bills', color: '#9b59b6', metric: '12', icon: 'cash', screenName: 'Bills' },
  { id: '6', title: 'Beneficiary', color: '#e67e22', metric: '25', icon: 'trending-up', screenName: 'Beneficiary' },
];

function Dashboard({ navigation }) {

  return (
    <View style={styles.container}>
      <AdminHeader navigation={navigation} />
      <FlatList
        data={data}
        renderItem={({ item }) => <Card {...item} navigation={navigation} />}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    bottom: 250,
  },
});

export default Dashboard;