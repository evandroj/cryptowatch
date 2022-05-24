import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { Input, Text } from 'react-native-elements'
import { Feather as Icon } from '@expo/vector-icons'

export default function App() {

  const [data, setData] = useState({});
  const [text, setText] = useState('BTCUSDT');
  const [symbol, setSymbol] = useState('btcusdt');

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onMessage: () => {
      if (lastJsonMessage) {
        setData(lastJsonMessage);
      }
    },
    onError: (event) => alert(event),
    shouldReconnect: () => true,
    reconnectInterval: 30000
  });

  const searchButton = <Icon.Button
    name="search"
    size={24}
    color="black"
    backgroundColor="transparent"
    onPress={evt => setSymbol(text.toLowerCase())} />

  return (
    <View style={styles.container}>
      <Text h1>CryptoWatch 1.0</Text>
      <Input autoCapitalize="characters"
        leftIcon={<Icon name="dollar-sign" size={24} color="black" />}
        rightIcon={searchButton}
        value={text}
        onChangeText={setText} />
      {/* <View>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </View> */}
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Price:</Text>
        <Text style={styles.conteudo}>{data.c}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>%:</Text>
        <Text style={styles.conteudo}>{data.P}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 40,
    margin: 20,
    alignContent: 'center'
  },
  rotulo: {
    fontWeight: 'bold',
    fontSize: 18
  },
  conteudo: {
    fontSize: 18
  },
  linha: {
    flexDirection: 'row',
    margin: 8,
  }
});
