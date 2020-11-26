import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CoinsStack from './src/features/coins/Coins.stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from './src/theme/colors';
import FavoritesStack from './src/features/favorites/Favorites.stack';

// Images
import bank from './src/assets/bank.png';
import start from './src/assets/star.png';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: 'blue',
          style: {
            backgroundColor: COLORS.primary,
          },
        }}>
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image style={{tintColor: color, width: size, height: size}} source={bank} />
            ),
          }}
        />
        <Tabs.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image style={{tintColor: color, width: size, height: size}} source={start} />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
