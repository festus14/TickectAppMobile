import {RESET_AUTH, RESET_USER} from './actionTypes';

export const resetApp = () => {
  return async dispatch => {
    dispatch({type: RESET_AUTH});
    dispatch({type: RESET_USER});
  };
};
