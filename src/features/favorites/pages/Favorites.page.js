import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, FlatList} from 'react-native';
import EmptyFavoritesState from '../components/EmptyFavoritesState';
import Storage from '../../../libs/Storage';
import ItemCoins from '../../coins/components/CoinsItem';

export default function FavoritesPage() {
  const [isEmpty, setIsEmpty] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(() => {
    async function getFavorites() {
      const store = Storage.instance;
      const keys = await store.getAllKeys();

      if (!keys?.length) {
        setIsEmpty(true);
        return;
      }

      const multi = await store.multiGet(keys);
      const favs = multi.map((item) => JSON.parse(item[1]));
      setFavorites(favs);
    }

    getFavorites().then();
  }, []);

  return (
    <View>
      {isEmpty ? (
        <EmptyFavoritesState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({item}) => <ItemCoins item={item} />}
        />
      )}
    </View>
  );
}
