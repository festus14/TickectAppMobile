/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {isMountedRef, navigationRef} from './RootNavigation';
import RootAppStackNavigator from './navigation/RootAppStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootAppStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
