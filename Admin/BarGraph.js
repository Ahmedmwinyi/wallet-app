import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = {
    labels: ['Day', 'Week', 'Month', 'Year'],
    datasets: [
        {
            data: [30, 200, 450, 1200],
        },
    ],
};

const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#ffa726',
    },
};

const BarGraph = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transactions Overview</Text>
            <BarChart
                style={styles.graphStyle}
                data={data}
                width={screenWidth - 20}
                height={220}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        bottom: 40
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    graphStyle: {
        borderRadius: 16,
    },
});

export default BarGraph;
