import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function Action() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ScanScreen')}>
                <View style={styles.areaButton}>
                    <MaterialCommunityIcons name="line-scan" size={24} color={COLORS.brown} />
                </View>
                <Text style={styles.labelButton}> Scan/Pay </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Deposit')}>
                <View style={styles.areaButtons}>
                    <AntDesign name="plus" size={24} color="white" />
                </View>
                <Text style={styles.labelButton} >Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Withdraw")}>
                <View style={styles.areaButton}>
                    <AntDesign name="arrowdown" size={24} color={COLORS.brown} />
                </View>
                <Text style={styles.labelButton} >Withdrawal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate("Transfer")}>
                <View style={styles.areaButton}>
                    <MaterialCommunityIcons name="arrow-right-top" size={24} color={COLORS.brown} />
                </View>
                <Text style={styles.labelButton} >Transfer</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf9f9",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -44,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 4,
        paddingTop: 32,
        paddingBottom: 22,
        zIndex: 99
    },
    actionButton: {
        alignItems: 'center',
        marginRight: 32
    },
    areaButton: {
        backgroundColor: "#ecf0f1",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    areaButtons: {
        backgroundColor: "#82CD47",
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton: {
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold',
        color: COLORS.brown
    }
})