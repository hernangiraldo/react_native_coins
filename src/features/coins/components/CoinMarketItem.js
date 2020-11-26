import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../../theme/colors';

export default function CoinMarketItem({item}) {
  const {name, price} = item;
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    borderColor: COLORS.borders,
    borderWidth: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  price: {
    marginTop: 4,
  },
});
