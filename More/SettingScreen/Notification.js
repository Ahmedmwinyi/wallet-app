import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme'; // Make sure to import your theme colors

const Notification = () => {
    const [emailOffers, setEmailOffers] = useState(true);
    const [smsOffers, setSmsOffers] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <Feather name="bell" size={30} style={styles.icon} />
            </View>
            <Text style={styles.header}>Notification</Text>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Marketing Preferences</Text>
                <Text style={styles.subText}>Stay up to date on activity, tips, suggestions</Text>

                <View style={styles.preferenceItem}>
                    <Feather name="mail" size={24} color={COLORS.brown} style={{ marginRight: 10, bottom: 10 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.preferenceText}>Email Offers</Text>
                        <Text style={styles.preferenceDescription}>Get marketing messages, promotions, and exclusive offers in your mailbox</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: COLORS.primary }}
                        thumbColor={emailOffers ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setEmailOffers(!emailOffers)}
                        value={emailOffers}
                    />
                </View>

                <View style={styles.preferenceItem}>
                    <Feather name="message-square" size={24} color={COLORS.brown} style={{marginRight: 10, bottom: 10}} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.preferenceText}>SMS Offers</Text>
                        <Text style={styles.preferenceDescription}>Get text messages about promotions and exclusive offers</Text>
                    </View>
                    <Switch
                        trackColor={{ false: "#767577", true: COLORS.primary }}
                        thumbColor={smsOffers ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setSmsOffers(!smsOffers)}
                        value={smsOffers}
                    />
                </View>
            </View>

            {/* Modal for confirmation */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Your preferences have been updated.</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    sectionHeader: {
        alignItems: 'center',
        marginBottom: 20,
        width: 60,
        height: 60,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        borderRadius: 70 / 2,
        alignSelf: 'center'
    },
    icon: {
        color: COLORS.brown,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        alignSelf: 'center',
        marginBottom: 30
    },
    section: {
        marginBottom: 20,
        borderWidth: 0.5,
        borderColor: COLORS.gray,
        borderRadius: 15
    },
    subHeader: {
        fontSize: 20,
        marginBottom: 10,
        color: COLORS.brown,
        marginLeft: 15,
        marginTop: 20
    },
    subText: {
        marginLeft: 15,
        marginBottom: 40,
        color: COLORS.gray
    },
    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 15,
    },
    preferenceText: {
        fontSize: 16,
        color: COLORS.brown,
        marginLeft: 3,
    },
    preferenceDescription: {
        fontSize: 14,
        color: COLORS.gray,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default Notification;
