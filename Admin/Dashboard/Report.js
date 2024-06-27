import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS } from '../../constants/theme';

const Report = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('day');
    const [open, setOpen] = useState(false);

    // Example wallet data (should be replaced with actual data source)
    const walletData = [
        { id: 1, date: '2024-06-24', amount: 100 },
        { id: 2, date: '2024-06-23', amount: 200 },
        { id: 3, date: '2024-06-22', amount: 300 },
        { id: 4, date: '2024-05-20', amount: 400 },
        { id: 5, date: '2024-05-19', amount: 500 },
        { id: 6, date: '2023-06-24', amount: 600 },
        { id: 7, date: '2023-06-23', amount: 700 },
    ];

    // Filter functions
    const filterByDay = (data) => {
        return data.reduce((acc, curr) => {
            const date = curr.date;
            if (!acc[date]) {
                acc[date] = { date, total: 0 };
            }
            acc[date].total += curr.amount;
            return acc;
        }, {});
    };

    const filterByWeek = (data) => {
        return data.reduce((acc, curr) => {
            const week = getWeek(curr.date);
            if (!acc[week]) {
                acc[week] = { week, total: 0 };
            }
            acc[week].total += curr.amount;
            return acc;
        }, {});
    };

    const filterByMonth = (data) => {
        return data.reduce((acc, curr) => {
            const month = curr.date.substring(0, 7); // YYYY-MM
            if (!acc[month]) {
                acc[month] = { month, total: 0 };
            }
            acc[month].total += curr.amount;
            return acc;
        }, {});
    };

    const filterByYear = (data) => {
        return data.reduce((acc, curr) => {
            const year = curr.date.substring(0, 4); // YYYY
            if (!acc[year]) {
                acc[year] = { year, total: 0 };
            }
            acc[year].total += curr.amount;
            return acc;
        }, {});
    };

    const getWeek = (date) => {
        const d = new Date(date);
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    };

    const getFilteredData = () => {
        let filteredData;
        switch (filter) {
            case 'day':
                filteredData = filterByDay(walletData);
                break;
            case 'week':
                filteredData = filterByWeek(walletData);
                break;
            case 'month':
                filteredData = filterByMonth(walletData);
                break;
            case 'year':
                filteredData = filterByYear(walletData);
                break;
            default:
                filteredData = filterByDay(walletData);
        }
        return Object.values(filteredData);
    };

    const renderItem = ({ item }) => (
        <View style={styles.reportItem}>
            <Text style={styles.reportText}>
                {filter === 'day' ? item.date :
                    filter === 'week' ? `Week ${item.week}` :
                        filter === 'month' ? item.month :
                            item.year}
            </Text>
            <Text style={styles.reportAmount}>${item.total}</Text>
        </View>
    );

    const handleDownloadReport = () => {
        // Placeholder function for downloading reports
        alert(`Download ${filter} report`);
    };

    return (
        <View style={styles.container}>
            {/* Header section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={30} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Reports</Text>
            </View>

            {/* Search input section */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by date"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
            </View>

            {/* Filter selection */}
            <View style={styles.filterContainer}>
                <DropDownPicker
                    open={open}
                    value={filter}
                    items={[
                        { label: 'Day', value: 'day' },
                        { label: 'Week', value: 'week' },
                        { label: 'Month', value: 'month' },
                        { label: 'Year', value: 'year' },
                    ]}
                    setOpen={setOpen}
                    setValue={setFilter}
                    containerStyle={styles.pickerContainer}
                    style={styles.picker}
                    dropDownContainerStyle={styles.dropdown}
                />
            </View>

            {/* Report list section */}
            <View style={styles.reportListContainer}>
                <FlatList
                    data={getFilteredData()}
                    renderItem={renderItem}
                    keyExtractor={item => item.date || item.week || item.month || item.year}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.emptyListText}>No reports found</Text>
                        </View>
                    }
                />
            </View>

            {/* Download report button */}
            <View style={styles.downloadButtonContainer}>
                <Button title={`Download ${filter} report`} onPress={handleDownloadReport} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#d3d3d3',
        height: 80,
        marginTop: 30,
    },
    backButton: {
        padding: 10,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    searchInput: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    filterContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    pickerContainer: {
        height: 50,
    },
    picker: {
        backgroundColor: '#fff',
    },
    dropdown: {
        backgroundColor: '#fff',
    },
    reportListContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    reportItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    reportText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.brown,
    },
    reportAmount: {
        fontSize: 18,
        color: COLORS.primary,
    },
    emptyListContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListText: {
        fontSize: 16,
        color: '#999',
    },
    downloadButtonContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});

export default Report;
