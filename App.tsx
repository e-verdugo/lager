import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './components/Home';
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import Auth from "./components/Auth";
import Invoice from "./components/Invoice";
import authModel from "./models/auth";
import { Base, Typography } from './styles';
import { useState, useEffect } from 'react';

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Inleverans": "car",
    "Logga in": "key",
    "Faktura": "card-outline",
};

export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn())
        })()
    }, []);

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
                            {() => <Home products={products} setProducts={setProducts} setIsLoggedIn={setIsLoggedIn} route />}
                        </Tab.Screen>
                        <Tab.Screen name="Plock">
                            {() => <Pick products={products} setProducts={setProducts} />}
                        </Tab.Screen>
                        <Tab.Screen name="Inleverans">
                            {() => <Deliveries products={products} setProducts={setProducts} />}
                        </Tab.Screen>
                        {isLoggedIn ?
                        <Tab.Screen name="Faktura" component={Invoice} /> :
                        <Tab.Screen name="Logga in">
                            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                        </Tab.Screen>
                        }
                    </Tab.Navigator>
                </NavigationContainer>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    );
}