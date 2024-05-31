import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { COLORS } from '../../constants/theme'; // Make sure to import your theme colors

const FAQScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.faqItem}>
                <Feather name="help-circle" size={24} color={COLORS.primary} />
                <Text style={styles.question}>What is a wallet app?</Text>
                <Text style={styles.answer}>
                    A wallet app, also known as a digital wallet or mobile wallet, is a digital application that allows users to store, manage, and transact various forms of digital currency or financial assets, such as cryptocurrencies, loyalty points, coupons, and payment cards, directly from their mobile devices.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Feather name="help-circle" size={24} color={COLORS.primary} />
                <Text style={styles.question}>How does a wallet app work?</Text>
                <Text style={styles.answer}>
                    A wallet app typically works by securely storing users' digital assets using encryption technology. Users can add funds to their wallet by linking it to their bank account, credit card, or by receiving transfers from other users. They can then use the wallet to make purchases, send money to others, or redeem rewards, depending on the features supported by the app.
                </Text>
            </View>

            {/* Additional FAQ items */}
            <View style={styles.faqItem}>
                <Feather name="help-circle" size={24} color={COLORS.primary} />
                <Text style={styles.question}>What features does a wallet app typically offer?</Text>
                <Text style={styles.answer}>
                    Common features of a wallet app include:
                    {"\n"}- Adding and storing various forms of digital currency or financial assets.
                    {"\n"}- Making payments at participating merchants using QR codes, NFC technology, or digital wallets like Apple Pay or Google Pay.
                    {"\n"}- Sending and receiving money to/from other users.
                    {"\n"}- Managing loyalty points, coupons, and rewards.
                    {"\n"}- Tracking transaction history and account balances.
                    {"\n"}- Enhancing security through features like biometric authentication or two-factor authentication.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Feather name="help-circle" size={24} color={COLORS.primary} />
                <Text style={styles.question}>Is it safe to use a wallet app?</Text>
                <Text style={styles.answer}>
                    Wallet apps prioritize security to protect users' financial information and digital assets. They often employ encryption, secure data storage methods, and authentication measures like PIN codes or biometrics to safeguard user accounts. However, users should still take precautions, such as using strong passwords, keeping their devices updated, and avoiding suspicious links or apps.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Feather name="help-circle" size={24} color={COLORS.primary} />
                <Text style={styles.question}>Can I use a wallet app for cryptocurrency transactions?</Text>
                <Text style={styles.answer}>
                    Yes, many wallet apps support cryptocurrencies, allowing users to buy, sell, and store digital currencies like Bitcoin, Ethereum, and Litecoin. These apps typically provide features for managing multiple cryptocurrencies, accessing blockchain networks, and monitoring market prices.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Feather name="help-circle" size={24} color={COLORS.primary} />
                <Text style={styles.question}>What should I do if I lose access to my wallet app?</Text>
                <Text style={styles.answer}>
                    If you lose access to your wallet app, such as forgetting your password or losing your device, most apps offer recovery options. This may involve using backup codes, recovery phrases, or contacting customer support to regain access to your account. It's essential to follow the app's recommended security practices and keep backup copies of important account information.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Feather name="help-circle" size={24} color={COLORS.primary} />
                <Text style={styles.question}>Are wallet apps free to use?</Text>
                <Text style={styles.answer}>
                    Many wallet apps offer basic features for free, but they may charge fees for certain services, such as currency conversions, expedited transactions, or premium features. Additionally, users should be aware of any potential fees associated with transferring funds into or out of their wallet, depending on the payment methods used.
                </Text>
            </View>

            <View style={styles.faqItem}>
                <Feather name="help-circle" size={24} color={COLORS.primary} />
                <Text style={styles.question}>How can I find a reliable wallet app?</Text>
                <Text style={styles.answer}>
                    When choosing a wallet app, consider factors such as security features, user reviews, supported currencies, ease of use, and customer support. Look for apps from reputable developers or companies with a track record of providing secure and reliable financial services. Additionally, research the app's
                </Text>
            </View>
            {/* Add more FAQ items here */}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    faqItem: {
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginLeft: 10,
        marginBottom: 5,
    },
    answer: {
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 10,
    },
});

export default FAQScreen;
