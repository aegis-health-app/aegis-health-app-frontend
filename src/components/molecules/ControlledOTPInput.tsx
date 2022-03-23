import { FormControl, IInputProps } from 'native-base';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import OTPInput from '../atoms/OTPInput';

type ControlledOTPInputProps = {
  label: string;
  name: string;
  isRequired?: boolean;
  errors: { [x: string]: { message: string } };
  control: Control<FieldValues, any>;
} & IInputProps;

const ControlledOTPInput: React.FC<ControlledOTPInputProps> = ({
  label,
  name,
  isRequired,
  control,
  errors,
  ...props
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={name in errors}>
      <FormControl.Label mb={2}>{`${label} `}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <OTPInput
            onChangeText={(val) => onChange(val)}
            value={value}
            {...props}
          />
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
