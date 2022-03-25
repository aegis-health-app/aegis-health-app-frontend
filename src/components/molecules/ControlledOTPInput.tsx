import { FormControl, HStack, IInputProps, Input, View } from 'native-base';
import React, { useCallback, useRef } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { TouchableWithoutFeedback } from 'react-native';

interface NativeBaseInputProps {
  focus: () => void;
  isFocused: () => boolean;
}

type ControlledOTPInputProps = {
  label: string;
  name: string;
  count?: number;
  isRequired?: boolean;
  errors: { [x: string]: { message: string } };
  control: Control<FieldValues, any>;
} & IInputProps;

const ControlledOTPInput: React.FC<ControlledOTPInputProps> = ({
  label,
  name,
  isRequired,
  count = 6,
  control,
  errors,
  ...props
}) => {
  const inputRef = useRef<typeof Input & NativeBaseInputProps>();

  const isValidOTP = useCallback((text: string) => {
    return text.match(/^[0-9]{0,6}$/);
  }, []);

  const focusOTP = () => {
    inputRef?.current?.focus();
  };

  return (
    <FormControl isRequired={isRequired} isInvalid={name in errors} mb={6}>
      <FormControl.Label mb={2}>{`${label} `}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <TouchableWithoutFeedback onPress={() => focusOTP()}>
              <HStack justifyContent="space-between">
                {Array.from('x'.repeat(count)).map((arrayValue, index) => (
                  <Input
                    borderColor={
                      value.length === index && inputRef?.current?.isFocused()
                        ? 'blue.600'
                        : 'gray.800'
                    }
                    key={`otp-${index}`}
                    value={value?.charAt(index) || ''}
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
              position="absolute"
              top="0"
              opacity="0"
              onChangeText={(val) => (isValidOTP(val) ? onChange(val) : null)}
              value={value}
              {...props}
            />
          </View>
        )}
        name={name}
        rules={{ required: 'Field is required', minLength: 3 }}
        defaultValue=""
      />
      <FormControl.ErrorMessage>
        {errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default ControlledOTPInput;
