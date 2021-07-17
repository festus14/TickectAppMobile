import {StyleSheet} from 'react-native';
import {MAIN_COLOR, SECONDARY_COLOR} from '../../utility/colors';
import {SCREEN_HEIGHT} from '../../utility/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  infoImage: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
  },
  bImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom: {
    backgroundColor: '#fff',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoHeader: {
    marginBottom: 20,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 2,
  },
  topTab: {
    color: '#fff',
    justifyContent: 'flex-end',
    marginBottom: 30,
    height: 20,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingHorizontal: 12,
  },
  activeTopTab: {
    borderBottomWidth: 1,
    borderBottomColor: SECONDARY_COLOR,
  },
  topText: {
    justifyContent: 'center',
    fontWeight: '100',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  empty: {
    alignItems: 'center',
  },
  emptyText: {
    padding: 20,
  },
  btnStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderColor: MAIN_COLOR,
    borderWidth: 1,
  },
  textStyle: {
    color: MAIN_COLOR,
    textAlign: 'center',
    paddingLeft: 10,
  },
  topBar: {
    marginVertical: 12,
  },
  scrollView: {
    flex: 1,
    height: SCREEN_HEIGHT,
  },
});
