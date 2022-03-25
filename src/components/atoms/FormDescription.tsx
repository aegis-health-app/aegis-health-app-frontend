import { ITextProps, Text } from 'native-base';
import React from 'react';

type TextInputProps = {
  text: string;
} & ITextProps;

const TextInput: React.FC<TextInputProps> = ({ text, ...props }) => {
  return (
    <Text fontSize={14} color="#a1a1a1" {...props}>
      {text}
    </Text>
  );
};

export default TextInput;
