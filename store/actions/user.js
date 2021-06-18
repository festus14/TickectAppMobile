import {SET_USER} from './actionTypes';
import {API_URL} from '../../utility/constants';
import {userUiStartLoading, userUiStopLoading, getAuthToken} from './';
import RNSecureKeyStore from 'react-native-secure-key-store';
import {sendRequest, sendPictureRequest} from '../../utility/helpers';

export const setUser = user => {
  return {
    type: SET_USER,
    user,
  };
};

export const getUserId = () => {
  return async (dispatch, state) => {
    try {
      let userId = await state.auth.userId;
      if (!userId) {
        userId = await RNSecureKeyStore.get('user-id');
      }
      return userId;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };
};

export const getUserRole = () => {
  return async (dispatch, state) => {
    try {
      let userRole = await state.auth.userRole;
      if (!userRole) {
        userRole = await RNSecureKeyStore.get('user-role');
      }
      return userRole;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };
};

export const getUser = () => {
  return async (dispatch, state) => {
    dispatch(userUiStartLoading());
    try {
      let userData = await state.user.user;

      if (!userData.email) {
        await dispatch(userUiStopLoading());

        userData = await RNSecureKeyStore.get('user-data');
        userData = await JSON.parse(userData);
        dispatch(setUser(userData));

        return null;
      } else {
        await dispatch(userUiStopLoading());
        return null;
      }
    } catch (e) {
      dispatch(userUiStopLoading());
      console.log(e);
      return 'Something went wrong, please check your internet connection and try again. If this persists then you are not logged in';
    }
  };
};

export const updateUser = userData => {
  return async (dispatch, state) => {
    dispatch(userUiStartLoading());
    try {
      let token = await dispatch(getAuthToken());
      let userId = await dispatch(getUserId());

      let res = await sendRequest(
        `${API_URL}/auth/users/${userId}/`,
        'PATCH',
        {...userData},
        {},
        token,
      );

      await dispatch(userUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        dispatch(setUser(resJson));
        return null;
      }
      return 'Failed';
    } catch (e) {
      dispatch(userUiStopLoading());
      console.warn(e);
      return 'Something went wrong, please check your internet connection and try again. If this persists then you are not logged in';
    }
  };
};

export const changeProfilePicture = ({uri, type, fileName}) => {
  return async (dispatch, state) => {
    try {
      dispatch(userUiStartLoading());

      let token = await dispatch(getAuthToken());
      let userId = await dispatch(getUserId());

      const formData = new FormData();

      formData.append('image', {
        uri,
        type,
        name: fileName,
      });

      setTimeout(() => {
        if (!res) {
          dispatch(userUiStopLoading());
          return 'Please check your internet connection';
        }
      }, 15000);

      let res = await sendPictureRequest(
        `${API_URL}/auth/users/${userId}/`,
        'PATCH',
        formData,
        {},
        token,
      );
      await dispatch(userUiStopLoading());

      if (res.ok) {
        let resJson = await res.json();

        if (resJson.errors || resJson.detail) {
          return resJson.errors || resJson.detail;
        }
        await dispatch(setUser(resJson));
        return null;
      }

      return 'Failed';
    } catch (error) {
      dispatch(userUiStopLoading());
      return 'Please check your internet connection and try again';
    }
  };
};
