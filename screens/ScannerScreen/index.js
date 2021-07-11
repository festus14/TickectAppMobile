import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Header from '../../components/Header';
import {styles} from './style';
import {sendRequest, showToast} from '../../utility/helpers';
import InputText from '../../components/InputText';
import {LIGHT_GREY} from '../../utility/colors';
import DismissKeyboard from '../../components/DismissKeyboard';
import MyButton from '../../components/MyButton';
import {useContext} from 'react';
import {Store} from '../../store';

let scanner = null;

const ScannerScreen = ({navigation}) => {
  const {
    state: {
      ui: {isLoading},
    },
    dispatch,
  } = useContext(Store);

  const onRead = async e => {
    try {
      const res = await fetch(
        `http://143.244.148.38/api/verify/rsvp/${e.data}`,
        {method: 'POST'},
      );

      setTimeout(() => {
        if (!res) showToast(TIMEOUT_MESSAGE, 'long');
      }, 15000);

      if (res.status === 200 || res.status === 201) {
        const resJson = await res.json();
        showToast('Successful');
        navigation.navigate('ScannerScreen');
        return;
      }

      showToast('Clock in failed', 'long');
    } catch (error) {
      console.log('Error while submitting', error);
      showToast(ERROR_MESSAGE, 'long');
      return;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Scanner" />

      <QRCodeScanner
        onRead={onRead}
        flashMode={RNCamera.Constants.FlashMode.auto}
        reactivate={true}
        showMarker={true}
        ref={node => (scanner = node)}
        bottomContent={
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
            }}>
            <MyButton
              text="Enter Code"
              isLoading={isLoading}
              style={styles.btn}
              onPress={() => navigation.navigate('CodeScreen')}
            />

            <MyButton
              text="Scan"
              isLoading={isLoading}
              style={styles.btn}
              onPress={() => scanner.reactivate()}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ScannerScreen;
