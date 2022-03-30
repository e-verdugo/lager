import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{color: '#cc3333', fontSize: 42, margin: 12}}>Lager-Appen</Text>
        <Image source={warehouse} style={{ width: 320, height: 240 }} />
        <Stock />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#222',
    paddingLeft: 12,
    paddingRight: 12,
  },
  html: {
    fontSize: 100,
  },
  body: {
      lineHeight: 1.4,
  },
  h1: {
    marginTop: 0,
    fontFamily: 'Source Sans Pro',
    fontSize: 2.4,
    marginBottom: 2.8,
  },
  h2: {
    marginTop: 0,
    fontFamily: 'Source Sans Pro',
    fontSize: 2,
    marginBottom: 1.4,
  },
  h4: {
      marginTop: 0,
      fontFamily: 'Source Sans Pro',
      fontSize: 1.4,
      marginBottom: 0,
  },
  p: {
      marginTop: 0,
      color: '#bbb',
      fontFamily: 'Merriweather',
      marginBottom: '1.4rem',
      fontSize: 1,
  },
});