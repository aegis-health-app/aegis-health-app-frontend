import { ITextProps, Text } from 'native-base';
import React from 'react';

type TextInputProps = {
  headerText: string;
  size?: number;
} & ITextProps;

const TextInput: React.FC<TextInputProps> = ({
  headerText,
  size,
  ...props
}) => {
  return (
    <Text fontSize={size || 24} fontWeight="medium" {...props}>
      {headerText}
    </Text>
  );
};

export default TextInput;
