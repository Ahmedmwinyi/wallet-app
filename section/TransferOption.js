import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TransferOption = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
            <Text style={styles.optionText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    optionContainer: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    optionText: {
        fontSize: 18,
        color: '#333',
    },
});

export default TransferOption;
