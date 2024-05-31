import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WalletTransfer from '../Screen/WalletTransfer';
import BankTransfer from '../Screen/BankTransfer';
import MobileNumberTransfer from '../Screen/MobileNumberTransfer';

const Tab = createBottomTabNavigator();

const TransferStack = ({ transferFunds }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Wallet">
                {(props) => <WalletTransfer {...props} onTransfer={transferFunds} />}
            </Tab.Screen>
            <Tab.Screen name="Bank">
                {(props) => <BankTransfer {...props} onTransfer={transferFunds} />}
            </Tab.Screen>
            <Tab.Screen name="Mobile Number">
                {(props) => <MobileNumberTransfer {...props} onTransfer={transferFunds} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default TransferStack;
