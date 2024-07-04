import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screen/Home';
import More from '../Screen/More';
import { Ionicons } from '@expo/vector-icons';
import History from '../Screen/History';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ],
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'History') {
                            iconName = 'list';
                        } else if (route.name === 'More') {
                            iconName = 'menu';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="History" component={History} />
                <Tab.Screen name="More" component={More} />
            </Tab.Navigator>
    );
};

export default App;
