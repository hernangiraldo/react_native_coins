import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsPage from './pages/Coins.page';
import CoinDetailPage from './pages/CoinDetail.page';
import AppStackNavigator from '../shared/components/AppStackNavigator';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <AppStackNavigator>
      <Stack.Screen name="CoinsPage" component={CoinsPage} />
      <Stack.Screen name="CoinDetailPage" component={CoinDetailPage} />
    </AppStackNavigator>
  );
};

export default CoinsStack;
