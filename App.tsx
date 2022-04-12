import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './components/Home.tsx';
import Pick from "./components/Pick.tsx";
import Deliveries from "./components/Deliveries.tsx";
import { Base, Typography } from './styles';
import { useState } from 'react';

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Inleverans": "car",
};

export default function App() {
    const [products, setProducts] = useState([]);

    return (
        <SafeAreaView style={Base.container}>
            <View style={Base.base}>
                <Text style={Typography.header1}>Lager-Appen</Text>
                <StatusBar style="auto" />
                <NavigationContainer>
                    <Tab.Navigator screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName = routeIcons[route.name] || "alert";
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'blue',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                    })}
                    >
                        <Tab.Screen name="Lager">
                            {() => <Home products={products} setProducts={setProducts} />}
                        </Tab.Screen>
                        <Tab.Screen name="Plock">
                            {() => <Pick products={products} setProducts={setProducts} />}
                        </Tab.Screen>
                        <Tab.Screen name="Inleverans">
                            {() => <Deliveries products={products} setProducts={setProducts} />}
                        </Tab.Screen>
                    </Tab.Navigator>
                </NavigationContainer>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    );
}