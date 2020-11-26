import React, {useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useCoins} from '../hooks/useCoins';
import ItemCoins from '../components/CoinsItem';
import {COLORS} from '../../../theme/colors';
import CoinsSearch from '../components/CoinsSearch';

function CoinsPage({navigation}) {
  const [coins, setCoins, allCoins, requestStatus] = useCoins();
  let flatListRef = useRef(null);

  const handlePress = (coin) => {
    navigation.navigate('CoinDetailPage', {coin});
  };

  function handleSearch(query) {
    const coinsFilter = allCoins.filter(({name, symbol}) => {
      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    setCoins(coinsFilter);
  }

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />

      {requestStatus?.loading && (
        <ActivityIndicator style={styles.indicator} color="#000" size="large" />
      )}

      {requestStatus?.success && (
        <FlatList
          ref={(ref) => (flatListRef = ref)}
          data={coins}
          renderItem={({item}) => (
            <ItemCoins item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}

      {requestStatus?.error && <Text>{'error'}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    margin: 16,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: COLORS.background,
  },
  indicator: {
    marginTop: 16,
  },
});

export default CoinsPage;
