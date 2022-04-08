import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typography } from '../styles';
import orderModel from "../models/orders";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || true;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <ScrollView>
        <View style={Base.scroll}>
            <Text style={Typography.header3}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
        </ScrollView>
    );
}
