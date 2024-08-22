import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import OnBoard from './stackscreen/OnBoard';
import SignUp from './stackscreen/SignUp';
import LogIn from './stackscreen/LogIn';

import Home from './Screen/Home';
import History from './Screen/History';
import More from './Screen/More';
import Transfer from './Screen/Transfer';
import Payment from './Screen/Payment';
import Withdrawal from './Screen/Withdrawal';
import ScanPay from './Screen/ScanPay';
import WalletTransfer from './Screen/WalletTransfer';
import BankTransfer from './Screen/BankTransfer';
import MobileNumberTransfer from './Screen/MobileNumberTransfer';
import AdminComponent from './Screen/AdminComponent';

import Setting from './More/Setting';
import ProfileScreen from './More/ProfileScreen';
import Security from './More/SettingScreen/Security';
import PrivacyPolicy from './More/SettingScreen/PrivacyPolicy';
import TimeZone from './More/SettingScreen/TimeZone';
import Language from './More/SettingScreen/Language';
import Notification from './More/SettingScreen/Notification';
import FAQScreen from './More/SettingScreen/FAQScreen';
import Chat from './More/SettingScreen/Chat';
import CardBankScreen from './More/CardBankScreen';
import CustomerService from './More/CustomerService';

import BottomTab from './navigator/BottomTab';
import ExchangeRateScreen from './More/ExchangeRateScreen';
import RateUsScreen from './More/RateUsScreen';
import BonusScreen from './More/BonusScreen';
import LogoutScreen from './More/SettingScreen/LogoutScreen';
import DeleteAcconut from './More/SettingScreen/DeleteAcconut';

import Dashboard from './Admin/Dashboard';
import Customer from './Admin/Dashboard/Customer';
import BankList from './Admin/Dashboard/BankList';
import Report from './Admin/Dashboard/Report';
import Transactions from './Admin/Dashboard/Transactions';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        {/*Stack Navigator Screen */}
        <Stack.Screen name='OnBoard' component={OnBoard} />
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='LogIn' component={LogIn}/>

        {/*TabNavigator Screen */}
        <Stack.Screen name='AdminComponent' component={AdminComponent} />
        <Stack.Screen name='BottomTab' component={BottomTab} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='History' component={History} />
        <Stack.Screen name='More' component={More} />
        <Stack.Screen name='Transfer' component={Transfer} />
        <Stack.Screen name='Payment' component={Payment} />
        <Stack.Screen name='Withdrawal' component={Withdrawal} />
        <Stack.Screen name='ScanPay' component={ScanPay} />

        {/*TabNavigator Screen */}
        <Stack.Screen name='WalletTransfer' component={WalletTransfer} />
        <Stack.Screen name='MobileNumberTransfer' component={MobileNumberTransfer} />
        <Stack.Screen name='BankTransfer' component={BankTransfer} />

        {/*More Screen */}
        <Stack.Screen name='Setting' component={Setting} />
        <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
        <Stack.Screen name='Security' component={Security} />
        <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
        <Stack.Screen name='TimeZone' component={TimeZone} />
        <Stack.Screen name='Language' component={Language} />
        <Stack.Screen name='Notification' component={Notification} />
        <Stack.Screen name='FAQScreen' component={FAQScreen} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name='CardBankScreen' component={CardBankScreen} />
        <Stack.Screen name='ExchangeRateScreen' component={ExchangeRateScreen} />
        <Stack.Screen name='RateUsScreen' component={RateUsScreen} />
        <Stack.Screen name='BonusScreen' component={BonusScreen} />
        <Stack.Screen name='LogoutScreen' component={LogoutScreen} />
        <Stack.Screen name='DeleteAcconut' component={DeleteAcconut} />
        <Stack.Screen name='CustomerService' component={CustomerService} />

        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='Customer' component={Customer} />
        <Stack.Screen name='BankList' component={BankList} />
        <Stack.Screen name='Report' component={Report} />
        <Stack.Screen name='Transactions' component={Transactions} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
