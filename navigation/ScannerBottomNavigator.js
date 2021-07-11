import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AttendeesListScreen from '../screens/AttendeesListScreen';
import {MAIN_COLOR, WHITE} from '../utility/colors';
import ScannerStackNavigator from './ScannerStackNavigator';

const Tab = createBottomTabNavigator();

export default function ScannerBottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'ScannerStackNavigator') {
            iconName = focused ? 'ios-scan-circle' : 'ios-scan-circle-outline';
          } else if (route.name === 'AttendeesListScreen') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: WHITE,
        activeBackgroundColor: MAIN_COLOR,
        inactiveTintColor: MAIN_COLOR,
        inactiveBackgroundColor: WHITE,
      }}>
      <Tab.Screen
        name="ScannerStackNavigator"
        component={ScannerStackNavigator}
        options={{title: 'Scanner'}}
      />
      <Tab.Screen
        name="AttendeesListScreen"
        component={AttendeesListScreen}
        options={{title: 'Attendees'}}
      />
    </Tab.Navigator>
  );
}
