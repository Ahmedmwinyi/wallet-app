import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Movements({ data }) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.date}>{data.date}</Text>

            <View style={styles.content}>
                <Text style={styles.label}>{data.label}</Text>
                <Text style={data.type === 1 ? styles.value : styles.expenses}>
                    {data.type === 1 ? `$ ${data.value}` : `$ ${data.value}`}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 13,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    content: {
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 8
    },
    date: {
        color: "#dadada",
        fontWeight: "bold"
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        right: 100
    },
    value: {
        fontSize: 16,
        color: "#2ecc71",
        fontWeight: 'bold',
    },
    expenses: {
        fontSize: 16,
        color: "#e74c3c",
        fontWeight: "bold"
    }
})