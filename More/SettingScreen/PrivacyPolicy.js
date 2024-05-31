import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/theme';

const PrivacyPolicy = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Privacy Policy</Text>
            <Text style={styles.content}>
                Welcome to our application. We are committed to protecting your privacy. This privacy policy outlines how we collect, use, and protect your personal information.
            </Text>
            <Text style={styles.subHeader}>1. Information Collection</Text>
            <Text style={styles.content}>
                We collect personal information that you provide to us directly, such as when you create an account, update your profile, or make transactions. This may include your name, email address, phone number, and payment information.
            </Text>
            <Text style={styles.subHeader}>2. Use of Information</Text>
            <Text style={styles.content}>
                We use the information we collect to provide, maintain, and improve our services. This includes processing transactions, sending notifications, and providing customer support.
            </Text>
            <Text style={styles.subHeader}>3. Information Sharing</Text>
            <Text style={styles.content}>
                We do not share your personal information with third parties, except as necessary to provide our services or comply with the law. We may share anonymized data with partners for analytics and marketing purposes.
            </Text>
            <Text style={styles.subHeader}>4. Data Security</Text>
            <Text style={styles.content}>
                We implement appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no security measures are perfect or impenetrable.
            </Text>
            <Text style={styles.subHeader}>5. Your Rights</Text>
            <Text style={styles.content}>
                You have the right to access, update, or delete your personal information. You can manage your account settings through the app or contact us directly for assistance.
            </Text>
            <Text style={styles.subHeader}>6. Changes to This Policy</Text>
            <Text style={styles.content}>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page. Your continued use of the app after changes are made constitutes acceptance of the new policy.
            </Text>
            <Text style={styles.content}>
                If you have any questions about this privacy policy, please contact us at support@example.com.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.brown,
        alignSelf: 'center'
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: COLORS.brown
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        color: COLORS.brown
    },
});

export default PrivacyPolicy;
