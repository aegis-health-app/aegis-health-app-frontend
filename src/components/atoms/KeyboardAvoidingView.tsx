import React from 'react';
import { KeyboardAvoidingView as NativeBaseKeyboardAvoidingView } from 'native-base';

/**
 * @description - A customized KeyboardAvoidingview Wrapper form NativeBase
 */
const KeyboardAvoidingView = ({ children }) => {
  return (
    <NativeBaseKeyboardAvoidingView
      flex={1}
      flexDirection="column"
      justifyContent="center"
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}>
      {children}
    </NativeBaseKeyboardAvoidingView>
  );
};

export default KeyboardAvoidingView;
