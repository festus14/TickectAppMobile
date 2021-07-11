import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

export default function DismissKeyboard({children, style = {flex: 1}}) {
  return (
    <TouchableWithoutFeedback style={style} onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}
