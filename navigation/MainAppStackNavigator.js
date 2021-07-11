import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import LandingScreen from '../screens/LandingScreen';
import AuthStackNavigator from './AuthStackNavigator';
import ScannerBottomNavigator from './ScannerBottomNavigator';
import LandingScreen from '../screens/LandingScreen';

const MainStack = createStackNavigator();

export default function MainAppNavigator() {
  return (
    <MainStack.Navigator headerMode="none">
      <MainStack.Screen name="LandingScreen" component={LandingScreen} />
      {/* <MainStack.Screen
        name="AuthStackNavigator"
        component={AuthStackNavigator}
      /> */}
      <MainStack.Screen
        name="ScannerBottomNavigator"
        component={ScannerBottomNavigator}
      />
    </MainStack.Navigator>
  );
}
