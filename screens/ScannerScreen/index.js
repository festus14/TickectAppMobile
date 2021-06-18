import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Header from '../../components/Header';
import {styles} from './style';

const ScannerScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Scanner" />

      <QRCodeScanner
        onRead={() => console.log('Success')}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

export default ScannerScreen;
