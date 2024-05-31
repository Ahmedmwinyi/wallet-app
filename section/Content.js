import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

export default function Content() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.renderAmount}>
                    <Text style={styles.amount}>$ </Text>
                    <Text style={styles.amount}>100.00</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flexDirection: 'column',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44
    },
    content: {
        alignContent: 'center',
        alignItems: 'center',
    },
    currency: {
        fontSize: 38,
        bottom: 20,
        color: "#fff",
        fontWeight: 'bold'
    },
    buttonUser: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255,255,255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44 / 2,
    },
    renderAmount: {
        flexDirection: 'row'
    },
    amount: {
        fontSize: 45,
        bottom: 20,
        color: "#fff",
        fontWeight: 'bold'
    }
})