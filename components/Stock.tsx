import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Base, Typography } from '../styles';
import productModel from '../models/products';

function StockList({products, setProducts}) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const list = products.map((product, index) => <Text style={Typography.normal} key={index}>{product.name} - {product.stock}</Text>);

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock({products, setProducts}) {
    return (
        <ScrollView>
            <View style={Base.scroll}>
                <Text style={Typography.header4}>Lagerförteckning</Text>
                <StockList products={products} setProducts={setProducts}/>
            </View>
        </ScrollView>
    );
}