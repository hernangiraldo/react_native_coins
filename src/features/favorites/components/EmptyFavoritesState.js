import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../../theme/colors';

export default function EmptyFavoritesState() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>
        You don't have selected any favorites coins yet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: COLORS.gray60,
  },
});
