import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesPage from './pages/Favorites.page';
import AppStackNavigator from '../shared/components/AppStackNavigator';

const Stack = createStackNavigator();

export default function FavoritesStack() {
  return (
    <AppStackNavigator>
      <Stack.Screen name="Favorites" component={FavoritesPage} />
    </AppStackNavigator>
  );
}
