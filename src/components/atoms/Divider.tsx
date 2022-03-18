import { Divider as NativeBaseDivider } from 'native-base';
import React from 'react';

type DividerProps = {
  my?: number;
};

const Divider = ({ my }: DividerProps) => {
  return (
    <NativeBaseDivider backgroundColor="muted.300" my={my ?? 4} w="100%" />
  );
};

export default Divider;
