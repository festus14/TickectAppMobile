import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Header from '../../components/Header';

const AttendeesListScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Attendees" />
    </SafeAreaView>
  );
};

export default AttendeesListScreen;
