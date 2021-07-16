import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, SafeAreaView, Text, View} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {LIGHT_GREY} from '../../utility/colors';
import {setBaseUrl} from '../../utility/helpers';
import {styles} from './style';

const SettingsScreen = ({navigation}) => {
  const [url, setUrl] = useState({
    field: 'Url',
    value: '',
    validationRules: {
      minLength: 5,
    },
  });

  const setUrlHandler = async () => {
    try {
      await setBaseUrl(url.value);
    } catch (error) {
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
            <Text style={styles.urlText}>Enter the url on the ticket</Text>
            <InputText
              placeholder="Enter ticket url"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={url.value}
              onSubmitEditing={() => {}}
              onChangeText={input => setUrl({...url, value: input})}
              autoCapitalize="none"
              returnKeyType="go"
            />
            <MyButton
              text="Save"
              isLoading={isLoading}
              style={styles.btn}
              onPress={setUrlHandler}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

export default SettingsScreen;
