import { ITextProps, Text } from 'native-base';
import React from 'react';

type TextInputProps = {
  titleText: string;
} & ITextProps;

const TextInput: React.FC<TextInputProps> = ({ titleText, ...props }) => {
  return (
    <Text fontSize={20} {...props}>
      {titleText}
    </Text>
  );
};

export default TextInput;
