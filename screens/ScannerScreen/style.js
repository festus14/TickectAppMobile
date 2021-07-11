import {StyleSheet} from 'react-native';
import {MAIN_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';

export const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    paddingHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inputStyle: {},
  titleStyle: {},
  codeText: {
    color: '#555',
    fontSize: 17,
    textAlign: 'center',
  },
  containerStyle: {
    marginTop: 30,
  },
  btn: {
    width: '40%',
    // marginTop: 25,
    // justifyContent: 'center',
  },
});
