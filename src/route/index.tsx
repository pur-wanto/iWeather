import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Detail, Story } from '../pages';
import React from 'react';

export type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Story: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function Route() {
  const Off = { headerShown: false }

  return (
    <Stack.Navigator initialRouteName='Story'>
      <Stack.Screen name="Home" component={Home} options={Off} />
      <Stack.Screen name="Detail" component={Detail} options={Off} />
      <Stack.Screen name="Story" component={Story} options={Off} />
    </Stack.Navigator>
  );
}

export default Route;