import { ITextProps, Text } from 'native-base';
import React from 'react';

type TextInputProps = {
  headerText: string;
} & ITextProps;

const TextInput: React.FC<TextInputProps> = ({ headerText, ...props }) => {
  return (
    <Text fontSize={24} {...props}>
      {headerText}
    </Text>
  );
};

export default TextInput;
