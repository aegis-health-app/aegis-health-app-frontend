import { HStack, ITextProps, Pressable, Text } from 'native-base';
import React from 'react';

export enum AuthType {
  SIGNIN = 'SIGN_IN',
  SIGNUP = 'SIGN_UP'
}

type TextInputProps = {
  page: AuthType.SIGNIN | AuthType.SIGNUP;
} & ITextProps;

const AuthFooter: React.FC<TextInputProps> = ({ page, ...props }) => {
  return (
    <HStack justifyContent="center" my={10} {...props}>
      <Text>
        {page === AuthType.SIGNIN && 'ยังไม่มีบัญชี? '}
        {page === AuthType.SIGNUP && 'มีบัญชีผู้ใช้แล้ว? '}
      </Text>
      <Pressable>
        <Text color="blue.600">
          {page === AuthType.SIGNIN && 'สร้างบัญชี'}
          {page === AuthType.SIGNUP && 'ลงชื่อเข้าใช้'}
        </Text>
      </Pressable>
    </HStack>
  );
};

export default AuthFooter;
