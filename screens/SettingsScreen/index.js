import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, SafeAreaView, Text, View} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {LIGHT_GREY} from '../../utility/colors';
import {ERROR_MESSAGE} from '../../utility/constants';
import {setBaseUrl, showToast} from '../../utility/helpers';
import {styles} from './style';

const SettingsScreen = ({navigation}) => {
  const [url, setUrl] = useState({
    field: 'Url',
    value: '',
    validationRules: {
      minLength: 5,
    },
  });

  const setUrlHandler = async value => {
    try {
      let res = await setBaseUrl(value);
      if (res) {
        showToast('Successful', 'long');
        navigation.navigate('ScannerStackNavigator');
      } else showToast(ERROR_MESSAGE, 'long');
    } catch (error) {
      showToast(ERROR_MESSAGE, 'long');
      console.log('Setting url failed', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Settings" />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.urlText}>Enter new url</Text>
            <InputText
              placeholder="Enter url"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={url.value}
              onSubmitEditing={() => {}}
              onChangeText={input => setUrl({...url, value: input})}
              autoCapitalize="none"
              returnKeyType="go"
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <MyButton
                text="Save"
                style={styles.btn}
                onPress={() => setUrlHandler(url.value)}
              />
              <MyButton
                text="Reset"
                style={{...styles.btn, backgroundColor: LIGHT_GREY}}
                onPress={() => setUrlHandler('')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

export default SettingsScreen;
