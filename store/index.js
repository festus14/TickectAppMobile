import React from 'react';
import {combineReducers} from '../utility/helpers';
import auth from './reducers/auth';
import ui from './reducers/ui';
import user from './reducers/user';

export const Store = React.createContext();

export const initialState = {
  ui: ui.initialState,
  auth: auth.initialState,
  user: user.initialState,
};

export function StoreProvider(props) {
  const [state, dispatch] = combineReducers({
    ui: React.useReducer(ui.reducer, ui.initialState),
    auth: React.useReducer(auth.reducer, auth.initialState),
    user: React.useReducer(user.reducer, user.initialState),
  });

  return (
    <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
  );
}
