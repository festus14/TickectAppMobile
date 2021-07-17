import React, {useState, useEffect} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {LIGHTER_GREY, LIGHT_GREY} from '../../utility/colors';
import {API_URL, ERROR_MESSAGE} from '../../utility/constants';
import {setBaseUrl, showToast} from '../../utility/helpers';
import {validate} from '../../utility/validation';
import {styles} from './style';

const SettingsScreen = ({navigation}) => {
  const [url, setUrl] = useState({
    field: 'Url',
    value: '',
    validationRules: {
      isUrl: true,
    },
  });

  const setUrlHandler = async value => {
    const error = validate(url.value, url.validationRules, url.field);
    if (error) Alert.alert('Error', error);
    else {
      try {
        let res = await setBaseUrl(value);
        if (res) {
          showToast('Successful', 'long');
          navigation.navigate('ScannerStackNavigator');
        } else Alert.alert('Error', ERROR_MESSAGE);
      } catch (error) {
        Alert.alert('Error', ERROR_MESSAGE);
        console.log('Setting url failed', error);
      }
    }
  };

  const resetUrlHandler = async () => {
    try {
      setUrl({...url, value: ''});
      await setBaseUrl(API_URL);
    } catch (error) {
      Alert.alert('Error', ERROR_MESSAGE);
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
              placeholder="@example http://143.244.148.38/api/"
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
                style={{...styles.btn, backgroundColor: LIGHTER_GREY}}
                onPress={resetUrlHandler}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

export default SettingsScreen;
