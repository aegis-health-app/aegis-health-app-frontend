import { HStack, ITextProps, Pressable, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

export enum AuthType {
  SIGNIN = 'SIGN_IN',
  SIGNUP = 'SIGN_UP'
}

type TextInputProps = {
  page: AuthType.SIGNIN | AuthType.SIGNUP;
} & ITextProps;

const AuthFooter: React.FC<TextInputProps> = ({ page, ...props }) => {
  const { t } = useTranslation();
  return (
    <HStack justifyContent="center" my={10} {...props}>
      <Text>
        {page === AuthType.SIGNIN && t('57')}
        {page === AuthType.SIGNUP && t('59')}
      </Text>
      <Pressable>
        <Text color="blue.600">
          {page === AuthType.SIGNIN && ` ${t('58')}`}
          {page === AuthType.SIGNUP && ` ${t('56')}`}
        </Text>
      </Pressable>
    </HStack>
  );
};

export default AuthFooter;
