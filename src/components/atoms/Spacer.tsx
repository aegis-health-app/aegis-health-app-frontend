import { View } from 'native-base';
import React from 'react';

type SpacerProps = {
  h?: number;
  w?: number;
};

/**
 *
 * @param h - height of the empty space
 * @param w -width of the empty space
 * @description
 * This is an empty box with default size of 16 in height and 8 in width.
 * You may customize the size as you wish using the w and h parameters.
 */
const Spacer = ({ h, w }: SpacerProps) => {
  return <View style={{ height: h ?? 16, width: w ?? 8 }} />;
};

export default Spacer;
