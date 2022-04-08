import { View, Text, Button, ScrollView } from "react-native";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';
import productModel from '../models/products';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text style={Typography.normal}
                key={index}>
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    const checkIfEnough = order.order_items.map((item, index) => {
        if (item.amount < item.stock) {
            return <Button title={item.name + " finns på lager. Plocka order?"} onPress={pick} key={index}/>
        } else {
            return <Text style={Typography.normal} key={index}>För få {item.name} i lager.</Text>
        }
    });

    return (
        <ScrollView>
        <View style={Base.scroll}>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>
            <Text style={Typography.header4}>Produkter:</Text>
            {orderItemsList}
            {checkIfEnough}
        </View>
        </ScrollView>
    )
};
