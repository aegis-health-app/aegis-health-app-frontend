import { View } from 'native-base';
import React from 'react';

const Divider = () => {
  return (
    <View flexDir="row" justifyContent="center">
      <View backgroundColor="muted.300" my={4} w="100%" height={1} />
    </View>
  );
};

export default Divider;
