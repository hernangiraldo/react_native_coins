import React from 'react';
import {Text, View, StyleSheet, Image, Pressable} from 'react-native';
import {COLORS} from '../../../theme/colors';
import arrowUp from '../../../assets/arrow_up.png';
import arrowDown from '../../../assets/arrow_down.png';

function ItemCoins({item, onPress}) {
  const {
    percent_change_1h: percentage,
    symbol,
    name,
    price_usd: priceUsd,
  } = item;

  const priceColor = () => {
    return {
      marginTop: 4,
      fontWeight: 'bold',
      color: percentage > 0 ? COLORS.success : COLORS.danger,
    };
  };

  const getImageArrow = () => {
    return percentage > 0 ? arrowUp : arrowDown;
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={priceColor()}>{`US $${priceUsd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentage}>{percentage}</Text>
        <Image style={styles.arrowImage} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borders,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbol: {
    fontWeight: 'bold',
  },
  name: {
    color: '#666',
    marginTop: 4,
  },
  arrowImage: {
    height: 18,
    width: 18,
    marginLeft: 8,
  },
  percentage: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default ItemCoins;
