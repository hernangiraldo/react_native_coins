import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../../../theme/colors';

const Stack = createStackNavigator();

export default function AppStackNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
          shadowOpacity: 0,
        },
        headerTintColor: COLORS.background,
        headerBackTitleVisible: false,
      }}>
      {props.children}
    </Stack.Navigator>
  );
}
