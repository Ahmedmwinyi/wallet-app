import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

const TimeZone = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTimeZone, setSelectedTimeZone] = useState('Select Time Zone');

    const timeZones = [
        { id: '1', name: 'Pacific Time (PT)' },
        { id: '2', name: 'Mountain Time (MT)' },
        { id: '3', name: 'Central Time (CT)' },
        { id: '4', name: 'Eastern Time (ET)' },
        { id: '5', name: 'Greenwich Mean Time (GMT)' },
        { id: '6', name: 'Central European Time (CET)' },
        { id: '7', name: 'Eastern European Time (EET)' },
        { id: '8', name: 'Japan Standard Time (JST)' },
        { id: '9', name: 'Australian Eastern Time (AET)' },
        { id: '10', name: 'Indian Standard Time (IST)' },
    ];

    const renderTimeZoneItem = ({ item }) => (
        <TouchableOpacity
            style={styles.timeZoneItem}
            onPress={() => {
                setSelectedTimeZone(item.name);
                setModalVisible(false);
            }}
        >
            <Text style={styles.timeZoneText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons name="time-outline" size={30} style={styles.icon} />
            </View>
            <Text style={styles.header}>Time Zone</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>{selectedTimeZone}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Select Time Zone</Text>
                        <FlatList
                            data={timeZones}
                            renderItem={renderTimeZoneItem}
                            keyExtractor={(item) => item.id}
                        />
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
    header: {
        fontSize: 24,
        marginBottom: 50,
        alignSelf: 'center',
        color: COLORS.brown
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.brown
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 10,
        padding: 20,
        maxHeight: 500,
        top: 137
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timeZoneItem: {
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    timeZoneText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        alignItems: 'center'
    },
    closeButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width: 40,
        height: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        borderRadius: 70 / 2,
        alignSelf: 'center'
    }
});

export default TimeZone;
