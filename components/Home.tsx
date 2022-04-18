import { ScrollView, Image, View } from 'react-native';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock';
import { Base } from '../styles';
import authModel from '../models/auth';
import { useEffect } from 'react';

export default function Home({products, setProducts, setIsLoggedIn, route}) {
    let { isLoggedIn } = route.params || true;

    if (isLoggedIn == false) {
        useEffect(() => {
            (async () => {
                setIsLoggedIn(await authModel.loggedIn())
            })()
        }, []);
        route.params = false;
    }
    return (
        <ScrollView>
            <View style={Base.scroll}>
                <Image source={warehouse} style={{ width: "100%" }} />
                <Stock products={products} setProducts={setProducts} />
            </View>
        </ScrollView>
    );
}