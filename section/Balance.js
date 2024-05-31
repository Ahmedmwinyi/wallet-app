import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

export default function Balance({ rev, exp }) {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text style={styles.itemTitle}>Income</Text>
                <View style={styles.content}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <Text style={styles.balance}>{rev}</Text>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.itemTitle}>Expenses</Text>
                <View style={styles.content}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <Text style={styles.expenses}>{exp}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.brown,
        backgroundColor: COLORS.gray,
        justifyContent: "space-between",
        paddingStart: 18,
        paddingEnd: 18,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 4,
    },
    itemTitle: {
        fontSize: 20,
        color: "#dadada"
    },
    content: {
        flexDirection: "row",
        alignItems: "center"
    },
    currencySymbol: {
        color: "#dadada",
        marginRight: 6
    },
    balance: {
        fontSize: 22,
        color: '#3ecc71'
    },
    expenses: {
        fontSize: 22,
        color: '#e74c3c'
    }
})