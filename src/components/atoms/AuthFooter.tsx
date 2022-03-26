import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HStack, ITextProps, Pressable, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/types';

export enum AuthType {
  SIGNIN = 'SIGN_IN',
  SIGNUP = 'SIGN_UP'
}

type TextInputProps = {
  page: AuthType.SIGNIN | AuthType.SIGNUP;
} & ITextProps;

const AuthFooter: React.FC<TextInputProps> = ({ page, ...props }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <HStack justifyContent="center" my={10} {...props}>
      <Text>
        {page === AuthType.SIGNIN && t('auth.noAccount')}
        {page === AuthType.SIGNUP && t('auth.alreadyHaveAccount')}
      </Text>
      <Pressable
        onPress={() =>
          navigation.replace(
            page === AuthType.SIGNUP ? 'SignInScreen' : 'SignUpScreen'
          )
        }>
        <Text color="blue.600">
          {page === AuthType.SIGNIN && ` ${t('auth.footerSignUp')}`}
          {page === AuthType.SIGNUP && ` ${t('auth.signIn')}`}
        </Text>
      </Pressable>
    </HStack>
  );
};

export default AuthFooter;
