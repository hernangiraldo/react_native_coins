import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import {COLORS} from '../../../theme/colors';
import {useMarketsCoins} from '../hooks/useMarketCoins';
import CoinMarketItem from '../components/CoinMarketItem';
import Storage from '../../../libs/Storage';

function CoinDetailPage({route, navigation}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const {params} = route;
  const {coin} = params;
  const [marketCoins, requestStatus] = useMarketsCoins(coin.id);

  useEffect(() => {
    let isMounted = true;
    navigation.setOptions({title: coin.symbol});
    return () => (isMounted = false);
  }, [navigation, coin]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const {id} = coin;
      const item = await Storage.instance.get(id);
      setIsFavorite(!!item);
    })();

    return () => (isMounted = false);
  }, [coin]);

  function getImageUri(name) {
    if (!name) {
      return;
    }
    return `https://c1.coinlore.com/img/25x25/${name}.png`;
  }

  function getSections() {
    return [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
  }

  async function handleToggleFavorite() {
    const {id} = coin;
    isFavorite ? removeFavorite(id) : await addFavorite(id);
  }

  async function addFavorite(id) {
    await Storage.instance.store(id, coin);
    setIsFavorite(true);
  }

  function removeFavorite(id) {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          await Storage.instance.remove(id);
          setIsFavorite(false);
        },
        style: 'destructive',
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.subheader}>
        <View style={styles.subheaderLeft}>
          <Image
            style={styles.coinImage}
            source={{uri: getImageUri(coin.nameid)}}
          />
          <Text style={styles.coinName}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={handleToggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.txtFavoriteButton}>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.sectionList}
        sections={getSections()}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <View style={styles.marketContent}>
        <Text style={styles.marketTitle}>Markets</Text>

        {requestStatus?.loading && (
          <ActivityIndicator
            style={styles.indicator}
            color="#000"
            size="large"
          />
        )}
        {requestStatus?.success && (
          <FlatList
            style={styles.flatList}
            horizontal={true}
            data={marketCoins}
            keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
            renderItem={({item}) => <CoinMarketItem item={item} />}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  subheaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  btnFavorite: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: COLORS.primary,
  },
  btnFavoriteRemove: {
    borderRadius: 4,
    backgroundColor: COLORS.danger,
  },
  txtFavoriteButton: {
    color: COLORS.background,
  },
  coinImage: {
    width: 25,
    height: 25,
  },
  coinName: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  sectionList: {
    maxHeight: 200,
  },
  sectionHeader: {
    backgroundColor: COLORS.gray95,
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    fontSize: 14,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketContent: {
    padding: 16,
  },
  marketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flatList: {
    maxHeight: 80,
  },
});

export default CoinDetailPage;
