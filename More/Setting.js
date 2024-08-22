import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/theme';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const username = "Ahmed January"; // This should be dynamically fetched from user data
    const mobileNumber = "0776 799 666";

    const handleSocialPress = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Feather name="user" size={50} color={COLORS.gray} />
            </View>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.mobileNumber}>
                <Text style={{}}>{mobileNumber}</Text>
            </View>
            <View style={styles.section}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ProfileScreen")}>
                    <Ionicons name="person-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>User Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Security')}>
                    <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>Security</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyPolicy')}>
                    <Ionicons name="document-text-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>App Settings</Text>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TimeZone')}>
                    <Ionicons name="time-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>Time Zone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Language')}>
                    <Ionicons name="language-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>Language</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Notification')}>
                    <Ionicons name="notifications-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>Notification</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Support</Text>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FAQScreen')}>
                    <Ionicons name="help-circle-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Chat')}>
                    <Ionicons name="chatbox-ellipses-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>CHAT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('LogoutScreen')}>
                    <Ionicons name="log-out-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('DeleteAcconut')}>
                    <Ionicons name="trash-outline" size={20} style={styles.icon} />
                    <Text style={styles.optionText}>Delete Account</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.socialIcons}>
                <TouchableOpacity onPress={() => handleSocialPress('https://www.facebook.com')}>
                    <FontAwesome name="facebook-square" size={30} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSocialPress('https://www.instagram.com/official_Janu13')}>
                    <FontAwesome name="instagram" size={30} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSocialPress('https://www.twitter.com/AhmeidJanu')}>
                    <FontAwesome name="twitter" size={30} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        width: 70,
        height: 70,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        borderRadius: 70 / 2,
        alignSelf: 'center'
    },
    userIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: COLORS.brown
    },
    section: {
        marginTop: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    icon: {
        marginRight: 10,
        color: COLORS.brown,
    },
    optionText: {
        fontSize: 16,
        color: COLORS.brown,
    },
    oval: {
        position: 'absolute',
    },
    mobileNumber: {
        width: 100,
        height: 30,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        backgroundColor: "#f5f5f5",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        right: 20
    },
    section: {
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 12,
        marginBottom: 10,
        color: COLORS.gray
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
    },
    socialIcon: {
        marginHorizontal: 10,
        color: COLORS.primary, // Facebook Blue
    },
});

export default SettingsScreen;
