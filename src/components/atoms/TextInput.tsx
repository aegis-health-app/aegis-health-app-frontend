import { FormControl, IInputProps, Input } from 'native-base';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type TextInputProps = {
  label: string;
  name: string;
  errors: { [x: string]: { message: string } };
  control: Control<FieldValues, any>;
  inputRightElement?: IInputProps['InputRightElement'];
} & IInputProps;

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  isRequired,
  placeholder,
  defaultValue,
  control,
  errors,
  inputRightElement,
  ...props
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={name in errors}>
      <FormControl.Label mb={2}>{label}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            borderColor="#ACB5BD"
            w="100%"
            size="xl"
            fontSize="sm"
            padding={3}
            onBlur={onBlur}
            placeholder={placeholder}
            onChangeText={(val) => onChange(val)}
            value={value}
            InputRightElement={inputRightElement}
            {...props}
          />
        )}
        name={name}
        rules={{ required: 'Field is required', minLength: 3 }}
        defaultValue={defaultValue ?? ''}
      />
      <FormControl.ErrorMessage mt={0}>
        {errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default TextInput;
