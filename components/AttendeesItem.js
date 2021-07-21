import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {LIGHTER_GREY} from '../utility/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utility/constants';

export default function AttendeesItem({item}) {
  const {name, email, number_of_guest, phone, reserved_for} = item;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20}}>{name}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text>{email}</Text>
        <Text>{phone}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={{textTransform: 'capitalize'}}>{reserved_for}</Text>
        <Text>{number_of_guest}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.11,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 8,
    alignSelf: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(190, 190, 190)',
        shadowOpacity: 0.6,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
