import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import DismissKeyboard from '../../components/DismissKeyboard';
import Header from '../../components/Header';
import InputText from '../../components/InputText';
import MyButton from '../../components/MyButton';
import {LIGHT_GREY} from '../../utility/colors';
import {validate} from '../../utility/validation';
import {styles} from './style';
import {getBaseUrl, showToast} from '../../utility/helpers';
import {ERROR_MESSAGE, TIMEOUT_MESSAGE} from '../../utility/constants';

const VerificationScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState({
    field: 'Code',
    value: '',
    validationRules: {
      minLength: 5,
    },
  });

  const goBack = () => navigation.goBack();

  const verifyHandler = async () => {
    let error = validate(code.value, code.validationRules, code.field);
    if (error) {
      showToast(error);
    } else {
      try {
        setIsLoading(true);
        const url = await getBaseUrl();
        const res = await fetch(`${url}api/verify/rsvp/${code.value}`, {
          method: 'POST',
        });

        setTimeout(() => {
          setIsLoading(false);
          if (!res) showToast(TIMEOUT_MESSAGE, 'long');
        }, 15000);

        setIsLoading(false);
        if (res.status === 200 || res.status === 201) {
          const resJson = await res.json();
          console.warn('ResJson...', resJson);
          showToast('Successful');
          // Alert.alert('Success')
          navigation.navigate('ScannerScreen');
          return;
        }

        showToast('Clock in failed', 'long');
      } catch (error) {
        setIsLoading(false);
        console.log('Error while submitting', error);
        showToast(ERROR_MESSAGE, 'long');
        return;
      }
    }
  };

  return (
    <>
      <Header
        leftIcon="ios-arrow-back"
        title="Enter Ticket Code"
        onLeftPress={goBack}
      />

      <DismissKeyboard>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.codeText}>Enter the code on the ticket</Text>
            <InputText
              placeholder="Enter ticket code"
              placeholderTextColor={LIGHT_GREY}
              containerStyle={styles.containerStyle}
              autoCorrect={false}
              value={code.value}
              onSubmitEditing={() => {}}
              onChangeText={input => setCode({...code, value: input})}
              autoCapitalize="none"
              returnKeyType="go"
            />
            <MyButton
              text="Send"
              isLoading={isLoading}
              style={styles.btn}
              onPress={verifyHandler}
            />
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    </>
  );
};

export default VerificationScreen;
