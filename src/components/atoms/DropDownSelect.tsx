import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface ItemInterface {
  label: string;
  value: string | number;
}

const DropDownSelect = ({
  items,
  value,
  setValue,
  zIndex,
  maxHeight,
  defaultValue
}: {
  items: ItemInterface[];
  value: string | number;
  setValue: (value?: any) => void;
  zIndex?: number,
  maxHeight?: number,
  defaultValue?: string | number
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value ?? defaultValue}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      style={styles.dropdown}
      zIndex={zIndex}
      maxHeight={maxHeight}
    />
  );
};

export default DropDownSelect;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'transparent',
    borderColor: 'lightgrey'
  },
});
