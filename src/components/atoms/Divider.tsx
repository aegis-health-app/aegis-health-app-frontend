import { Divider as NativeBaseDivider } from 'native-base';
import React from 'react';

type DividerProps = {
  my?: number;
  mt?: number;
};

const Divider = ({ my, mt }: DividerProps) => {
  return (
    <NativeBaseDivider
      backgroundColor="muted.300"
      my={my ?? 4}
      mt={mt}
      w="100%"
    />
  );
};

export default Divider;
