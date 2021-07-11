import {StyleSheet} from 'react-native';
import {SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bImage: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: SCREEN_HEIGHT * 0.13,
  },
  image: {width: '100%', height: '100%'},
  content: {},
  btnStyle: {
    backgroundColor: SECONDARY_COLOR,
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: '100',
    textAlign: 'center',
  },
});
