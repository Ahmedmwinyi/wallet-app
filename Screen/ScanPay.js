import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../stackscreen/Button';

const ScanPay = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanResult, setScanResult] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState('');

    const payBill = async () => {
        const sessionKey = await AsyncStorage.getItem('sessionKey');
        const url = 'http://192.168.43.254:8088/bill/payment?key=';
        const key = sessionKey;

        const billData = {
            consumerNo: 'XXXYYZ',
            billType: 'Bill Payment',
            amount: parseFloat(amount),
            receiver: scanResult,
            paymentDateTime: new Date().toISOString(),
        };

        try {
            const response = await fetch(url + key, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });

            if (!response.ok) {
                throw new Error('Failed to pay bill');
            }

            const responseData = await response.json();
      
            console.log('Bill paid successfully:', responseData);

            
            Alert.alert('Success', 'Bill paid successfully', [
                {
                    text: 'OK',
                    onPress: () => setModalVisible(false), 
                },
            ]);
        } catch (error) {
            console.error('Error paying bill:', error.message);
            
            Alert.alert('Error', 'Failed to pay bill');
            console.log(billData)
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setScanResult(data);
        setModalVisible(true);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.header}
            >
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Ionicons name="qr-code-outline" size={40} color="#fff" />
                    <Text style={styles.headerText}>Scan/Pay</Text>
                    <Text style={styles.headerSubText}>Scan QR Codes to Pay</Text>
                </View>
            </LinearGradient>

            <View style={styles.scannerContainer}>
                {!scanned && (
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                )}
                {scanned && (
                    <TouchableOpacity
                        style={styles.rescanButton}
                        onPress={() => setScanned(false)}
                    >
                        <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                        <Text style={styles.scanResultText}>Scan Result:</Text>
                        {/* <Text style={styles.scanResult}>{scanResult}</Text> */}
                        <TextInput 
                            style={styles.scanResult}
                            value={receiver} 
                            onChangeText={setReceiver}
                            placeholder={scanResult}
                        />
                        <TextInput
                            style={styles.amountInput}
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <Button
                            style={styles.payButton}
                            onPress={payBill}
                            title="Pay"
                            filled
                        />
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
        height: 200,
        width: "110%",
        right: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    headerContent: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    headerSubText: {
        fontSize: 16,
        color: '#fff',
    },
    scannerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    cameraOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 10,
        elevation: 5,
    },
    scannerBox: {
        width: '80%',
        height: '60%',
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerBoxOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2,
    },
    rescanButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        marginTop: 20,
    },
    rescanButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        maxHeight: '50%',
    },
    closeText: {
        fontSize: 18,
        color: COLORS.red,
        textAlign: 'right',
        marginBottom: 20,
    },
    scanResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.brown
    },
    scanResult: {
        fontSize: 16,
        color: COLORS.brown,
        marginBottom: 20,
    },
    amountInput: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    payButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
});


export default ScanPay;
