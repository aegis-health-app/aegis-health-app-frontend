import { Input as NativeBaseInput } from 'native-base';
import React from 'react';

type InputProps = {
  onBlur: any;
  placeholder: string;
  onChangeText: any;
  value: string | undefined;
};

const Input = (props: InputProps) => {
  const { onBlur, placeholder, onChangeText, value } = props;
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
    />
  );
};

export default Input;
