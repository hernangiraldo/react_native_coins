import React, {useState} from 'react';
import {View, TextInput, Platform, StyleSheet} from 'react-native';
import { COLORS } from '../../../theme/colors';

export default function CoinsSearch({onChange}) {
  const [query, setQuery] = useState('');

  function handleTextChange(searchQuery) {
    setQuery(searchQuery);

    if (!onChange) {
      return;
    }

    onChange(searchQuery);
  }

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIos : styles.textInputAndroid,
        ]}
        onChangeText={handleTextChange}
        value={query}
        placeholder="Search coin"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    padding: 16,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.borders,
  },
  textInputIos: {
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borders,
  },
});
