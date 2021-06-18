import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ScannerScreen from '../screens/ScannerScreen';
import AttendeesListScreen from '../screens/AttendeesListScreen';
import {MAIN_COLOR, WHITE} from '../utility/colors';

const Tab = createBottomTabNavigator();

export default function ScannerBottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Scanner') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Attendees') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
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
        name="ScannerScreen"
        component={ScannerScreen}
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
