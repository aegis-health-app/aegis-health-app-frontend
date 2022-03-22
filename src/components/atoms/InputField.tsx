import { Input as NativeBaseInput } from 'native-base';
import React from 'react';

type InputProps = {
  onBlur: (e: any) => void;
  placeholder: string;
  onChangeText: any;
  value: string | undefined;
  InputRightElement?: any;
  type?: string;
};

const Input = (props: InputProps) => {
  const { onBlur, placeholder, onChangeText, value, type, InputRightElement } =
    props;
  return (
    <NativeBaseInput
      borderColor="#ACB5BD"
      w="100%"
      size="xl"
      fontSize="sm"
      padding={3}
      onBlur={onBlur}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      type={type}
      InputRightElement={InputRightElement}
    />
  );
};

export default Input;
