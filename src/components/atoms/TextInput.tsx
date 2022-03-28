import { FormControl, Icon, IInputProps, Input } from 'native-base';
import React, { useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

export enum TextInputValidationType {
  PHONE = 'phone',
  NAME = 'name'
}

type TextInputProps = {
  label?: string;
  name: string;
  hasRequiredStar?: boolean;
  errorMessage?: string;
  errors: { [x: string]: { message: string } };
  control: Control<FieldValues, any>;
  inputRightElement?: IInputProps['InputRightElement'];
  validationType?: TextInputValidationType;
} & IInputProps;

const validationPatterns = {
  phone: /^([0-9]){10}$/,
  name: /^(([A-Za-z\u0E00-\u0E7F])){1,50}$/
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  hasRequiredStar,
  placeholder,
  defaultValue,
  control,
  errors,
  inputRightElement,
  errorMessage,
  validationType,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <FormControl isRequired={hasRequiredStar} isInvalid={name in errors}>
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
            keyboardType={
              validationType === TextInputValidationType.PHONE
                ? 'numeric'
                : 'default'
            }
            {...props}
          />
        )}
        name={name}
        rules={{
          required: errorMessage,
          pattern: validationType && {
            value: validationPatterns[validationType] || '',
            message: t('error.invalid', { name: label })
          }
        }}
        defaultValue={defaultValue ?? ''}
      />
      <FormControl.ErrorMessage mt={2}>
        {errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export const PasswordTextInput: React.FC<TextInputProps> = ({
  label,
  name,
  hasRequiredStar,
  placeholder,
  defaultValue,
  control,
  errors,
  errorMessage,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl isRequired={hasRequiredStar} isInvalid={name in errors}>
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
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <Icon
                mr={2}
                size="sm"
                h="full"
                as={Ionicons}
                name={showPassword ? 'eye' : 'eye-off'}
                color="muted.400"
                onPress={() => setShowPassword((prev) => !prev)}
              />
            }
            {...props}
          />
        )}
        name={name}
        rules={{ required: errorMessage }}
        defaultValue={defaultValue ?? ''}
      />
      <FormControl.ErrorMessage mt={2}>
        {errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default TextInput;
