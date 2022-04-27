import { ITextProps, Text } from 'native-base';
import React from 'react';

type FormHeaderProps = {
  headerText: string;
  size?: number;
} & ITextProps;

const FormHeader: React.FC<FormHeaderProps> = ({
  headerText,
  size,
  ...props
}) => {
  return (
    <Text fontSize={size || 24} fontWeight="medium" padding={0.5} {...props}>
      {headerText}
    </Text>
  );
};

export default FormHeader;
