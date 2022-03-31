import { ITextProps, Text } from 'native-base';
import React from 'react';

type TextInputProps = {
  headerText: string;
} & ITextProps;

const TextInput: React.FC<TextInputProps> = ({ headerText, ...props }) => {
  return (
    <Text fontSize={18} {...props} padding={0.5}>
      {headerText}
    </Text>
  );
};

export default TextInput;
