import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const MoreScreen = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.header}
      >
        <Text style={styles.headerText}>More</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="settings-outline" size={35} color={COLORS.brown} style={{marginRight: 10}} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* First Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
            <Ionicons name="person-outline" size={24} color={COLORS.brown} />
            <Text style={styles.optionText}>My Profile</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('CardBankScreen')}>
            <Ionicons name="card-outline" size={24} color={COLORS.brown} />
            <Text style={styles.optionText}>Cards & Bank Account</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('CustomerService')}>
            <Ionicons name="help-circle-outline" size={24} color={COLORS.brown} />
            <Text style={styles.optionText}>Customer Service</Text>
          </TouchableOpacity>
        </View>

        {/* Second Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>More Options</Text>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ExchangeRateScreen')}>
            <Ionicons name="cash-outline" size={24} color={COLORS.brown} />
            <Text style={styles.optionText}>Exchange Rate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('BonusScreen')}>
            <Ionicons name="gift-outline" size={24} color={COLORS.brown} />
            <Text style={styles.optionText}>Bonus</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('RateUsScreen')}>
            <Ionicons name="star-outline" size={24} color={COLORS.brown} />
            <Text style={styles.optionText}>Rate Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 45
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeading: {
    marginBottom: 8,
    top: 10, 
    color: "#C7C8CC"
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    height: 80
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    color: COLORS.brown
  },
});

export default MoreScreen;
