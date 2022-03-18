import { View } from 'native-base';
import React from 'react';

type SpacerProps = {
  h?: number;
  w?: number;
};

const Spacer = ({ h, w }: SpacerProps) => {
  return <View style={{ height: h ?? 16, width: w ?? 8 }} />;
};

export default Spacer;
