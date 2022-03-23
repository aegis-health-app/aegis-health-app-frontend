import { HStack, Input } from 'native-base';
import React, { useRef, useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

interface OTPProps {
  count?: number;
  required?: boolean;
}

interface NativeBaseInputProps {
  focus: () => void;
  isFocused: () => boolean;
}

const OTPInput: React.FC<OTPProps> = ({ count = 6 }) => {
  const inputRef = useRef<typeof Input & NativeBaseInputProps>();
  const [otpCode, setOTP] = useState<string>('');

  const handleOTPInput = (text: string) => {
    if (text.match(/^[0-9]{0,6}$/)) setOTP(text);
  };

  const focusOTP = () => {
    inputRef?.current?.focus();
    console.log('focus otp');
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => focusOTP()}>
        <HStack justifyContent="space-between">
          {Array.from('x'.repeat(count)).map((value, index) => (
            <Input
              borderColor={
                otpCode.length === index && inputRef?.current?.isFocused()
                  ? 'blue.600'
                  : 'gray.800'
              }
              key={`otp-${index}`}
              value={otpCode?.charAt(index) || ''}
              isDisabled
              width="12"
              textAlign="center"
              fontSize="16"
            />
          ))}
        </HStack>
      </TouchableWithoutFeedback>

      <Input
        ref={inputRef}
        keyboardType="numeric"
        onChangeText={handleOTPInput}
        value={otpCode}
        position="absolute"
        top="0"
        opacity="0"
      />
    </View>
  );
};

export default OTPInput;
