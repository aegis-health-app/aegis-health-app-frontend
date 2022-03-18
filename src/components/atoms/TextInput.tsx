import { FormControl, IInputProps, Input } from 'native-base';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type TextInputProps = {
  label: string;
  name: string;
  errors: { [x: string]: { message: string } };
  control: Control<FieldValues, any>;
} & IInputProps;

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  isRequired,
  placeholder,
  control,
  errors,
  ...props
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={name in errors}>
      <FormControl.Label {...props}>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            placeholder={placeholder}
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

export default TextInput;
