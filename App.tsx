/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Route from './src/route';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}

export default App;
