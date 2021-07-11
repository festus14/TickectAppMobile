import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScannerScreen from '../screens/ScannerScreen';
import CodeScreen from '../screens/CodeScreen';

const Stack = createStackNavigator();

export default function ScannerStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
    </Stack.Navigator>
  );
}
