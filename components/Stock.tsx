import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import config from "../config/config.json";

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text style={styles.lagerforteckning} key={index}>{ product.name } - { product.stock }</Text>);

  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock() {
  return (
    <View>
      <Text style={styles.lagernamn}>Lagerförteckning</Text>
      <StockList />
    </View>
  );
}

const styles = StyleSheet.create({
  lagerforteckning: {
    backgroundColor: '#444',
    color: '#bbb',
    fontSize: 12,
    width: '100%',
    paddingLeft: 12,
    paddingRight: 12,
  },
  lagernamn: {
    backgroundColor: '#444',
    color: '#bbb',
    fontSize: 24,
    width: '100%',
    padding: 12,
  }
});
