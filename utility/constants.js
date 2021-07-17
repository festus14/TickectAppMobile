import {Dimensions, StatusBar, PixelRatio} from 'react-native';

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 28;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

// For font size
export const SCALE = Math.round(
  PixelRatio.roundToNearestPixel(SCREEN_WIDTH / 320),
);

export const API_URL = 'http://143.244.148.38/api/';

export const ERROR_MESSAGE =
  'Something went wrong, please check your internet and try again!';

export const TIMEOUT_MESSAGE =
  'Request timeout, please your internet and try again!';

export const INVALID_URL =
  'Invalid base url, please go to settings and change or reset the url';
