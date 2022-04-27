import { ITextProps, Text } from 'native-base';
import React from 'react';

type FormSubHeaderProps = {
  headerText: string;
} & ITextProps;

const FormSubHeader: React.FC<FormSubHeaderProps> = ({
  headerText,
  ...props
}) => {
  return (
    <Text fontSize={18} {...props} padding={0.5}>
      {headerText}
    </Text>
  );
};

export default FormSubHeader;
