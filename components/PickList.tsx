import { View, Text, Button, ScrollView } from "react-native";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';
import productModel from '../models/products';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    let canPick;
    let isEnough = true;

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

    const checkIfEnough = order.order_items.map((item) => {
        if (item.amount > item.stock) {
            isEnough = false;
        }
    });

    const enough = order.order_items.map((item, index) => {
        return <Button title={item.name + " finns på lager. Plocka order?"} onPress={pick} key={index}/>
    });
    const notEnough = (<Text style={Typography.normal}>För få artiklar på lager.</Text>)

    if (isEnough) {
        canPick = enough;
    } else {
        canPick = notEnough;
    }

    return (
        <ScrollView>
        <View style={Base.scroll}>
            <Text style={Typography.normal}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>
            <Text style={Typography.header4}>Produkter:</Text>
            {orderItemsList}
            {canPick}
        </View>
        </ScrollView>
    )
};
