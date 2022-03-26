import { FormControl, Radio, View } from 'native-base';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type ControlledRadioGroupProps = {
  label: string;
  name: string;
  choices: string[];
  isRequired?: boolean;
  hasRequiredStar?: boolean;
  defaultValue?: string;
  errorMessage?: string;
  errors: { [x: string]: { message: string } };
  control: Control<FieldValues, any>;
};

const ControlledRadioGroup: React.FC<ControlledRadioGroupProps> = ({
  label,
  name,
  hasRequiredStar,
  choices,
  errorMessage,
  defaultValue,
  control,
  errors
}) => {
  return (
    <FormControl isRequired={hasRequiredStar} isInvalid={name in errors} mb={6}>
      <FormControl.Label mb={2}>{`${label} `}</FormControl.Label>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            <Radio.Group name="myRadioGroup" value={value} onChange={onChange}>
              {choices.map((choice) => (
                <Radio key={choice} value={choice} my={1}>
                  {choice}
                </Radio>
              ))}
            </Radio.Group>
          </View>
        )}
        defaultValue={defaultValue}
        name={name}
        rules={{ required: errorMessage }}
      />
      <FormControl.ErrorMessage>
        {errors[name]?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default ControlledRadioGroup;
