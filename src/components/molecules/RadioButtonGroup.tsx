import React from 'react';
import { Radio, Text } from 'native-base';

interface SelectionInterface {
  value: string;
  label: string;
}

const RadioButtonGroup = ({
  selections,
  value,
  setValue
}: {
  selections: SelectionInterface[];
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <>
      <Radio.Group
        name="Repeat"
        value={value}
        onChange={(newValue) => setValue(newValue)}>
        {selections &&
          selections.map((selection) => {
            return (
              <Radio value={selection.value} m="1" key={selection.value}>
                <Text fontSize={16} m={2}>
                  {selection.label}
                </Text>
              </Radio>
            );
          })}
      </Radio.Group>
    </>
  );
};

export default RadioButtonGroup;
